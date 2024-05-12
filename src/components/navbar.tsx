'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar: React.FC = () => {
  const pathname = usePathname();

  return (
    <>
      <header className='sticky z-40 top-0 flex justify-center items-center bg-main border-b border-b-primary py-3 px-6 md:px-8 lg:px-24 max-w-[90rem] mx-auto'>
        <ul className='py-2 px-8 rounded-full bg-primary flex items-center justify-center gap-4 lg:gap-6 text-accent text-sm font-semibold'>
          <li>
            <Link href='/words' className={`${pathname === '/words' ? 'bg-accent text-white' : ''} hover:bg-accent hover:text-white transition duration-300 rounded-full px-2 py-0.5`}>Words</Link>
          </li>
          <li>
            <Link href='/names' className={`${pathname === '/names' ? 'bg-accent text-white' : ''} hover:bg-accent hover:text-white transition duration-300 rounded-full px-2 py-0.5`}>Names</Link>
          </li>
          <li>
            <Link href='/quotes' className={`${pathname === '/quotes' ? 'bg-accent text-white' : ''} hover:bg-accent hover:text-white transition duration-300 rounded-full px-2 py-0.5`}>Quotes</Link>
          </li>
          <li>
            <Link href='/jurnal' className={`${pathname === '/jurnal' ? 'bg-accent text-white' : ''} hover:bg-accent hover:text-white transition duration-300 rounded-full px-2 py-0.5`}>Jurnal</Link>
          </li>
        </ul>
      </header>
    </>
  );
};

export default Navbar;
