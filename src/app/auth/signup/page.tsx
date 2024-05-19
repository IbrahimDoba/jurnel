"use client";
import { auth, googleProvider } from "@/firebase";
import { login } from "@/redux/auth/authSlice";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

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
        router.push("/words");
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
        <div className="mb-6">
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
              setSignUpData({ ...signUpData, confirmPassword: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col items-center justify-between">
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
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="mt-6 text-center">
          <span className="inline-block align-baseline font-bold text-sm text-black hover:text-black">
            Or sign in with
          </span>
          <button
            onClick={handleSignUpWithGoogle}
            className="ml-4 bg-blue-400  border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded shadow hover:bg-blue-500 hover:border-gray-400"
          >
            Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
