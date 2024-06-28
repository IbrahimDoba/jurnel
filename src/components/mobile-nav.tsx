"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BookMarked } from "lucide-react";
import MaxWidth from "@/components/shared/max-width";
import { IRootState } from "@/redux/store";
import { useSelector } from "react-redux";

function MobileNav() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const { isLogged } = useSelector((state: IRootState) => state.user);
  useEffect(() => {
    if (expanded) {
      setExpanded(!expanded);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (expanded) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [expanded]);

  return (
    <header className="sticky inset-x-0 top-0 z-[100] h-14 border-b border-emerald-100 bg-main backdrop-blur-lg md:hidden">
      {/* logo */}
      <MaxWidth className="flex items-center justify-between">
        {/* nav-controls */}
         <Link href="/" className="flex items-center gap-2">
            <BookMarked size={24} />
            <span className="text-lg font-semibold">WG</span>
         </Link>
        <button
          type="button"
          title="toggle menu"
          aria-controls="mobile-menu"
          onClick={() => setExpanded((prev) => !prev)}
          className="z-50 flex h-7 flex-col justify-center gap-1 rounded-sm bg-emerald-500 p-1 outline-2 outline-offset-2 md:hidden"
        >
          <span
            className={`h-0.5 w-6 rounded-full bg-white transition duration-500 ${
              expanded && "translate-y-1 rotate-45"
            }`}
            aria-hidden="true"
          ></span>
          <span
            className={`h-0.5 w-5 rounded-full bg-white transition duration-500 ${
              expanded && "hidden"
            }`}
            aria-hidden="true"
          ></span>
          <span
            className={`h-0.5 w-4 rounded-full bg-white transition duration-500 ${
              expanded && "w-6 -translate-y-0.5 -rotate-45"
            }`}
            aria-hidden="true"
          ></span>
        </button>

        {/* navigation */}
        <nav
          id="mobile-menu"
          className={`absolute inset-0 z-40 min-h-screen w-3/4 bg-white/90 backdrop-blur-lg transition-all duration-300 ease-in-out ${
            expanded ? "max-md:tranxlate-x-0" : "max-md:-translate-x-full"
          }`}
        >
          <ul className="flex h-full w-full flex-col gap-6 px-8 py-14 text-lg font-medium transition duration-300">
            <li className="relative">
              <Link
                href="/words"
                className={`rounded-md px-2 py-1.5 text-sm outline-2 transition duration-300 hover:bg-emerald-100 `}
              >
                Words
              </Link>
            </li>

            <li className="relative">
              <Link
                href="/names"
                className={`rounded-md px-2 py-1 text-sm outline-2 hover:bg-emerald-100 }`}
              >
                Names
              </Link>
            </li>
            <li className="relative">
              <Link
                href="/quotes"
                className={`rounded-md px-2 py-1 text-sm outline-2 hover:bg-emerald-100 `}
              >
                Quotes
              </Link>
            </li>
            <li className="relative">
              <Link
                href="/jurnal"
                className={`rounded-md px-2 py-1 text-sm outline-2 hover:bg-emerald-100 `}
              >
                Journal ✨
              </Link>
            </li>
            {pathname === "/jurnal" && (
              <li className="relative">
                <Link
                  href="/list"
                  className={`rounded-md px-2 py-1 text-sm outline-2 hover:bg-emerald-100`}
                >
                  Lists ✨
                </Link>
              </li>
            )}
            {
               !isLogged && (

               <li className="relative">
              <Link
                href="/login"
                className={`rounded-md px-2 py-1 text-sm outline-2 hover:bg-emerald-100 ${
                  pathname === "/pharmacies" ? "bg-gray-200" : "bg-transparent"
                }`}
              >
                Login
              </Link>
            </li>
         )}
          </ul>
        </nav>

        {/* backdrop */}
        <div
          className={`fixed inset-0 z-20 min-h-screen bg-black/90 backdrop-blur-md transition md:hidden ${
            expanded ? "visible opacity-100" : "invisible opacity-0"
          }`}
          aria-hidden="true"
          onClick={() => setExpanded(false)}
        />
      </MaxWidth>
    </header>
  );
}

export default MobileNav;
