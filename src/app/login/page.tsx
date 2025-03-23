import Image from "next/image";
import React from "react";
import { redirect } from "next/navigation";
import { auth, signIn } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import ForgotPassword from "../forgot-password/page";

const Login = async () => {
  const session = await auth();

  if (session) {
    redirect("/");
  }

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
        action={async (formData) => {
          "use server";
          const email = formData.get("email");
          const password = formData.get("password");

          const ress = await signIn("credentials", {
            email,
            password,
          });
        }}
        className="flex flex-col gap-7"
      >
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
                type={"password"}
                required
                name="password"
                className="p-2 outline-none border w-full rounded-2xl text-gray-800"
              />
            </div>
            {/* <ForgotPassword /> */}
          </div>
        </div>

        <div className="grid">
          <button className="w-full items-center bg-[#1e81b0] text-white font-semibold capitalize py-3 cursor-pointer rounded-2xl">
            Login
          </button>
          <Link
            className="mx-auto text-gray-700 cursor-pointer"
            href="/register"
          >
            Dont have an account? Register
          </Link>
        </div>
      </form>
      {/* <UserLogin /> */}

      <form
        action={async () => {
          "use server";
          const res = await signIn("google");
        }}
        className="grid gap-y-7 mt-7"
      >
        <div className="flex justify-center items-center gap-1">
          <div className=" flex-grow border-b border-zinc-400 "></div>
          <p className="uppercase text-sm font-semibold text-zinc-500">
            or continue with
          </p>
          <div className=" flex-grow border-b border-zinc-400"></div>
        </div>
        <button className="w-full cursor-pointer">
          <Badge
            variant="outline"
            className="text-zinc-700 w-full !rounded-lg p-2  text-center flex items-center justify-center "
          >
            <div className="flex items-center gap-2">
              <Image
                src={"/google.png"}
                width={10}
                height={10}
                alt=""
                className="w-4 h-4 object-cover"
              />
              Google
            </div>
          </Badge>
        </button>
      </form>
    </div>
  );
};

export default Login;
