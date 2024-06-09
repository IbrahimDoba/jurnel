"use client";
import { auth, db, googleProvider } from "@/firebase";
import { login } from "@/redux/auth/authSlice";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import loginPNG from "../../../../public/login.png";
import Image from "next/image";

const ResetPassword = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    const checkValidity = handleCheckFields();
    if (!checkValidity) {
      return;
    }
    setIsLoading(true);
    await sendPasswordResetEmail(auth, loginData)
      .then((res) => setSuccess(true))
      .catch(() => {
        setErrorMsg("Invalid credentials");
      });
    setIsLoading(false);
  };

  const handleCheckFields = () => {
    setErrorMsg("");
    if (loginData) {
      return true;
    }
    setErrorMsg("Please provide a valid email");
    return false;
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex w-[70%] justify-center items-center  ">
        <div className="flex flex-col max-lg:hidden">
          <h1 className="text-4xl font-semibold text-emerald-400 text-center mb-6">
            Reset Your Password
          </h1>
          <Image src={loginPNG} alt="Login Png" width={700} />
        </div>
        {!success ? (
          <div className="w-full max-w-lg mx-auto bg-emerald-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <span className="text-red-500 text-sm">{errorMsg}</span>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="johndoe@mail.com"
                value={loginData}
                onChange={(e) => setLoginData(e.target.value)}
              />
            </div>

            <div className="flex flex-col items-center justify-center">
              {" "}
              {/* change to between when forgot password func is available */}
              <button
                disabled={isLoading}
                onClick={handleSubmit}
                className={` bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Loading..." : "Submit"}
              </button>
              <Link
                href="/auth/login"
                className="inline-block align-baseline self-end font-bold text-sm text-blue-500 hover:text-blue-800"
              >
                Login
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex">
            <span className="text-center">
              PLEASE CHECK YOUR EMAIL TO COMPLETE RESETTING YOUR PASSWORD
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
