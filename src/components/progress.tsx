import { Editor } from '@tiptap/react';
import React from 'react';

function Progress({editor, percentage}: {editor: Editor, percentage: number}) {
  const limit = 1000;
  return (
    <div
      className={`py-2 px-4 flex gap-2 items-center border-t border-primary border-dashed character-count ${
        editor.storage.characterCount.characters() === limit
          ? 'text-red-400'
          : ''
      }`}
    >
      <svg
        height='20'
        width='20'
        viewBox='0 0 20 20'
        className='character-count__graph'
      >
        <circle r='10' cx='10' cy='10' fill='#eefcf6' />
        <circle
          r='5'
          cx='10'
          cy='10'
          fill='transparent'
          stroke='#10b77f'
          strokeWidth='10'
          strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
          transform='rotate(-90) translate(-20)'
        />
        <circle r='6' cx='10' cy='10' fill='white' />
      </svg>
      <p className='text-xs text-accent font-semibold'>
        {editor.storage.characterCount.characters()}/{limit} characters
      </p>
    </div>
  );
}

export default Progress;
