"use client";
import { useEffect, useState } from "react";
import { addDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import { db, journalCollectionRef } from "@/firebase";
import { journalType } from "../../types";
import { IRootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { BiSave } from "react-icons/bi";
import { LuTrash } from "react-icons/lu";
import Tiptap from "./tiptap";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import parse from "html-react-parser";
import {
  addJournal,
  deleteJournal,
  updateJournal,
} from "@/redux/journal/journalSlice";
import moment from "moment";
import { toast } from "react-toastify";
import { checkMaxWords, getText, sumArray } from "@/utils/helpers";
import PremiumModal from "./premiumModal";

interface Entry {
  id: string;
  title: string;
  body: string;
}

function JournalEntry({
  id,
  title,
  body,
  dateCreated,
  welcomeEntry,
  handleShowLimitModal,
}: {
  id: string;
  title: string;
  dateCreated: string;
  body: string;
  welcomeEntry?: boolean;
  handleShowLimitModal: (val: boolean) => void;
}) {
  const { user, isLogged } = useSelector((state: IRootState) => state.user);
  const [isLimitExeeded, setLimitExeeded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [journalTitle, setJournalTitle] = useState<string>(title);
  const [editorContent, setEditorContent] = useState<string>(body);
  const [initiateAutoSave, setInitiateAutoSave] = useState(false);
  const [debounceEditorContent] = useDebounce(editorContent, 1500);
  const [debounceTitle] = useDebounce(journalTitle, 1500);
  const { journals } = useSelector((state: IRootState) => state.journal);
  const [usageLeft, setUsageLeft] = useState(1000);
  const { subscription } = useSelector(
    (state: IRootState) => state.subscription
  );
  const dispatch = useDispatch();
  const handleDelete = async () => {
    if (id === "new") {
      dispatch(deleteJournal({ id }));
      return;
    }
    if (id) {
      const journalToDelete = doc(db, "journal", id);
      dispatch(deleteJournal({ id }));
      await deleteDoc(journalToDelete);
    }
    toast("Journal deleted", {
      type: "success",
    });
  };

  const handleSave = async () => {
    if (!isLogged) {
      setErrorMsg("Login required to save journal");
      return toast("Login required to save journal", {
        type: "error",
      });
    }
    const docRef = doc(db, "journal", id);
    setIsSaving(true);
    await setDoc(docRef, {
      userEmail: user.email,
      value: editorContent,
      title: journalTitle,
      dateCreated: dateCreated,
    } as journalType)
      .then(() => {
        dispatch(
          updateJournal({
            value: editorContent,
            title: journalTitle,
            dateCreated: dateCreated,
            id,
          })
        );
      })
      .catch(() => {
        setErrorMsg("Something went wrong");
      });

    setIsSaving(false);
  };
  useEffect(() => {
    if (usageLeft > 0) {
      setJournalTitle(title);
      setEditorContent(body);
    }
  }, [title, body, usageLeft]);

  // AUTO SAVE
  useEffect(() => {
    if (user.email && initiateAutoSave) {
      handleSave();
    }
  }, [debounceEditorContent, user.email, initiateAutoSave, debounceTitle]);

  // THIS HANDLES THE WORD COUNT BASED ON USER SUB
  const handleTrackUsage = () => {
    const today = moment().format("YYYY-MM-DD");
    const findAllTodaysJournals = journals
      .filter((j) => j.dateCreated === today)
      .map((eachTodays) => getText(eachTodays.value).length);
    const sumAllTodayEntries = sumArray(findAllTodaysJournals);
    const { usageLeft, isExpired } = checkMaxWords(
      subscription,
      sumAllTodayEntries
    );
    setUsageLeft(usageLeft);
    if (isExpired) {
      setLimitExeeded(true);
      handleShowLimitModal(true);
    } else {
      setLimitExeeded(false);
    }
  };
  useEffect(() => {
    handleTrackUsage();
  }, []);
  return (
    <li className="flex flex-col w-full max-w-screen-sm mx-auto shadow rounded-md bg-white">
      <span className="text-red-500 font-bold px-3">
        {isLimitExeeded
          ? "You have reached your maximum limit. Please upgrade your account"
          : ""}
      </span>
      <div className="px-4 py-3 grid grid-cols-[1fr_auto] gap-6 border-b border-primary border-dashed">
        <div className="flex flex-col">
          <label className="block">
            <input
              type="text"
              value={journalTitle}
              onChange={(e) => {
                if (!isLimitExeeded) {
                  setJournalTitle(e.target.value);
                  setInitiateAutoSave(true);
                  handleTrackUsage();
                  return;
                }
                setJournalTitle(journalTitle);
              }}
              placeholder="Some nice title..."
              spellCheck={false}
              className="min-w-full text-accent text-lg lg:text-xl font-semibold placeholder:font-light placeholder:text-sm bg-transparent border-none focus:outline-dashed outline-primary rounded-md p-2"
            />
          </label>
          <span className="text-sm text-red-700">{errorMsg}</span>
        </div>
        {!welcomeEntry && (
          <div className="flex gap-2 items-center">
            {isSaving && <span>Saving...</span>}
            <button
              title="save"
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="hover:bg-primary rounded-md p-1 h-fit w-fit transition duration-200 hover:text-accent"
            >
              <BiSave size={20} />
            </button>
            <button
              title="delete"
              type="button"
              onClick={handleDelete}
              className="hover:bg-red-200 rounded-md p-1 h-fit w-fit transition duration-200 hover:text-red-500"
            >
              <LuTrash size={20} />
            </button>
          </div>
        )}
      </div>
      <Tiptap
        handleEditorChange={() => handleTrackUsage()}
        isLimitExceeded={isLimitExeeded}
        setInitiateAutoSave={setInitiateAutoSave}
        defaultContent={editorContent}
        setEditorContent={setEditorContent}
        usageLeft={usageLeft}
      />
    </li>
  );
}

export default JournalEntry;
