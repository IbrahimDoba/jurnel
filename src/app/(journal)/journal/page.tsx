"use client";
import AddNew from "@/components/add-new";
import JournalControls from "@/components/journal-controls";
import JournalEntry from "@/components/journal-entry";
import { defaultHtml } from "@/data/default";
import {
  db,
  journalCollectionRef,
  subscriptionCollectionRef,
} from "@/firebase";
import {
  addJournal,
  deleteJournal,
  fetchJournals,
  updateJournal,
} from "@/redux/journal/journalSlice";
import {
  getDateByOperation,
  sortJournalsByDate,
  subscriptionExpired,
} from "@/utils/helpers";
import { addDoc, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import {
  BackendSubscriptionType,
  DisplayJournalType,
  journalType,
} from "../../../../types";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { IRootState } from "@/redux/store";
import moment from "moment";
import { nanoid } from "nanoid";
import {
  loadSubscription,
  subExpired,
} from "@/redux/subscription/subscriptionSlice";
import PremiumModal from "@/components/premiumModal";

type NewEntry = {
  id: string;
  title: string;
  value: string;
  dateCreated: string;
};
const dummyEntries = [
  {
    id: "1",
    title: "Welcome to Journal by Wordgen 🎉",
    value: defaultHtml,
    dateCreated: moment().format("YYYY-MM-DD"),
  },
  {
    id: "2",
    title: "Welcome to Journal by Wordgen 🎉",
    value: "<p>Hello World</p>",
    dateCreated: moment().format("YYYY-MM-DD"),
  },
];

function Jurnal() {
  const [noEntryForDate, setNoEntryForDate] = useState({
    next: false,
    previous: false,
  });
  const [addJournalLoading, setAddJournalLoading] = useState(false);
  const [limitModal, setLimitModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [trackDate, setTrackDate] = useState("");
  const [displayJournals, setDisplayJournals] = useState<DisplayJournalType>({
    activeJournal: [],
    dateCreated: "",
  });
  const lastEntryRef = useRef<HTMLDivElement | null>(null);

  const addEntry = async () => {
    setAddJournalLoading(true);
    await addDoc(journalCollectionRef, {
      userEmail: user.email,
      title: "Welcome to Journal by Wordgen 🎉",
      value: "<p>Dear Journal.</p>",
      dateCreated: moment().format("YYYY-MM-DD"),
    } as journalType).then((res) => {
      dispatch(
        addJournal({
          userEmail: user.email,
          id: res.id,
          title: "Welcome to Journal by Wordgen 🎉",
          value: "<p>Dear Journal.</p>",
          dateCreated: moment().format("YYYY-MM-DD"),
        })
      );
      setAddJournalLoading(false);
    });
    // Scroll to the bottom
    if (lastEntryRef.current) {
      lastEntryRef.current.scrollIntoView({ behavior: "smooth" });
    }
    console.log("EXECUTED:");
  };

  const { user, isLogged } = useSelector((state: IRootState) => state.user);
  const { journals } = useSelector((state: IRootState) => state.journal);
  const router = useRouter();
  const dispatch = useDispatch();
  const today = moment().format("YYYY-MM-DD");

  const handleLimitExceeded = (val: boolean) => {
    setLimitModal(val);
  };
  const handleRenderJournalByDate = (operation: "next" | "previous") => {
    const { dateValue, isNextAvailable, isPreviousAvailable } =
      getDateByOperation(journals, displayJournals.dateCreated, operation);
    console.log("DATE VALUE PRETURNED: ", dateValue);

    setNoEntryForDate({
      next: !isNextAvailable,
      previous: !isPreviousAvailable,
    });
    const filterJournalsByDate = journals.filter(
      (j) => j.dateCreated === dateValue
    );
    setDisplayJournals({
      activeJournal: filterJournalsByDate,
      dateCreated: dateValue,
    });
    setTrackDate(dateValue);
  };

  const handleCreateJournal = () => {
    setDisplayJournals({
      activeJournal: [],
      dateCreated: today,
    });
    setTrackDate(today);
  };
  useEffect(() => {
    if (isLogged && user.email) {
      (async () => {
        setIsLoading(true);
        const journals = await getDocs(journalCollectionRef);
        const subscriptions = await getDocs(subscriptionCollectionRef);
        const allSubs: any = subscriptions.docs.map((sub) => ({
          ...sub.data(),
          id: sub.id,
        }));
        const findUserSub: BackendSubscriptionType = allSubs.find(
          (item: BackendSubscriptionType) => item.userEmail === user.email
        );
        if (findUserSub && subscriptionExpired(findUserSub.expirationDate)) {
          // subscription expired
          dispatch(subExpired());
        } else if (findUserSub) {
          console.log("I FOUND UR SUB");
          dispatch(loadSubscription(findUserSub));
        }
        const allJournals: any = journals.docs.map((journal) => ({
          ...journal.data(),
          id: journal.id,
        }));
        const filterUserJournals = allJournals.filter(
          (item: journalType) => item.userEmail === user.email
        );
        const sortFilteredResult = sortJournalsByDate(filterUserJournals);
        dispatch(fetchJournals(sortFilteredResult));
        setIsLoading(false);
      })();
    } else {
      router.push("/auth/login");
    }
  }, [dispatch, user.email, isLogged, router, today]);

  //BELOW useEffect KEEPS TRACK OF THE JOURNAL STATE CHANGES
  useEffect(() => {
    const checkTodayAvailable = journals.filter((j) => j.dateCreated === today);
    if (trackDate !== "") {
      const persistDisplay = journals.filter(
        (j) => j.dateCreated === trackDate
      );
      setDisplayJournals({
        activeJournal: persistDisplay,
        dateCreated: trackDate,
      });
      return;
    }

    if (journals.length > 0) {
      setDisplayJournals({
        activeJournal: journals.filter((j) => j.dateCreated === today),
        dateCreated:
          checkTodayAvailable.length !== 0 ? journals[0].dateCreated : today, // initial journals will be first one in teh list, so it makes sense to display it's date, but if it is for yesterday, display Today as the date and nothing as the list of journals
      });
      setTrackDate(
        checkTodayAvailable.length !== 0 ? journals[0].dateCreated : today
      );
    } else {
      setDisplayJournals({
        activeJournal: [],
        dateCreated: today,
      });
    }
    setTrackDate(today);
  }, [journals, today, trackDate]);

  // THIS USEEFFECT PREVENTS USER FROM TRYING TO CHECK JOURNALS FOR TOMORROW
  useEffect(() => {
    if (displayJournals.dateCreated === today && journals.length !== 0) {
      const { isNextAvailable, isPreviousAvailable } = getDateByOperation(
        journals,
        displayJournals.dateCreated,
        "previous"
      );

      setNoEntryForDate({
        next: !isNextAvailable,
        previous: !isPreviousAvailable,
      });
    } else if (journals.length === 0) {
      setNoEntryForDate({
        next: true,
        previous: true,
      });
    }
  }, [displayJournals, today, journals]);

  return (
    <section className="grid gap-4 lg:grid-cols-[auto_1fr] items-start w-full h-full py-10">
      <div className="lg:sticky top-10 h-20 w-full px-6 rounded-md flex items-center justify-center">
        {/* date component can br passed necessary fn or brought here */}
        <JournalControls
          noEntryForDate={noEntryForDate}
          dateCreated={displayJournals.dateCreated}
          handleRenderJournalByDate={handleRenderJournalByDate}
        />
      </div>
      <ul className="flex flex-col gap-10 items-center">
        {/* Welcome entry */}
        {displayJournals.activeJournal.length <= 0 &&
          displayJournals.dateCreated === today && (
            <JournalEntry
              handleShowLimitModal={handleLimitExceeded}
              id={dummyEntries[0].id ?? ""}
              title={dummyEntries[0].title}
              body={dummyEntries[0].value}
              dateCreated={dummyEntries[0].dateCreated}
              welcomeEntry
            />
          )}
        {/* entry list */}
        {displayJournals.activeJournal.map((entry, index) => (
          <JournalEntry
            handleShowLimitModal={handleLimitExceeded}
            key={entry.id ?? nanoid()}
            id={entry.id ?? ""}
            title={entry.title}
            body={entry.value}
            dateCreated={entry.dateCreated}
          />
        ))}
        {/* {journals &&
          journals
            .filter((j) => j.id === "new")
            .map((entry, index) => (
              <JournalEntry
                setEntryForToday={setEntryForToday}
                key={nanoid()}
                id={entry.id ?? ""}
                title={entry.title}
                body={entry.value}
                dateCreated={entry.dateCreated}
                // ref={index === entryForToday.length - 1 ? lastEntryRef : null}
              />
            ))} */}
      </ul>
      {/* New entry button */}
      <AddNew
        isLoading={addJournalLoading}
        handleCreateJournal={handleCreateJournal}
        addNewEntry={addEntry}
      />
      <PremiumModal
        isOpen={limitModal}
        onClose={() => handleLimitExceeded(false)}
      />
    </section>
  );
}

export default Jurnal;
