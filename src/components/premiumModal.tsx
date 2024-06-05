"use client";
import { subscriptionCollectionRef } from "@/firebase";
import { IRootState } from "@/redux/store";
import { addDoc } from "firebase/firestore";
import moment from "moment";
import React from "react";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";

const PremiumModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { user } = useSelector((state: IRootState) => state.user);
  const handleAddSubscription = async (type: "pro" | "unlimited") => {
    await addDoc(subscriptionCollectionRef, {
      userEmail: user.email,
      subscription: type,
      expirationDate:
        type === "pro" ? moment().add(1, "months").format("YYYY-MM-DD") : null,
      dateCreated: moment().format("YYYY-MM-DD"),
    });
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-emerald-100 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
        <div className="p-4 flex justify-end">
          <button onClick={onClose}>
            <IoClose size={24} />
          </button>
        </div>
        <div className="p-6 text-center">
          <div className="flex justify-center items-center">
            <h2 className="text-xl font-bold mb-8 w-[60%]">
              <span className="text-emerald-500">Boundless</span>...
              appreciation, embracing change, expressing frustrations,
              strategizing, uncovering personal insights, and continuous
              development.
            </h2>
          </div>

          <div className="bg-emerald-500 p-4 rounded-md text-white mb-4">
            <p>
              Upgrade to{" "}
              <span className="font-bold">WordGen plus or Premium</span> for
              unlimited room to write
            </p>
            <ul className="list-disc flex flex-col items-start justify-start list-inside mt-2">
              <li>Help me pay for server costs</li>
              <li>
                Pause or cancel your subscription quick and easy, super chill
              </li>
              <li>Support WordGen so we can support your wonderful self ♥</li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <a
              href="https://buy.stripe.com/dR6eVQ0058S3e0UbII"
              className="bg-emerald-500 hover:bg-emerald-600 bg-gradient-to-r from-emerald-500 to-emerald-700 text-white py-2 px-4 rounded-md"
            >
              WordGen Plus | $4.99/month | Maximum words daily 15k ✨
            </a>
            <a
              href="https://buy.stripe.com/5kA5lg4gl7NZ7Cw5kl"
              className="bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 text-white py-2 px-4 rounded-md"
            >
              WordGen Unlimited | $9.99/year (1200% more value)✨
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumModal;
