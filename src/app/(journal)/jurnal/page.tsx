'use client';
import AddNew from '@/components/add-new';
import JournalControls from '@/components/journal-controls';
import JournalEntry from '@/components/journal-entry';
import { defaultHtml } from '@/data/default';
import { useState } from 'react';

const dummyEntries = [
  { id: '1', title: 'Welcome to Jurnal by Wordgen 🎉', body: defaultHtml },
  {
    id: '2',
    title: 'Welcome to Jurnal by Wordgen 🎉',
    body: '<p>Hello World</p>',
  },
];

function Jurnal() {
  const [entriesForToday, setEntriesForToday] = useState(dummyEntries);
  const addEntry = () =>
    setEntriesForToday([
      ...entriesForToday,
      {
        id: '',
        title: 'Welcome to Jurnal by Wordgen 🎉',
        body: '<p>Hello World</p>',
      },
    ]);
  const removeEntry = (id: string) => {
    const newEntries = entriesForToday.filter((entry) => entry.id !== id);
    setEntriesForToday(newEntries);
  };

  return (
    <section className='grid gap-4 lg:grid-cols-[auto_1fr] items-start w-full h-full py-10'>
      <div className='lg:sticky top-10 h-20 w-full px-6 rounded-md flex items-center justify-center'>
        {/* date component can br passed necessary fn or brought here */}
        <JournalControls />
      </div>
      <ul className='flex flex-col gap-10 items-center'>
        {/* entry list */}
        {entriesForToday.map((entry, index) => (
          <JournalEntry
            key={index}
            id={entry.id}
            title={entry.title}
            body={entry.body}
            deleteEntry={removeEntry}
          />
        ))}
      </ul>
      {/* New entry button */}
      <AddNew addNewEntry={addEntry} />
    </section>
  );
}

export default Jurnal;
