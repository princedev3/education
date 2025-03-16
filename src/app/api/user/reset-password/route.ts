import { generatePasswordResetToken } from "@/lib/some-actions/generate-reset-password";
import { sendVerificationPasswordEmail } from "@/lib/some-actions/mail";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { email } = await req.json();
    if (!email || typeof email != "string") {
      return NextResponse.json({
        message: "can not reset password",
        status: 500,
      });
    }
    const passwordResetToken = await generatePasswordResetToken(email);
    await sendVerificationPasswordEmail(email, passwordResetToken.token);

    return NextResponse.json({ message: "check your email", status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "can not reset password",
      status: 500,
    });
  }
};
