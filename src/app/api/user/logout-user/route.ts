import { signOut } from "@/auth";
import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    const res = await signOut({ redirect: false });

    return NextResponse.json({ message: "log out", status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "can not log out", status: 500 });
  }
};
