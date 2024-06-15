"use client";
import { auth, googleProvider } from "@/firebase";
import { login } from "@/redux/auth/authSlice";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import SignupPNG from "../../../../public/signup1.png";

const SignUp = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignUpWithGoogle = async () => {
    setIsLoading(true);
    const result = await signInWithPopup(auth, googleProvider)
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
        setErrorMsg(
          "Something went wrong creating your account, please try again."
        );
      });
    setIsLoading(false);
  };

  const handleCheckFields = () => {
    setErrorMsg("");
    if (signUpData.password !== signUpData.confirmPassword) {
      setErrorMsg("Passwords do not match");
      return false;
    }
    if (signUpData.email && signUpData.password && signUpData.confirmPassword) {
      return true;
    }
    setErrorMsg("All fields are required");
    return false;
  };

  const handleSubmit = async () => {
    if (!handleCheckFields()) {
      return;
    }
    setIsLoading(true);
    await createUserWithEmailAndPassword(
      auth,
      signUpData.email,
      signUpData.password
    )
      .then((res) => {
        console.log("SIGN UP: ", res);
        router.push("/login");
      })
      .catch((e) => {
        if (e.message === "Firebase: Error (auth/email-already-in-use).") {
          setErrorMsg("User with this email already exists");
          return;
        }
        setErrorMsg(
          "Somthing went wrong creating your account, please try again"
        );
      });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex w-[70%] justify-center items-center  ">
        <div className="flex flex-col max-lg:hidden">
          <h1 className="text-4xl font-semibold text-emerald-400 text-center mb-6">
            Signup to Jurnal
          </h1>
          <Image src={SignupPNG} alt="Login Png" width={900} />
        </div>
        <div className="w-full max-w-lg mx-auto bg-emerald-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
              value={signUpData.email}
              onChange={(e) =>
                setSignUpData({ ...signUpData, email: e.target.value })
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
              value={signUpData.password}
              onChange={(e) =>
                setSignUpData({ ...signUpData, password: e.target.value })
              }
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              placeholder="******"
              value={signUpData.confirmPassword}
              onChange={(e) =>
                setSignUpData({
                  ...signUpData,
                  confirmPassword: e.target.value,
                })
              }
            />
          </div>
          <span className="text-red-600  text-xl">{errorMsg}</span>

          <div className="flex flex-col items-center justify-between mt-2">
            <button
              disabled={isLoading}
              onClick={handleSubmit}
              className={` bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Loading..." : "Create Account"}
            </button>
            <a href="/auth/login" className="inline-block align-baseline mt-3 ">
              Already have an account?{" "}
              <span className="font-bold text-sm cursor-pointer text-blue-500 hover:text-blue-800 underline">
                Log in
              </span>
            </a>
          </div>
          <div className="mt-6 text-center">
            <div className="w-full border-t border-gray-400 pb-4"></div>
          </div>
          <div className=" text-center flex flex-col justify-center items-center">
            <span className="inline-block align-baseline font-bold text-sm text-black hover:text-black mb-4">
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
        </div>
      </div>
    </div>
  );
};

export default SignUp;
