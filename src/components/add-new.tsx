"use client";
import moment from "moment";
import React from "react";
import {Loader2, Plus} from 'lucide-react'

function AddNew({
  addNewEntry,
  handleCreateJournal,
  isLoading,
}: {
  addNewEntry: () => void;
  handleCreateJournal: () => void;
  isLoading: boolean;
}) {
  const today = moment().format("YYYY-MM-DD");
  return (
    <div className="relative group">
      <button
        type="button"
        title="new"
        disabled={isLoading}
        className={`z-50 flex items-center justify-center fixed w-12 h-12 bottom-10 right-10 p-2 rounded-full shadow-md text-white bg-accent border border-dashed border-main focus-visible:outline-accent focus-visible:outline-2 outline-offset-2 outline-dotted transition duration-500`}
        onClick={addNewEntry}
      >
        {isLoading ? (
          <Loader2 className='animate-spin transition w-5 h-5'/>
        ) : (
          <Plus size={20} />
        )}
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
