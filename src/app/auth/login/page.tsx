"use client";
import { auth, googleProvider } from "@/firebase";
import { login } from "@/redux/auth/authSlice";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
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
        //  SEND USER TO THE APPROPRIATE PAGE AFTER Login
        router.push("/jurnal/jurnals");
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
        // SEND USER TO THE APPROPRIATE PAGE AFTER Logi
        router.push("/jurnal/jurnals");
      })
      .catch(() => {
        setErrorMsg("Invalid credentials");
      });
    setIsLoading(false);
  };
  return (
    <div className="flex flex-col p-10">
      <div className="flex flex-col">
        <span>Login</span>
        <span className="text-red-600 font-bold mt-4">{errorMsg}</span>
        <span className="text-lg font-semibold">Email</span>
        <input
          type="text"
          placeholder="johndoe@mail.com"
          value={loginData.email}
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
          className="p-4"
        />
        <span className="mt-6">Password</span>
        <input
          className="p-4"
          type="password"
          placeholder="*****"
          value={loginData.password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
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
          Login With Google
        </button>
      </div>
    </div>
  );
};

export default Login;
