"use client";
import AddNew from "@/components/add-new";
import JournalControls from "@/components/journal-controls";
import JournalEntry from "@/components/journal-entry";
import { defaultHtml } from "@/data/default";
import { db, journalCollectionRef } from "@/firebase";
import {
  deleteJournal,
  fetchJournals,
  updateJournal,
} from "@/redux/journal/journalSlice";
import { getNextOrPreviousDay, sortJournalsByDate } from "@/utils/helpers";
import { deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { DisplayJournalType, EditorProp, journalType } from "../../../../types";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { IRootState } from "@/redux/store";
import moment from "moment";

type NewEntry = {
  id: string;
  title: string;
  value: string;
  dateCreated: string;
};
const dummyEntries = [
  {
    id: "1",
    title: "Welcome to Jurnal by Wordgen 🎉",
    value: defaultHtml,
    dateCreated: moment().format("YYYY-MM-DD"),
  },
  {
    id: "2",
    title: "Welcome to Jurnal by Wordgen 🎉",
    value: "<p>Hello World</p>",
    dateCreated: moment().format("YYYY-MM-DD"),
  },
];

function Jurnal() {
  const [noEntryForDate, setNoEntryForDate] = useState({
    next: false,
    previous: false,
  });
  const [entryForToday, setEntryForToday] = useState<NewEntry[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [displayJournals, setDisplayJournals] = useState<DisplayJournalType>({
    activeJournal: [],
    dateCreated: "",
  });
  const addEntry = () =>
    setEntryForToday([
      {
        id: "",
        title: "Welcome to Jurnal by Wordgen 🎉",
        value: "<p>Hello World</p>",
        dateCreated: moment().format("YYYY-MM-DD"),
      },
    ]);

  const { user, isLogged } = useSelector((state: IRootState) => state.user);
  const { journals } = useSelector((state: IRootState) => state.journal);
  const router = useRouter();
  const dispatch = useDispatch();
  const today = moment().format("YYYY-MM-DD");
  const resetNoRecord = () =>
    setTimeout(() => {
      setNoEntryForDate({
        next: false,
        previous: false,
      });
    }, 3000);
  const handleRenderJournalByDate = (operation: "next" | "previous") => {
    const getActionDate = getNextOrPreviousDay(
      displayJournals.dateCreated,
      operation
    );
    console.log("TIME CHECKER: ", getActionDate, journals[0].dateCreated);
    const filterJournalsByDate = journals.filter(
      (j) => j.dateCreated === getActionDate
    );
    setDisplayJournals({
      activeJournal: filterJournalsByDate,
      dateCreated: getActionDate,
    });
  };
  useEffect(() => {
    if (isLogged && user.email) {
      (async () => {
        setIsLoading(true);
        const journals = await getDocs(journalCollectionRef);
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
  }, [dispatch, user.email, isLogged, router]);

  //BELOW useEffect KEEPS TRACK OF THE JOURNAL STATE CHANGES
  useEffect(() => {
    const checkTodayAvailable = journals.filter((j) => j.dateCreated === today);
    if (journals.length > 0) {
      setDisplayJournals({
        activeJournal: journals.filter((j) => j.dateCreated === today),
        dateCreated:
          checkTodayAvailable.length !== 0 ? journals[0].dateCreated : today, // initial journals will be first one in teh list, so it makes sense to display it's date, but if it is for yesterday, display Today as the date and nothing as the list of journals
      });
    } else {
      setDisplayJournals({
        activeJournal: [],
        dateCreated: today,
      });
    }
  }, [journals, today]);

  // THIS USEEFFECT PREVENTS USER FROM TRYING TO CHECK JOURNALS FOR TOMORROW
  useEffect(() => {
    if (displayJournals.dateCreated === today) {
      setNoEntryForDate({
        next: true,
        previous: false,
      });
    } else {
      setNoEntryForDate({
        next: false,
        previous: false,
      });
    }
  }, [displayJournals, today]);
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
              id={dummyEntries[0].id ?? ""}
              setEntryForToday={setEntryForToday}
              title={dummyEntries[0].title}
              body={dummyEntries[0].value}
              dateCreated={dummyEntries[0].dateCreated}
              welcomeEntry
            />
          )}
        {/* entry list */}
        {displayJournals.activeJournal.length > 0 ? (
          displayJournals.activeJournal.map((entry, index) => (
            <JournalEntry
              key={index}
              setEntryForToday={setEntryForToday}
              id={entry.id ?? ""}
              title={entry.title}
              body={entry.value}
              dateCreated={entry.dateCreated}
            />
          ))
        ) : (
          <div className="flex flex-col justify-center items-center bg-white relative p-2 h-32 max-w-screen-sm w-full mx-auto  border rounded-md">
            <span className="text-emerald-500">No Jurnals To Display</span>
          </div>
        )}
        {entryForToday &&
          entryForToday.map((entry, index) => (
            <JournalEntry
              setEntryForToday={setEntryForToday}
              key={index}
              id={entry.id ?? ""}
              title={entry.title}
              body={entry.value}
              dateCreated={entry.dateCreated}
            />
          ))}
      </ul>
      {/* New entry button */}
      <AddNew addNewEntry={addEntry} />
    </section>
  );
}

export default Jurnal;
