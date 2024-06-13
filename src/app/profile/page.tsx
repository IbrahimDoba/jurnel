"use client";
import { IRootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { VscArrowCircleLeft } from "react-icons/vsc";
import { useSelector } from "react-redux";
import profile from "../../../public/profile.png";
import { usePathname } from "next/navigation";
import PremiumModal from "@/components/premiumModal";

const Profile = () => {
  const { user, isLogged } = useSelector((state: IRootState) => state.user);
  const { subscription } = useSelector(
    (state: IRootState) => state.subscription
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClose = () => setIsModalOpen(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the update logic here
    console.log({ username, email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-row-reverse justify-around items-center w-[1400px] p-8">
        <div className="max-lg:hidden ml-10">
          <Image
            src={profile}
            width={800}
            alt="profile image"
            className="shadow-lg fill"
          />
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
          {isLogged ? (
            <div className="absolute top-4 right-4 text-center ml-6">
              <span className="mr-2 font-bold">Plan:</span>
              {subscription === "free" ? (
                <span
                  onClick={() => setIsModalOpen(true)}
                  className="text-white bg-red-500 rounded-lg px-2 py-[2px] font-semibold cursor-pointer"
                >
                  Free
                </span>
              ) : subscription === "pro" ? (
                <span
                  onClick={() => setIsModalOpen(true)}
                  className={`${"bg-purple-600"} text-white cursor-pointer rounded-lg capitalize text-center px-2 py-0.5`}
                >
                  {subscription}✨
                </span>
              ) : (
                <span
                  className={`${"bg-yellow-600"} text-white  rounded-lg capitalize text-center px-2 py-0.5`}
                >
                  {subscription}✨
                </span>
              )}
            </div>
          ) : (
            ""
          )}

          <Link
            href="/journal"
            className=" text-emerald-400 cursor-pointer hover:scale-100 duration-150"
          >
            <VscArrowCircleLeft size={40} />
          </Link>
          <h2 className="text-2xl font-bold mb-6 text-emerald-600 pt-5">
            Profile
          </h2>
          <form onSubmit={handleUpdate} className="space-y-6">
            {/* <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            />
          </div> */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                disabled
                value={user.email}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Current Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-emerald-600 text-white rounded-md shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
      <PremiumModal isOpen={isModalOpen} onClose={handleClose} />
    </div>
  );
};

export default Profile;
