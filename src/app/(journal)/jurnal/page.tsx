import JournalEntry from '@/components/journal-entry';

function Jurnal() {
  return (
    <section className='grid place-content-center h-full'>
      <ul className='max-w-screen-lg mx-auto'>
        <JournalEntry />
      </ul>
    </section>
  );
}

export default Jurnal;
