"use client";
import CharacterCount from "@tiptap/extension-character-count";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Progress from "./progress";
import Toolbar from "./toolbar";
import { useContext, useEffect, useState } from "react";
import LimitContext from "@/context/limit-context";

interface EditorProps {
  defaultContent: string;
  handleEditorChange: () => void;
  setEditorContent: React.Dispatch<React.SetStateAction<string>>;
  setInitiateAutoSave: React.Dispatch<React.SetStateAction<boolean>>;
  isLimitExceeded: boolean;
  usageLeft: number;
}

const Tiptap = ({
  defaultContent,
  setEditorContent,
  setInitiateAutoSave,
  handleEditorChange,
  isLimitExceeded,
  usageLeft,
}: EditorProps) => {
  const { dailyLimit, updateUsage, remainingCharacters } =
    useContext(LimitContext);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      CharacterCount.configure({ limit: dailyLimit }),
      Placeholder.configure({
        placeholder: "Dear journal...",
      }),
    ],
    autofocus: true,
    content: defaultContent,
    editorProps: {
      attributes: {
        class: `prose prose-stone p-6 focus:outline-none min-h-40`,
      },
    },
    onCreate({ editor }) {
      // Set the initial character count from default content
      const initialCharacters = editor.storage.characterCount.characters();
      updateUsage(initialCharacters);
    },
    onUpdate({ editor }) {
      const writtenCharacters = editor.storage.characterCount.characters();
      const charactersUsed =
        writtenCharacters - editor.storage.characterCount.previousCharacters; // Calculate the characters added in this update
      editor.storage.characterCount.previousCharacters = writtenCharacters; // Update the previous character count

      if (remainingCharacters - charactersUsed >= 0) {
        updateUsage(charactersUsed);
      }

      const html = editor.getHTML();
      setEditorContent(html);
      setInitiateAutoSave(true);
      handleEditorChange();
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
      {/* <Progress editor={editor} limit={dailyLimit} /> */}
    </>
  );
};

export default Tiptap;
