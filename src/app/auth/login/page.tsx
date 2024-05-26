"use client";
import { auth, googleProvider } from "@/firebase";
import { login } from "@/redux/auth/authSlice";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import loginPNG from "../../../../public/login.png";
import Image from "next/image";

const Login = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignUpWithGoogle = async () => {
    setIsLoading(true);
    await signInWithPopup(auth, googleProvider)
      .then((res) => {
        dispatch(
          login({
            email: res.user.email ?? "",
            id: res.user.uid,
            profilePicture: res.user.photoURL ?? undefined,
          })
        );
        router.push("/journal");
      })
      .catch(() => {
        setErrorMsg("Invalid credentials");
      });
    setIsLoading(false);
  };

  const handleCheckFields = () => {
    setErrorMsg("");
    if (loginData.email && loginData.password) {
      return true;
    }
    setErrorMsg("Both fields are required");
    return false;
  };

  const handleSubmit = async () => {
    if (!handleCheckFields()) {
      return;
    }
    setIsLoading(true);
    await signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      .then((res) => {
        dispatch(
          login({
            email: res.user.email ?? "",
            id: res.user.uid,
          })
        );
        router.push("/journal");
      })
      .catch(() => {
        setErrorMsg("Invalid credentials");
      });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex w-[70%] justify-center items-center  ">
        <div className="flex flex-col max-lg:hidden">
          <h1 className="text-4xl font-semibold text-emerald-400 text-center mb-6">Login to Jurnel</h1>
          <Image src={loginPNG} alt="Login Png" width={700} />
        </div>
        <div className="w-full max-w-lg mx-auto bg-emerald-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <span>{errorMsg}</span>
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
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
          </div>
          <div className="flex items-center justify-center">
            {" "}
            {/* change to between when forgot password func is available */}
            <button
              disabled={isLoading}
              onClick={handleSubmit}
              className={` bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Loading..." : "Sign In"}
            </button>
            {/* <a
            href="#"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Forgot Password?
          </a> */}
          </div>
          {/* <div className="mt-6 text-center">
            <div className="w-full border-t border-gray-200"></div>
          </div> */}
          <div className="mt-6 text-center flex flex-col justify-center items-center">
            <span className="inline-block align-baseline font-bold text-sm text-black hover:text-black mb-5 pt-4 border-t border-gray-400  w-full">
              Or sign in with
            </span>
            <button
              type="button"
              onClick={handleSignUpWithGoogle}
              className="text-white bg-[#4285F4] w-[50%] max-lg:w-[80%] hover:bg-[#EA4335] focus:ring-4 focus:outline-none focus:ring-[#34A853] font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
            >
              <svg
                className="w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 19"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                  clip-rule="evenodd"
                />
              </svg>
              Sign in with Google
            </button>
          </div>
          <p className="mt-4 justify-center items-center flex max-lg:flex max-lg:flex-col">
            Click here to{" "}
            <Link
              href="/auth/signup"
              className="underline ml-2 text-blue-800 cursor-pointer"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
