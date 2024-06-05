"use client";
import Link from "next/link";
import Image from "next/image";
import { BsArrowRight } from "react-icons/bs";
import PremiumModal from "@/components/premiumModal";

export default function Page() {
  return (
    <section className="min-h-screen grid place-items-center md:grid-cols-2 gap-4 px-6 lg:px-24">
      <div className="flex flex-col gap-6 lg:gap-10 justify-center h-full">
        <h1 className="text-3xl lg:text-7xl font-bold mt-3">WordGen</h1>
        <p className="text-xl lg:text-2xl max-w-[900px]">
          Welcome to WordGen, a platform to learn new words, names, quotes, and
          journal.
        </p>
        <div className="flex gap-8">
          <Link
            href="/words"
            className="w-fit p-2 flex items-center justify-center font-semibold rounded-full gap-2 border-2 border-accent hover:bg-primary outline-none min-w-[8rem] focus-visible:gap-4 focus-visible:bg-main/10 transition-all duration-300"
          >
            Learn
            <BsArrowRight aria-hidden="true" />
          </Link>
          <Link
            href="/auth/login"
            className="w-fit p-2 flex items-center justify-center font-semibold rounded-full gap-2 border-2 border-accent hover:bg-primary outline-none min-w-[8rem] focus-visible:gap-4 focus-visible:bg-main/10 transition-all duration-300"
          >
            Journal
            <BsArrowRight aria-hidden="true" />
          </Link>
          <Link
            href="/aboutus"
            className="w-fit p-2 flex items-center justify-center font-semibold rounded-full gap-2 border-2 border-accent hover:bg-primary outline-none min-w-[8rem] focus-visible:gap-4 focus-visible:bg-main/10 transition-all duration-300"
          >
            Learn about us
            <BsArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className="max-md:row-[1]">
        <Image
          src={"/journal.svg"}
          alt="hero image"
          width={500}
          height={500}
          className="object-cover"
        />
      </div>
      <PremiumModal isOpen onClose={() => {}} />
    </section>
  );
}
