"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState("");
  const handleResetPassword = async () => {
    // e.preventDefault();
    setLoadingPassword(true);
    if (!verifyEmail) {
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_FETCH_URL}/user/reset-password`,
      {
        method: "POST",
        body: JSON.stringify({ email: verifyEmail }),
      }
    );
    const data = await res.json();

    if (data.status === 200) {
      toast.success(data.message);
    }
    setLoadingPassword(false);
  };
  return (
    <>
      <span
        onClick={() => setOpen(!open)}
        className="text-gray-800 cursor-pointer"
      >
        Forgot Password?
      </span>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid md:grid-cols-[1fr_100px] gap-4 mt-10"
          onClick={handleResetPassword}
        >
          <input
            type="email"
            required
            onChange={(e) => setVerifyEmail(e.target.value)}
            placeholder="Enter your email to reset password"
            className="p-2 outline-none border rounded-2xl text-gray-800"
          />
          <span className="capitalize text-center cursor-pointer disabled:cursor-not-allowed bg-[#1e81b0] text-lg text-white font-medium px-3 py-2 rounded-2xl">
            send
          </span>
        </motion.div>
      )}
    </>
  );
};

export default ForgotPassword;
