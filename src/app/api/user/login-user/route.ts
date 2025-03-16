import { signIn } from "@/auth";
import { findUserByEmail } from "@/lib/some-actions/find-existing-user-by-email";
import { generateVerificationtokenbyemail } from "@/lib/some-actions/generateverificationtokenbtemail";
import { sendVerificationEmail } from "@/lib/some-actions/mail";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();
    const existingUser = await findUserByEmail(email);
    if (!existingUser || !email) {
      return NextResponse.json({ message: "invalid", status: 500 });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return NextResponse.json({ message: "invalid", status: 500 });
    }
    if (!existingUser.emailVerified) {
      const verifyToken = await generateVerificationtokenbyemail(email);
      await sendVerificationEmail(email, verifyToken.token);
      return NextResponse.json({ message: "check email", status: 200 });
    }

    await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    return NextResponse.json({ message: "login successful", status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "can not login", status: 500 });
  }
};
