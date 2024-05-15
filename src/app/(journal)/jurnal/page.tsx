import JournalEntry from '@/components/journal-entry';
import { defaultHtml } from '@/data/default';

function Jurnal() {
  return (
    <section className='grid gap-4 lg:grid-cols-[10rem_1fr] items-start w-full h-full py-10'>
      <div className='lg:sticky top-10 h-20 w-full px-6 rounded-md flex items-center justify-center'>
        {/* replace the div below with date comp */}
        <div className='border-accent border-2'>
          <p>Date stuff here</p>
        </div>
      </div>
      <ul className='flex flex-col gap-10 items-center'>
        {/* entry list would probably be a map to display d list from an array if multiple entries*/}
        <JournalEntry defaultContent={defaultHtml}/>
        <JournalEntry defaultContent={''}/>
      </ul>
    </section>
  );
}

export default Jurnal;
