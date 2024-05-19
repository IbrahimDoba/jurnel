"use client";
import { db, journalCollectionRef } from "@/firebase";
import {
  deleteJournal,
  fetchJournals,
  updateJournal,
} from "@/redux/journal/journalSlice";
import { IRootState } from "@/redux/store";
import { deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { DisplayJournalType, EditorProp, journalType } from "../../../../../types";
import { useRouter } from "next/navigation";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import parse from "html-react-parser";
import Editor from "@/components/editor";
import ReactQuill from "react-quill";
import {
  checkIsTodayOrYesterday,
  getNextOrPreviousDay,
  sortJournalsByDate,
} from "@/utils/helpers";
import moment from "moment";


const Jonrals = () => {
  const { user, isLogged } = useSelector((state: IRootState) => state.user);
  const { journals } = useSelector((state: IRootState) => state.journal);
  const router = useRouter();
  const dispatch = useDispatch();
  const [displayJournals, setDisplayJournals] = useState<DisplayJournalType>({
    activeJournal: [],
    dateCreated: "",
  });
  const [inEditMode, setInEditMode] = useState(false);
  const [editorContent, setEditorContent] = useState<EditorProp | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleEditContent = (
    id: string,
    value: string,
    dateCreated: string
  ) => {
    setEditorContent({ editorValue: value, refId: id, dateCreated });
    setInEditMode(!inEditMode);
  };
  const handleChange = (content: ReactQuill.Value) => {
    setEditorContent({
      refId: editorContent?.refId ?? "",
      editorValue: content,
      dateCreated: editorContent?.dateCreated ?? "",
    });
  };

  const handleSave = async (id: string) => {
    setErrorMsg("");
    if (isLogged) {
      const docRef = doc(db, "journal", id);

      setIsSaving(true);
      await setDoc(docRef, {
        userEmail: user.email,
        value: editorContent?.editorValue ?? "",
        dateCreated: editorContent?.dateCreated ?? "",
      } as journalType)
        .then(() => {
          dispatch(
            updateJournal({
              value: editorContent?.editorValue ?? "",
              id: editorContent?.refId,
            })
          );
        })
        .catch(() => {
          setErrorMsg("Something went wrong");
        });
    } else {
      setErrorMsg("Login required to save journal");
    }
    setIsSaving(false);
    setInEditMode(false);
  };
  const handleDelete = async (id: string) => {
    const journalToDelete = doc(db, "journal", id);
    await deleteDoc(journalToDelete);
    dispatch(deleteJournal({ id }));
  };
  const handleRenderJournalByDate = (
    date: string,
    operation: "next" | "previous"
  ) => {
    const getActionDate = getNextOrPreviousDay(date, operation);
    console.log("COMPARING DATES: ", getActionDate, journals[0].dateCreated);
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
    }
  }, [dispatch, user.email, isLogged]);

  //BELOW useEffect KEEPS TRACK OF THE JOURNAL STATE CHANGES
  useEffect(() => {
    if (journals.length > 0) {
      setDisplayJournals({
        activeJournal: journals,
        dateCreated: journals[0].dateCreated, // initial journals will be first one in teh list, so it makes sense to display it's date
      });
    }
  }, [journals]);
  return !isLogged ? (
    <div className="h-screen flex justify-center items-center">
      <span
        className="cursor-pointer text-rose-500"
        onClick={() => router.push("/auth/login")}
      >
        Login to view your jurnals
      </span>
    </div>
  ) : isLoading ? (
    <div className="h-screen flex justify-center items-center">
      <span>Fetching journals</span>
    </div>
  ) : (
    <div className="flex justify-center items-center ">
      <div className="ml-[10%]  flex flex-col ">
        <div className="flex justify-center items-center">
          <FaAngleLeft
            size={30}
            className="mr-2 text-white bg-emerald-500 cursor-pointer"
            onClick={() =>
              handleRenderJournalByDate(displayJournals.dateCreated, "previous")
            }
          />
          <span className="text-lg p-2 text-white bg-emerald-500 rounded-full">
            WG
          </span>
          <FaAngleRight
            size={30}
            className="ml-2 text-white bg-emerald-500 cursor-pointer"
            onClick={() =>
              handleRenderJournalByDate(displayJournals.dateCreated, "next")
            }
          />
        </div>
        <div className="flex justify-center items-center">
          <h2 className="text-2xl text-black mr-2">Jurnal</h2>
          <span className="text-emerald-500 text-2xl">#1</span>
        </div>
        <div className="flex justify-center items-center">
          <span className="text-xl text-emerald-500">
            {`${checkIsTodayOrYesterday(displayJournals.dateCreated)}`}
            <span>{displayJournals.dateCreated}</span>
          </span>
        </div>
      </div>
      <div className="flex flex-col w-full max-w-[800px] mx-auto shadow rounded-md bg-white mt-10">
        <span className="text-lg text-red-500 font-bold">{errorMsg}</span>
        <div className="flex flex-col items-start py-4 border-b border-primary">
          <h1 className="text-2xl  ml-[10%] font-bold text-center text-txt">
            Jornal Title
          </h1>
          {displayJournals.activeJournal.length > 0 ? (
            displayJournals.activeJournal.map(
              // REVERSING IT SO IT SHOWS IN DESCENDING ORDER WITH THE LATEST ONE AT THE BOTTOM RATHER THAN TOP... BASED ON THE APP WE'RE COPYING
              (journal) =>
                journal.dateCreated === displayJournals.dateCreated && (
                  <div
                    key={journal.id}
                    className="bg-white relative min-h-56 h-full w-full p-2  border-t rounded-b-md"
                  >
                    <div className="flex gap-3 items-center justify-center absolute right-2 top-1 cursor-pointer">
                      <MdOutlineEdit
                        onClick={() =>
                          handleEditContent(
                            journal.id ?? "",
                            journal.value,
                            journal.dateCreated
                          )
                        }
                      />
                      <FaRegTrashAlt
                        onClick={() => handleDelete(journal.id ?? "")}
                      />
                    </div>
                    {inEditMode && editorContent?.refId === journal.id ? (
                      <>
                        <Editor
                          value={editorContent?.editorValue}
                          onChange={handleChange}
                        />
                        <button
                          onClick={() => {
                            handleSave(journal.id ?? "");
                          }}
                          disabled={isSaving}
                          className="self-end px-2 rounded-r-md text-white font-semibold mb-1 -ml-2 bg-[#10b77f]"
                        >
                          {isSaving ? "saving..." : "save"}
                        </button>
                      </>
                    ) : (
                      <span>{parse(journal.value)}</span>
                    )}
                  </div>
                )
            )
          ) : (
            <div className="flex flex-col justify-center items-center bg-white relative min-h-56 h-full w-full p-2  border-t rounded-b-md">
              <span>You haven&apos;t created any journals yet</span>
              <span
                className="cursor-pointer text-rose-500"
                onClick={() => router.push("/jurnal/new")}
              >
                Click your first journal for this day
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jonrals;
