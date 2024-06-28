"use client";
import { IRootState } from "@/redux/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import PremiumModal from "./premiumModal";
import DailyLimitProgressbar from "./daily-limit-progressbar";
import MaxWidth from "./shared/max-width";
import { ArrowRight } from "lucide-react";

const Navbar: React.FC = () => {
  const { isLogged } = useSelector((state: IRootState) => state.user);
  const { subscription } = useSelector(
    (state: IRootState) => state.subscription,
  );
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClose = () => setIsModalOpen(false);
  return (
    <>
      <header className="sticky top-0 z-30 flex w-full items-center justify-center border-b border-emerald-100 bg-main/80 py-3 backdrop-blur-md max-md:hidden">
        <MaxWidth className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-emerald-600 lg:text-lg"
          >
            <p>WordGen</p>
          </Link>
          <nav>
            <ul
              className={`flex min-w-full gap-6 text-lg font-medium transition duration-300`}
            >
              <li className="relative">
                <Link
                  href="/words"
                  className={`text-foreground flex items-center gap-2 rounded-md px-3 py-2 text-sm outline-2 transition duration-300 hover:bg-emerald-100 focus-visible:outline-dashed ${
                    pathname === "/search"
                      ? "bg-emerald-100 text-emerald-500"
                      : "bg-transparent"
                  }`}
                >
                  Words
                </Link>
              </li>
              <li className="relative">
                <Link
                  href="/names"
                  className={`text-foreground flex items-center gap-2 rounded-md px-3 py-2 text-sm outline-2 transition duration-300 hover:bg-emerald-100 focus-visible:outline-dashed ${
                    pathname === "/search"
                      ? "bg-emerald-100 text-emerald-500"
                      : "bg-transparent"
                  }`}
                >
                  Names{" "}
                </Link>
              </li>
              <li className="relative">
                <Link
                  href="/quotes"
                  className={`text-foreground flex items-center gap-2 rounded-md px-3 py-2 text-sm outline-2 transition duration-300 hover:bg-emerald-100 focus-visible:outline-dashed ${
                    pathname === "/search"
                      ? "bg-emerald-100 text-emerald-500"
                      : "bg-transparent"
                  }`}
                >
                  Quotes{" "}
                </Link>
              </li>
              <li
                className="hidden h-8 w-px bg-zinc-200 sm:block"
                aria-hidden="true"
              />
              {!isLogged ? (
                <li className="relative">
                  <Link
                    href="/auth/login"
                    className="flex w-fit items-center gap-2 rounded-md bg-emerald-600 px-3 py-2 text-sm text-white transition duration-300 hover:bg-emerald-600/80"
                  >
                    Login <ArrowRight size={16} />
                  </Link>
                </li>
              ) : (
                <li className="relative">
                  <Link
                    href="/jurnal"
                    className="flex w-fit items-center gap-2 rounded-md bg-emerald-600 px-3 py-2 text-sm text-white transition duration-300 hover:bg-emerald-600/80"
                  >
                    Journal <ArrowRight size={16} />
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </MaxWidth>
        {/* <ul className="py-2 px-8 rounded-full bg-primary flex items-center justify-center gap-4 lg:gap-6 text-accent text-sm font-semibold">
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
              href="/jurnal"
              className={`${
                pathname === "/jurnal" ? "bg-accent text-white" : ""
              } hover:bg-accent hover:text-white transition duration-300 rounded-full px-2 py-0.5`}
            >
              Jurnal
            </Link>
          </li>
          {isLogged ? (
            <li className="text-center ml-6">
              {subscription === "free" ? (
                <span
                  onClick={() => setIsModalOpen(true)}
                  className="text-red-500 rounded-full px-2 py-[2px] font-semibold cursor-pointer hover:underline"
                >
                  Upgrade Here!
                </span>
              ) : (
                <Link
                  href="/profile"
                  className={`${
                    subscription === "pro" ? "bg-purple-600" : "bg-yellow-600"
                  } text-white  rounded-lg capitalize text-center px-2 py-0.5`}
                >
                  {subscription}✨
                </Link>
              )}
            </li>
          ) : (
            <li>
              <Link
                href="/auth/login"
                className={`${
                  pathname === "/auth/login" ? "bg-accent text-white" : ""
                } hover:bg-accent hover:text-white transition duration-300 rounded-full px-2 py-0.5`}
              >
                Login
              </Link>
            </li>
          )}
        </ul> */}
        {/* only show this comp for free tier users */}
        {pathname === "/jurnal" && (
          <div className="fixed right-20">
            <DailyLimitProgressbar />
          </div>
        )}
      </header>
      <PremiumModal isOpen={isModalOpen} onClose={handleClose} />
    </>
  );
};

export default Navbar;
