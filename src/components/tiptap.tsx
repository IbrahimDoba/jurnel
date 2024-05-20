"use client";
import CharacterCount from "@tiptap/extension-character-count";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

import Progress from "./progress";
import Toolbar from "./toolbar";

const Tiptap = ({
  setEditorContent,
  defaultContent,
}: {
  setEditorContent: React.Dispatch<React.SetStateAction<string>>;
  defaultContent: string;
}) => {
  const limit = 1000;
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        blockquote: {
          HTMLAttributes: {
            class: "border-l-4 border-gray-300 pl-2",
          },
        },
        italic: {
          HTMLAttributes: {
            class: "italic",
          },
        },
        listItem: {
          HTMLAttributes: {
            class: "pl-2",
          },
        },
        heading: {
          HTMLAttributes: {
            class: "font-bold text-lg",
          },
          levels: [2, 3, 4],
        },
        orderedList: { HTMLAttributes: { class: "list-decimal pl-6" } },
        bulletList: { HTMLAttributes: { class: "list-disc pl-6" } },
      }),
      CharacterCount.configure({
        limit: 1000,
      }),
      Underline,
    ],
    content: defaultContent,
    editorProps: {
      attributes: {
        class: "prose p-6 focus:outline-none",
      },
    },
    onUpdate({ editor }) {
      const html = editor.getHTML();
      console.log(html);
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
      <input
        type="text"
        onChange={(e) => {
          setEditorContent(e.target.value);
        }}
        value={defaultContent}
      />
      <Progress editor={editor} percentage={percentage} />
      <span>ITEM DATA: {defaultContent}</span>
    </>
  );
};

export default Tiptap;
