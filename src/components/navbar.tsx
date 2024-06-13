"use client";
import { IRootState } from "@/redux/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import PremiumModal from "./premiumModal";

const Navbar: React.FC = () => {
  const { subscription } = useSelector(
    (state: IRootState) => state.subscription
  );
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClose = () => setIsModalOpen(false);
  return (
    <>
      <header className="sticky z-40 top-0 flex justify-center items-center bg-main border-b border-b-primary py-3 px-6 md:px-8 lg:px-24 max-w-[90rem] mx-auto">
        <ul className="py-2 px-8 rounded-full bg-primary flex items-center justify-center gap-4 lg:gap-6 text-accent text-sm font-semibold">
          <li>
            <Link
              href="/words"
              className={`${
                pathname === "/words" ? "bg-accent text-white" : ""
              } hover:bg-accent hover:text-white transition duration-300 rounded-full px-2 py-0.5`}
            >
              Words
            </Link>
          </li>
          <li>
            <Link
              href="/names"
              className={`${
                pathname === "/names" ? "bg-accent text-white" : ""
              } hover:bg-accent hover:text-white transition duration-300 rounded-full px-2 py-0.5`}
            >
              Names
            </Link>
          </li>
          <li>
            <Link
              href="/quotes"
              className={`${
                pathname === "/quotes" ? "bg-accent text-white" : ""
              } hover:bg-accent hover:text-white transition duration-300 rounded-full px-2 py-0.5`}
            >
              Quotes
            </Link>
          </li>
          <li>
            <Link
              href="/journal"
              className={`${
                pathname === "/journal" ? "bg-accent text-white" : ""
              } hover:bg-accent hover:text-white transition duration-300 rounded-full px-2 py-0.5`}
            >
              Journal
            </Link>
          </li>
          <li className="text-center ml-6">
            {subscription === "free" ? (
              <span
                onClick={() => setIsModalOpen(true)}
                className="text-red-500 rounded-full px-2 py-[2px] font-semibold cursor-pointer"
              >
                upgrade
              </span>
            ) : (
              <Link
                href="/profile"
                className={`${subscription === "pro" ? "bg-purple-600" : "bg-yellow-600"} text-white  rounded-lg capitalize text-center px-2 py-0.5`}
              >
                {subscription}✨
              </Link>
            )}
          </li>
        </ul>
      </header>
      <PremiumModal isOpen={isModalOpen} onClose={handleClose} />
    </>
  );
};

export default Navbar;
