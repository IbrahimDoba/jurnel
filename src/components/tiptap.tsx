"use client";
import CharacterCount from "@tiptap/extension-character-count";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Progress from "./progress";
import Toolbar from "./toolbar";
import { useEffect } from "react";

const Tiptap = ({
  setEditorContent,
  setInitiateAutoSave,
  defaultContent,
}: {
  setEditorContent: React.Dispatch<React.SetStateAction<string>>;
  defaultContent: string;
  setInitiateAutoSave: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const limit = 1000;
  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      CharacterCount.configure({
        limit: 1000,
      }),
      Underline,
    ],
    autofocus: true,
    content: defaultContent,
    editorProps: {
      attributes: {
        class: "prose prose-stone p-6 focus:outline-none",
      },
    },
    onUpdate({ editor }) {
      setInitiateAutoSave(true);
      const html = editor.getHTML();
      setEditorContent(html);
    },
  });

  const percentage = editor
    ? Math.round((100 / limit) * editor.storage.characterCount.characters())
    : 0;

  if (!editor) {
    return null;
  }

  return (
    <>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
      <Progress editor={editor} percentage={percentage} />
    </>
  );
};

export default Tiptap;
