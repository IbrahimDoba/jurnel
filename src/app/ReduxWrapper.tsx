"use client";
import { firebaseAnalytics } from "@/firebase";
import { ReduxProvider } from "@/redux/provider";
import { logEvent } from "firebase/analytics";
import React, { useEffect } from "react";

const ReduxWrapper = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      logEvent(firebaseAnalytics, "page_visit");
    }
  }, []);
  return (
    <html lang="en">
      <ReduxProvider>{children}</ReduxProvider>
    </html>
  );
};

export default ReduxWrapper;
