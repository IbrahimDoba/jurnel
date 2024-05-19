"use client";
import { auth, googleProvider } from "@/firebase";
import { login } from "@/redux/auth/authSlice";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

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
        router.push("/jurnal");
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
        router.push("/jurnal/jurnals");
      })
      .catch(() => {
        setErrorMsg("Invalid credentials");
      });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-emerald-100 flex items-center justify-center">
      <div className="w-full max-w-xs mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
        <div className="flex items-center justify-center"> {/* change to between when forgot password func is available */}
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
        <div className="mt-6 text-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="mt-6 text-center">
          <span className="inline-block align-baseline font-bold text-sm text-black hover:text-black">
            Or sign in with
          </span>
          <button
            onClick={handleSignUpWithGoogle}
            className="ml-4 bg-blue-400 border border-gray-300 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-500 hover:border-gray-400"
          >
            Google
          </button>
        </div>
        <p className="mt-4 justify-center items-center flex">
          Click here to <Link href='/auth/signup' className="underline ml-2 text-blue-800 cursor-pointer">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
