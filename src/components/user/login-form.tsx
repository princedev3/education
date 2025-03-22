"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import ForgotPassword from "./forgot-password";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  return (
    <>
      {/* <div className="flex flex-col gap-3">
        <label
          htmlFor=""
          className="text-lg capitalize font-medium text-gray-800"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          required
          placeholder="Enter your Email"
          className="p-2 outline-none border rounded-2xl text-gray-800"
        />
      </div>
      <div className="flex flex-col gap-3">
        <label
          htmlFor=""
          className="text-lg capitalize font-medium text-gray-800"
        >
          Password
        </label>
        <div className="w-full flex flex-col  ">
          <div className="relative w-full ">
            <input
              type={showPassword ? "password" : "text"}
              required
              name="password"
              className="p-2 outline-none border w-full rounded-2xl text-gray-800"
            />
            {showPassword ? (
              <Eye
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 bottom-[50%] translate-y-[50%] text-gray-600 cursor-pointer "
              />
            ) : (
              <EyeOff
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 bottom-[50%] translate-y-[50%] text-gray-600 cursor-pointer "
              />
            )}
          </div>
          <ForgotPassword />
        </div>
      </div>

      <div className="grid">
        <button
          disabled={loading}
          className="w-full items-center bg-[#1e81b0] text-white font-semibold capitalize py-3 cursor-pointer rounded-2xl"
        >
          {loading ? (
            <div className="w-full h-full flex items-center justify-center">
              <LoaderCircle
                className="animate-spin flex items-center justify-center"
                size={20}
              />
            </div>
          ) : (
            "Login"
          )}
        </button>
        <Link className="mx-auto text-gray-700 cursor-pointer" href="/register">
          Dont have an account? Register
        </Link>
      </div> */}
    </>
  );
};

export default LoginForm;
