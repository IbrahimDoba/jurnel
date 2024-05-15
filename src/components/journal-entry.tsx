'use client';
import { useState } from 'react';
import { addDoc } from 'firebase/firestore';
import { journalCollectionRef } from '@/firebase';
import { journalType } from '../../types';
import { IRootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import {  BiSave } from 'react-icons/bi';
import { LuTrash } from 'react-icons/lu';
import Tiptap from './tiptap';

function JournalEntry() {
  const { user, isLogged } = useSelector((state: IRootState) => state.user);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [journalTitle, setJournalTitle] = useState<string>(
    'Welcome Jurnal by Wordgen 🎉'
  );
  const [editorContent, setEditorContent] = useState<string | undefined>();


  const handleSave = async () => {
    setErrorMsg('');
    if (isLogged) {
      setIsSaving(true);
      await addDoc(journalCollectionRef, {
        userEmail: user.email,
        value: editorContent,
      } as journalType)
        .then(() => {
          // DO SOMETHING WHEN THE JOURNAL IS SAVED
        })
        .catch(() => {
          setErrorMsg('Something went wrong');
        });
    } else {
      setErrorMsg('Login required to save journal');
    }
    setIsSaving(false);
  };
  return (
    <div className='flex flex-col w-full max-w-screen-sm mx-auto shadow rounded-md bg-white'>
      <div className='px-4 py-3 grid grid-cols-[1fr_auto] gap-6 border-b border-primary border-dashed'>
        <div className='flex flex-col'>
          <label className='block'>
            <input
              type='text'
              value={journalTitle}
              onChange={(e) => setJournalTitle(e.target.value)}
              placeholder='Some nice title...'
              spellCheck={false}
              className='min-w-full text-accent text-lg lg:text-xl font-semibold placeholder:font-light placeholder:text-sm bg-transparent border-none focus:outline-dashed outline-primary rounded-md p-2'
            />
          </label>
          <span className='text-sm text-red-700'>{errorMsg}</span>
        </div>
        <div className='flex gap-2 items-center'>
          {isSaving && <span>Saving...</span>}
          <button
            title='save'
            type='button'
            onClick={handleSave}
            disabled={isSaving}
            className='hover:bg-primary rounded-md p-1 h-fit w-fit transition duration-200 hover:text-accent'
          >
            <BiSave size={20} />
          </button>
          <button
            title='delete'
            type='button'
            className='hover:bg-red-200 rounded-md p-1 h-fit w-fit transition duration-200 hover:text-red-500'
          >
            <LuTrash size={20} />
          </button>
        </div>
      </div>
      <Tiptap setEditorContent={setEditorContent} />
    </div>
  );
}

export default JournalEntry;
