import Head from "next/head";
import Link from "next/link";

export default function About() {
  return (
    <div className="bg-emerald-50 min-h-screen">
      <Head>
        <title>About Us - WordGen</title>
      </Head>
      <header className="bg-emerald-800 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-2xl font-bold">WordGen</h1>
          <nav className="flex">
            <Link href="/words">
              <button className="w-fit mr-3 p-2 flex items-center justify-center font-semibold rounded-full  border-2 border-accent hover:bg-emerald-500 outline-none min-w-[6rem] focus-visible:gap-4 focus-visible:bg-main/10 transition-all duration-300">
                Words
              </button>
            </Link>
            <Link href="/auth/login">
              <button className="w-fit p-2 flex items-center justify-center font-semibold rounded-full  border-2 border-accent hover:bg-emerald-500 outline-none min-w-[6rem] focus-visible:gap-4 focus-visible:bg-main/10 transition-all duration-300">
                Login
              </button>
            </Link>
          </nav>
        </div>
      </header>
      <div className="container mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold text-emerald-800 mb-6">About Us</h1>
        <p className="text-lg text-gray-700 mb-4">
          Welcome to our private and secure platform where you can explore new
          words and quotes, and write personal journals and diaries. Our website
          is designed to be a safe haven for your thoughts and creativity.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-4">
            What We Are About
          </h2>
          <p className="text-gray-700 mb-2">
            Our website is dedicated to providing a secure and private space for
            individuals to enhance their vocabulary and express their thoughts.
            Whether you are looking for inspiration through our word and quote
            generator, or seeking a personal space to write your journals, we
            have you covered.
          </p>
          <p className="text-gray-700">
            We prioritize your privacy and security, ensuring that your personal
            writings are safely stored and accessible only to you.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-4">
            Features
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            <li className="mb-2">
              <span className="font-semibold text-emerald-700">
                Word, Name, and Quote Generator:
              </span>{" "}
              Discover new words, names, and quotes to inspire your writing and
              expand your vocabulary.
            </li>
            <li>
              <span className="font-semibold text-emerald-700">
                Journal Feature:
              </span>{" "}
              Write and store your private journals securely. Access them
              anytime, anywhere with complete peace of mind.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-4">
            Pricing
          </h2>
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-emerald-800">
                Journal Pro
              </h3>
              <p className="text-gray-700">$4.99/month - 10k word limit</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-emerald-800">
                Journal Unlimited
              </h3>
              <p className="text-gray-700">$9.99/month - Unlimited words</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
