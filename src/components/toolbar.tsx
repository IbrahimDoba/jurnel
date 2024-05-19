import { BubbleMenu, Editor } from '@tiptap/react';
import {
  FaBold,
  FaItalic,
  FaList,
  FaQuoteLeft,
  FaStrikethrough,
  FaUnderline,
} from 'react-icons/fa';

import { VscListOrdered } from "react-icons/vsc";

import { GoListOrdered } from "react-icons/go";
function Toolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100, animation: 'fade' }}
      className='bg-gray-700 p-4 rounded-md flex gap-2 text-white'
    >
      <button
        type='button'
        title='Bold'
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={
          editor.isActive('bold') ? 'text-accent' : 'hover:text-blue-300'
        }
      >
        <FaBold />
      </button>
      <button
        type='button'
        title='Italic'
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={
          editor.isActive('italic') ? 'text-accent' : 'hover:text-blue-300'
        }
      >
        <FaItalic />
      </button>
      <button
        type='button'
        title='Strike'
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={
          editor.isActive('strike') ? 'text-accent' : 'hover:text-blue-300'
        }
      >
        <FaStrikethrough />
      </button>
      <button
        type='button'
        title='Underline'
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={
          editor.isActive('underline') ? 'text-accent' : 'hover:text-blue-300'
        }
      >
        <FaUnderline />
      </button>
      <span className='block min-h-full w-[1px] bg-primary'></span>
      <button
        type='button'
        title='Unordered List'
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive('bulletList') ? 'text-accent' : 'hover:text-blue-300'
        }
      >
        <FaList />
      </button>
      <button
        type='button'
        title='Ordered List'
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
          editor.isActive('orderedList') ? 'text-accent' : 'hover:text-blue-300'
        }
      >
        <GoListOrdered size={22}/>
      </button>
    </BubbleMenu>
  );
}

export default Toolbar;
