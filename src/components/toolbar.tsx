import { BubbleMenu, Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  Underline,
} from "lucide-react";
function Toolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100, animation: "fade" }}
      className="flex gap-2 rounded-md bg-gray-700 px-4 py-3 text-white"
    >
      <button
        type="button"
        title="Bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={
          editor.isActive("bold") ? "text-accent" : "hover:text-green-300"
        }
      >
        <Bold size={20} />
      </button>
      <button
        type="button"
        title="Italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={
          editor.isActive("italic") ? "text-accent" : "hover:text-green-300"
        }
      >
        <Italic size={20} />
      </button>
      <button
        type="button"
        title="Strike"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={
          editor.isActive("strike") ? "text-accent" : "hover:text-green-300"
        }
      >
        <Strikethrough size={20} />
      </button>
      <button
        type="button"
        title="Underline"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={
          editor.isActive("underline") ? "text-accent" : "hover:text-green-300"
        }
      >
        <Underline size={20} />
      </button>
      <button
        type="button"
        title="Unordered List"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive("bulletList") ? "text-accent" : "hover:text-green-300"
        }
      >
        <List size={20} />
      </button>
      <button
        type="button"
        title="Ordered List"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
          editor.isActive("orderedList")
            ? "text-accent"
            : "hover:text-green-300"
        }
      >
        <ListOrdered size={20} />
      </button>
    </BubbleMenu>
  );
}

export default Toolbar;
