import UserRegister from "@/components/user/user-register";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { redirect } from "next/navigation";
import { auth, signIn } from "@/lib/auth";

const Register = async () => {
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
      <UserRegister />
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

export default Register;
