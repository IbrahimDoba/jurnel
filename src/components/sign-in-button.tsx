import { LogIn } from 'lucide-react';
import Link from 'next/link';

function SignInButton() {
  return (
    <div className='relative group'>
      <Link href={'/auth/login'} className='hover:text-accent flex items-center justify-center'>
        <LogIn size={20} />
      </Link>
      <div
        className={`max-md:hidden
            whitespace-nowrap absolute top-1.5 left-full rounded-md 
            px-2 py-1 ml-6 bg-accent text-main text-sm
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
