'use client';
import CharacterCount from '@tiptap/extension-character-count';
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import { BubbleMenu, useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { defaultHtml } from '@/data/default';
import { FaBold, FaItalic , FaList, FaQuoteLeft, FaStrikethrough, FaUnderline } from "react-icons/fa";
import Progress from './progress';

const Tiptap = ({setEditorContent, defaultContent}:{setEditorContent:React.Dispatch<React.SetStateAction<string>>, defaultContent:string}) => {
  const limit = 1000;

  const editor = useEditor({
    extensions: [
      StarterKit,
      CharacterCount.configure({
        limit: 1000,
      }),
      // TaskList.configure({}),
    ],
    content: defaultContent,
    editorProps: {
      attributes: {
        class: 'p-6 focus:outline-none',
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
  : 0

  if (!editor) {
    return null;
  }

  return (
    <>
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100, animation: 'fade',}} className='bg-gray-700 p-4 rounded-md flex gap-2 text-white'>
          <button
            title='Bold'
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'text-accent' : 'hover:text-blue-300'}
          >
            <FaBold />
          </button>
          <button
            title='Italic'
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'text-accent' : 'hover:text-blue-300'}
          >
            <FaItalic/>
          </button>
          <button
            title='Strike'
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'text-accent' : 'hover:text-blue-300'}
          >
            <FaStrikethrough />
          </button>
          <button
            title='Underline'
            onClick={() => editor.chain().focus()}
            className={editor.isActive('strike') ? 'text-accent' : 'hover:text-blue-300'}
          >
            <FaUnderline />
          </button>
          <span className='block min-h-full w-[1px] bg-primary'></span>
          <button
            title='Unordered List'
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('strike') ? 'text-accent' : 'hover:text-blue-300'}
          >
            <FaList />
          </button>
          <button
            title='Ordered List'
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('strike') ? 'text-accent' : 'hover:text-blue-300'}
          >
            UL
          </button>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
      <Progress editor={editor} percentage={percentage} />
    </>
  );
};

export default Tiptap;
