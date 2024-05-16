import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

function JournalControls() {
  return (
    <div className='lg:fixed top-10 left-40 flex flex-col gap-1'>
      <div className='flex gap-2 justify-center items-center'>
        <button
          type='button'
          title='previous day'
          className='bg-accent p-0.5 rounded-md text-white'
        >
          <BiChevronLeft size={25} />
        </button>
        <span className='p-2 text-sm font-semibold text-accent bg-primary rounded-full'>
          WG
        </span>
        <button
          type='button'
          title='next day'
          className='bg-accent p-0.5 rounded-md text-white'
        >
          <BiChevronRight size={25} />
        </button>
      </div>
      <div className='leading-4 flex flex-col items-center'>
        {/* replace with day e.g wednesday */}
        <p className='text-xl text-black'>Today</p>{' '}
        {/* the date eg m/d/y */}
        <p className='text-accent text-sm'>{new Date().toDateString().split(' ').slice(1).join(' ')}</p>
      </div>
    </div>
  );
}

export default JournalControls;
