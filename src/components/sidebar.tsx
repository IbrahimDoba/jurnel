'use client';
import SidebarLink from './sidebar-link';
import UserButton from './user-button';
import SignInButton from './sign-in-button';
import { BsJournal, BsJournals } from 'react-icons/bs';
import { TiPen } from 'react-icons/ti';
import Image from 'next/image';
import { FiPlusCircle } from 'react-icons/fi';
import { CiCircleList } from 'react-icons/ci';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { IRootState } from '@/redux/store';

const Sidebar = () => {
  const { user } = useSelector((state: IRootState) => state.user);

  const pathname = usePathname();

  return (
    <>
      <aside
        className={`max-md:hidden z-50 border-r border-dashed border-r-primary bg-main transition-all duration-300 sticky top-0 h-full max-h-[100svh]`}
      >
        <nav className='h-full flex flex-col gap-6 py-6 px-4 justify-between transition-all duration-300'>
          <div className='relative flex justify-between items-center'>
            <Link href='/words' className='flex text-xl items-center font-bold'>
              <Image
                src='/wordgen.png'
                alt='logo'
                width={40}
                height={40}
                className='rounded-lg'
              />
            </Link>
          </div>

          {/* main nav */}
          <ul className='flex flex-col gap-4 min-w-full py-4'>
            <SidebarLink
              path='/jurnal'
              text='jurnals'
              icon={<BsJournals size={20} />}
            />
            <SidebarLink
              path='/lists'
              text='lists'
              icon={<CiCircleList size={20} />}
            />
          </ul>

          {/* user info | auth status */}
          <div className='border-t border-t-primary px-1 pt-2'>
            {user ? <UserButton user={user} /> : <SignInButton />}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
