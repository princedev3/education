"use client";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ForgotPasswords = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") as string;
  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const target = e.target as HTMLFormElement;
    if (!token) return;
    const formdata = new FormData(target);
    const password = formdata.get("password");
    if (!password) return;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_FETCH_URL}/user/change-password`,
      {
        method: "POST",
        body: JSON.stringify({ token, password }),
      }
    );
    const data = await res.json();
    if (data.status === 200 && data.message === "check email") {
      toast.success(data.message);
      target.reset();
      setLoading(false);
      return;
    }
    if (data.status === 200) {
      target.reset();
      router.push("/login");
    }
    setLoading(false);
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-3xl w-full grid h-full  mx-auto shadow rounded-2xl p-7 ">
        <Image
          src={"/logo.svg"}
          alt=""
          width={40}
          height={40}
          className="w-[40px] h-[40px] object-cover mx-auto mb-4 "
        />
        <form onSubmit={handleReset} action="" className="flex flex-col gap-7">
          <div className="flex flex-col gap-3">
            <label
              htmlFor=""
              className="text-lg capitalize font-medium text-gray-800"
            >
              New Password
            </label>
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
          </div>

          <div className="grid">
            <button
              disabled={loading}
              className="w-full disabled:cursor-not-allowed items-center bg-[#1e81b0] text-white font-semibold capitalize py-3 cursor-pointer rounded-2xl"
            >
              {loading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <LoaderCircle
                    className="animate-spin flex items-center justify-center"
                    size={20}
                  />
                </div>
              ) : (
                "Change Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswords;
