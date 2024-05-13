"use client";
import Editor from "@/components/editor";
import { useState } from "react";
import ReactQuill from "react-quill";
import { addDoc } from "firebase/firestore";
import { journalCollectionRef } from "@/firebase";
import { journalType } from "../../../../../types";
import { IRootState } from "@/redux/store";
import { useSelector } from "react-redux";

function Page() {
  const { user, isLogged } = useSelector((state: IRootState) => state.user);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [editorContent, setEditorContent] = useState<
    ReactQuill.Value | undefined
  >();

  const handleChange = (content: ReactQuill.Value) => {
    setEditorContent(content);
  };

  const handleSave = async () => {
    setErrorMsg("");
    if (isLogged) {
      setIsSaving(true);
      await addDoc(journalCollectionRef, {
        userEmail: user.email,
        value: editorContent,
      } as journalType)
        .then(() => {
          // DO SOMETHING WHEN THE JOURNALK IS SAVED
        })
        .catch(() => {
          setErrorMsg("Something went wrong");
        });
    } else {
      setErrorMsg("Login required to save journal");
    }
    setIsSaving(false);
  };
  return (
    <section className="flex items-center h-full w-full">
      <div className="flex flex-col w-full max-w-[500px] mx-auto shadow rounded-md bg-white">
        <div className="flex flex-col items-center py-4 border-b border-primary">
          <span className="text-sm mb-2 text-red-700">{errorMsg}</span>
          <h1 className="text-2xl font-bold text-center text-txt">
            New Journal
          </h1>
        </div>
        <Editor value={editorContent} onChange={handleChange} />
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="self-end px-2 rounded-l-md text-white font-semibold mb-1 bg-[#10b77f]"
        >
          {isSaving ? "saving..." : "save"}
        </button>
      </div>
    </section>
  );
}

export default Page;
