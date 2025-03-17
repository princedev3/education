"use client";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const UserLogin = () => {
  const [verifyEmail, setVerifyEmail] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const router = useRouter();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);
    const email = formData.get("email");
    const password = formData.get("password");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_FETCH_URL}/user/login-user`,
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await res.json();

    if (data.status === 200) {
      target.reset();
      router.push("/");
      router.refresh();
      setLoading(false);
      return;
    }
    toast.error("check inputs again");
    setLoading(false);
  };
  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-4xl w-full grid h-full  mx-auto shadow rounded-2xl p-3 md:p-7 ">
        <Image
          src={"/logo.svg"}
          alt=""
          width={40}
          height={40}
          className="w-[40px] h-[40px] object-cover mx-auto mb-4 "
        />
        <form action="" onSubmit={handleLogin} className="flex flex-col gap-7">
          <div className="flex flex-col gap-3">
            <label
              htmlFor=""
              className="text-lg capitalize font-medium text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
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
              <span
                onClick={() => setOpen(!open)}
                className="text-gray-800 cursor-pointer"
              >
                Forgot Password?
              </span>
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
            <Link
              className="mx-auto text-gray-700 cursor-pointer"
              href="/register"
            >
              Dont have an account? Register
            </Link>
          </div>
        </form>
        {open && (
          <motion.form
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="grid md:grid-cols-[1fr_100px] gap-4 mt-10"
            onSubmit={handleResetPassword}
          >
            <input
              type="email"
              required
              onChange={(e) => setVerifyEmail(e.target.value)}
              placeholder="enter your  email"
              className="p-2 outline-none border rounded-2xl text-gray-800"
            />
            <button
              disabled={loadingPassword}
              type="submit"
              className="capitalize disabled:cursor-not-allowed bg-[#1e81b0] text-lg text-white font-medium px-3 py-2 rounded-2xl"
            >
              send
            </button>
          </motion.form>
        )}
      </div>
    </div>
  );
};

export default UserLogin;
