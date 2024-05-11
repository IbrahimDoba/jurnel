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

  const myColors = [
    'purple',
    '#785412',
    '#452632',
    '#856325',
    '#963254',
    '#254563',
    'white',
  ];

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'color',
    'image',
    'background',
    'align',
  ];

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ align: ['right', 'center', 'justify'] }],
      [{ color: myColors }, { background: myColors }],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  };

  return (
    <ReactQuill
      id='content'
      theme='bubble'
      className='focus-within:outline-1 focus-within:outline-dashed'
      value={value}
      onChange={onChange}
      modules={modules}
      placeholder='Whats on your mind...'
    />
  );
}

export default Editor;
