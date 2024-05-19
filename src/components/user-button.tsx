"use client";
import { logout } from "@/redux/auth/authSlice";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { CgUser } from "react-icons/cg";
import { useDispatch } from "react-redux";

interface UserButtonProps {
  email?: string | null | undefined;
  id?: string | undefined;
  name?: string | null | undefined;
  image?: string | null | undefined;
}

function UserButton({ user }: { user: UserButtonProps }) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [popover, setPopover] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!popover) return;

    const handleClickOutside = (e: Event) => {
      // Use a type assertion here to treat e.target as an HTMLElement
      const target = e.target as HTMLElement;

      // Check if the target is not the popover or a descendant of the popover
      if (target.closest("#popover") === null) {
        setPopover(false);
      }
    };

    // Add click event listener to the document
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [popover]); // Dependency on popover state

  return (
    <div className="relative z-[100]">
      {/* user image and email */}
      <div className="flex">
        <button
          type="button"
          title={user.name || "user"}
          className="w-8 h-8 rounded-full"
          onClick={() => setPopover(!popover)}
        >
          {user.image ? (
            <Image
              src={user.image ? user.image : ""}
              alt="user"
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <CgUser className="text-emerald-500" size={30} />
          )}
        </button>
      </div>

      {/* popover */}
      <div
        id="popover"
        ref={popoverRef}
        className={`whitespace-nowrap absolute overflow-hidden -top-32 left-0 flex flex-col bg-main text-accent/50 text-sm shadow-2xl rounded-md  ${
          !popover ? "invisible animate-up" : "visible animate-down"
        } transition-all duration-300`}
      >
        <div className="flex gap-4 py-4 px-5 items-center border-b text-accent">
          <CgUser size={18} />
          <div className="flex flex-col">
            <p>{user.name}</p>
            <p className="text-sm">{user.email}</p>
          </div>
        </div>
        <button
          type="button"
          className="flex gap-4 items-center py-4 px-5 text-accent hover:bg-primary transition duration-300"
          onClick={() => dispatch(logout())}
        >
          <BiLogOut size={18} />
          <span className="text-sm">sign out</span>
        </button>
      </div>
    </div>
  );
}

export default UserButton;
