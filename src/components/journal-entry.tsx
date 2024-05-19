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
import {
  addJournal,
  deleteJournal,
  updateJournal,
} from "@/redux/journal/journalSlice";
import moment from "moment";

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
  setEntryForToday,
}: {
  id: string;
  title: string;
  dateCreated: string;
  body: string;
  welcomeEntry?: boolean;
  setEntryForToday: any;
}) {
  const { user, isLogged } = useSelector((state: IRootState) => state.user);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [journalTitle, setJournalTitle] = useState<string>(title);
  const [editorContent, setEditorContent] = useState<string>(body);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    const journalToDelete = doc(db, "journal", id);
    dispatch(deleteJournal({ id }));
    await deleteDoc(journalToDelete);
  };

  const handleSave = async () => {
    if (!isLogged) {
      setErrorMsg("Login required to save journal");
      return;
    }
    if (!id || id === "") {
      // IF THERE UIS NO ID, IT'S A NEW ENTRY
      setErrorMsg("");
      setIsSaving(true);
      await addDoc(journalCollectionRef, {
        userEmail: user.email,
        value: editorContent,
        title: journalTitle,
        dateCreated: moment().format("YYYY-MM-DD"),
      } as journalType)
        .then((res) => {
          dispatch(
            addJournal({
              userEmail: user.email,
              value: editorContent,
              title: journalTitle,
              dateCreated: moment().format("YYYY-MM-DD"),
              id: res.id,
            })
          );
          setEntryForToday(null);
        })
        .catch(() => {
          setErrorMsg("Something went wrong");
        });
    } else {
      // UPDATING AN EXISTING ENTRY
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
    }

    setIsSaving(false);
  };
  useEffect(() => {
    setJournalTitle(title);
    setEditorContent(body);
  }, [title, body]);

  return (
    <div className="flex flex-col w-full max-w-screen-sm mx-auto shadow rounded-md bg-white">
      <div className="px-4 py-3 grid grid-cols-[1fr_auto] gap-6 border-b border-primary border-dashed">
        <div className="flex flex-col">
          <label className="block">
            <input
              type="text"
              value={journalTitle}
              onChange={(e) => setJournalTitle(e.target.value)}
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
        defaultContent={editorContent}
        setEditorContent={setEditorContent}
      />
    </div>
  );
}

export default JournalEntry;
