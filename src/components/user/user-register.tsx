"use client";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";

const UserRegister = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    const formdata = new FormData(form);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_FETCH_URL}/user/create-user`,
      {
        method: "POST",
        body: formdata,
      }
    );
    const data = await res.json();
    if (data.status === 200) {
      form.reset();
      toast.success("check your email");
    }
    setLoading(false);
  };
  return (
    <div className="max-w-3xl w-full grid h-full   mx-auto shadow rounded-2xl p-2 md:p-7 overflow-hidden ">
      <Image
        src={"/logo.svg"}
        alt=""
        width={40}
        height={40}
        className="w-[40px] h-[40px] object-cover mx-auto mb-4 "
      />
      <form
        action=""
        onSubmit={handleRegister}
        className="flex flex-col gap-7 w-full "
      >
        <div className="flex flex-col gap-3 w-full">
          <label
            htmlFor=""
            className="text-lg capitalize font-medium text-gray-800"
          >
            Name
          </label>
          <input
            type="text"
            placeholder="Enter your Name"
            name="name"
            required
            className="p-2 outline-none w-full border rounded-2xl text-gray-800"
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
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
            className="p-2 outline-none border w-full rounded-2xl text-gray-800"
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <label
            htmlFor=""
            className="text-lg capitalize font-medium text-gray-800"
          >
            Password
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
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer "
              />
            ) : (
              <EyeOff
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <label
            htmlFor=""
            className="text-lg capitalize font-medium text-gray-800"
          >
            image
          </label>
          <div className="w-full flex flex-col">
            <input
              type="file"
              name="image"
              className="p-2 outline-none border rounded-2xl text-gray-800"
            />
          </div>
        </div>
        <div className="grid">
          <button className="w-full items-center justify-center bg-[#1e81b0] text-white font-semibold capitalize py-3 cursor-pointer rounded-2xl">
            {loading ? (
              <div className="w-full h-full flex items-center justify-center">
                <LoaderCircle
                  className="animate-spin flex items-center justify-center"
                  size={20}
                />
              </div>
            ) : (
              "Register"
            )}
          </button>
          <Link className="mx-auto text-gray-700 cursor-pointer" href="/login">
            have an account? Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UserRegister;
