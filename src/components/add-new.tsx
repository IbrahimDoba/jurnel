'use client';
import React from 'react';
import { MdOutlineAdd } from 'react-icons/md';

function AddNew({ addNewEntry }: { addNewEntry: () => void }) {
  return (
    <div className='relative group'>
      <button
        type='button'
        title='new'
        className={`z-50 flex items-center justify-center fixed w-12 h-12 bottom-10 right-10 p-2 rounded-full shadow-md text-white bg-accent border border-dashed border-main focus-visible:outline-accent focus-visible:outline-2 outline-offset-2 outline-dotted transition duration-500`}
        onClick={addNewEntry}
      >
        <MdOutlineAdd size={20} />
      </button>

      <div
        className={`
            whitespace-nowrap fixed bottom-16 right-10 rounded-md 
            px-2 py-1 mb-6 bg-accent text-main text-sm
            invisible opacity-20 -translate-x-0 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:-translate-x-10
         `}
      >
        Add new entry
      </div>
    </div>
  );
}

export default AddNew;
