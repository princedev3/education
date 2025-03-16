"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { FadeLoader } from "react-spinners";
import toast from "react-hot-toast";

const VerifyEmailCheck = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") as string;
  const router = useRouter();
  useEffect(() => {
    const verifyEmailFunc = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_FETCH_URL}/user/verify-email`,
        {
          body: JSON.stringify({ token }),
          method: "POST",
        }
      );
      const data = await res.json();
      if (data.status === 200) {
        toast.success(data?.message);
        router.push("/login");
      } else {
        console.log(data);
      }
    };
    verifyEmailFunc();
  }, [token]);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-3xl w-full grid h-full gap-y-6  mx-auto shadow rounded-2xl p-7 ">
        <div className="text-2xl font-medium flex items-center justify-center">
          Kindly wait, why we verify your email
        </div>
        <div className="flex items-center justify-center">
          <FadeLoader className="w-7 h-7" />
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailCheck;
