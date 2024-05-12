'use client';
import Editor from '@/components/editor';
import { useState } from 'react';
import ReactQuill from 'react-quill';

function Page() {
  const [editorContent, setEditorContent] = useState<
    ReactQuill.Value | undefined
  >();

  const handleChange = (content: ReactQuill.Value) => {
    setEditorContent(content);
  };

  return (
    <section className='flex items-center h-full w-full'>
      <div className='w-full max-w-[500px] mx-auto shadow rounded-md bg-white'>
        <div className='py-4 border-b border-primary'>
          <h1 className='text-2xl font-bold text-center text-txt'>New Journal</h1>
        </div>
        <Editor value={editorContent} onChange={handleChange} />
      </div>
    </section>
  );
}

export default Page;
