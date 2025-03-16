import prisma from "@/lib/prisma";
import { findUserByEmail } from "@/lib/some-actions/find-existing-user-by-email";
import { generatePasswordResetToken } from "@/lib/some-actions/generate-reset-password";
import { sendVerificationPasswordEmail } from "@/lib/some-actions/mail";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { token, password: newPassword } = await req.json();

    const existPasswordToken = await prisma.passwordResetToken.findFirst({
      where: {
        token,
      },
    });

    if (!existPasswordToken) {
      return NextResponse.json({
        message: "can not update password",
        status: 500,
      });
    }
    if (existPasswordToken?.expires < new Date()) {
      const passwordResetToken = await generatePasswordResetToken(
        existPasswordToken.email
      );
      await sendVerificationPasswordEmail(
        existPasswordToken.email,
        passwordResetToken.token
      );
      return NextResponse.json({ message: "check email", status: 200 });
    }
    const existingUser = await findUserByEmail(existPasswordToken.email);
    if (!existingUser) {
      return NextResponse.json({
        message: "can not update password",
        status: 500,
      });
    }
    const hash = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        password: hash,
      },
    });
    await prisma.passwordResetToken.delete({
      where: {
        id: existPasswordToken.id,
      },
    });
    return NextResponse.json({ message: "password updated", status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "can not update password",
      status: 500,
    });
  }
};
