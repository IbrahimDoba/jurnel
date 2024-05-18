"use client";
import { auth, googleProvider } from "@/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignUp = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();

  const handleSignUpWithGoogle = async () => {
    setIsLoading(true);
    const result = await signInWithPopup(auth, googleProvider)
      .then((res) => {
        console.log("GOOGLE AUTH", res);
        //  SEND USER TO THE APPROPRIATE PAGE AFTER SIGN UP
        router.push("/words");
      })
      .catch((e) => {
        console.log("ERROR: ", e);
        setErrorMsg(
          "Somthing went wrong creating your account, please try again"
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
    setErrorMsg("all fields are required");
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
        // SEND USER TO THE APPROPRIATE PAGE AFTER SIGN UP
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
    <div className="flex flex-col p-10">
      <div className="flex flex-col">
        <span>Create an account</span>
        <span className="text-red-600 font-bold mt-4">{errorMsg}</span>
        <span className="text-lg font-semibold">Email</span>
        <input
          type="text"
          placeholder="johndoe@mail.com"
          value={signUpData.email}
          onChange={(e) =>
            setSignUpData({ ...signUpData, email: e.target.value })
          }
          className="p-4"
        />
        <span className="mt-6">Password</span>
        <input
          className="p-4"
          type="password"
          placeholder="*****"
          value={signUpData.password}
          onChange={(e) =>
            setSignUpData({ ...signUpData, password: e.target.value })
          }
        />
        <span className="mt-6">Confirm Password</span>
        <input
          className="p-4"
          type="password"
          placeholder="*****"
          value={signUpData.confirmPassword}
          onChange={(e) =>
            setSignUpData({ ...signUpData, confirmPassword: e.target.value })
          }
        />
        <button
          disabled={isLoading}
          onClick={handleSubmit}
          className="p-3 mt-4 bg-blue-400 rounded-md"
        >
          {isLoading ? "loading..." : "Submit"}
        </button>
      </div>
      <span className="self-center my-5">Or</span>
      <div className="self-center">
        <button
          onClick={handleSignUpWithGoogle}
          className="bg-white border-[1px] border-neutral-800  rounded-lg p-4 self-center font-bold text-pink-600"
        >
          Sign Up With Google
        </button>
      </div>
    </div>
  );
};

export default SignUp;
