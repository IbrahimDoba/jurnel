import Image from 'next/image';
import Link from 'next/link';
// import Hamburger from '../ui/hamburger';

const Navbar: React.FC = () => {
  return (
    <>
      <header className='sticky z-40 top-0 flex justify-center items-center border-b bg-main py-4 px-6 md:px-8 lg:px-24 max-w-[90rem] mx-auto'>
        <div>
          <Link href='/'>
            <Image
              src={'/vercel.svg'}
              alt='wordgen logo'
              className='w-[150px] max-h-[27px]'
            />
          </Link>
        </div>
      </header>
    </>
  );
};

export default Navbar;
