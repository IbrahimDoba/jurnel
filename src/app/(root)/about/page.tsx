import MaxWidth from "@/components/shared/max-width";
import Link from "next/link";

export default function About() {
  return (
    <MaxWidth className="py-12">
      <div className="container">
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
                Jurnal Feature:
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
                WordGen Pro
              </h3>
              <p className="text-gray-700">$4.99/month - 15k word limit</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-emerald-800">
                WordGen Unlimited
              </h3>
              <p className="text-gray-700">$9.99 - Unlimited words</p>
            </div>
          </div>
        </section>
      </div>
    </MaxWidth>
  );
}
