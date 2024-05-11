import { BiLogIn } from 'react-icons/bi';
import SidebarLink from './sidebar-link';
import Link from 'next/link';

function SignInButton() {
  return (
    <div className='relative group'>
      <Link href={'/auth/login'} className='hover:text-accent bg-primary'>
        <BiLogIn size={20} />
      </Link>
      <div
        className={`max-md:hidden
            whitespace-nowrap absolute top-1.5 left-full rounded-md 
            px-2 py-1 ml-6 bg-accent/10 text-accent text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
         `}
      >
        Login
      </div>
    </div>
  );
}

export default SignInButton;
