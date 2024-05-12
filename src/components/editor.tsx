'use client';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

function Editor({
  value,
  onChange,
}: {
  value: ReactQuill.Value | undefined;
  onChange: (content: any) => void;
}) {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );

  const myColors = ['white', 'green', 'yellow', 'orange', 'blue', 'pink'];

  const modules = {
    toolbar: [
      ['bold', 'italic', 'link', 'underline', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ color: myColors }],
    ],
  };

  return (
    <ReactQuill
      id='content'
      theme='bubble'
      value={value}
      onChange={onChange}
      modules={modules}
      className='bg-white min-h-56 h-full w-full p-2 rounded-b-md'
      placeholder='Whats on your mind?'
    />
  );
}

export default Editor;
