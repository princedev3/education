import prisma from "@/lib/prisma";
import { findUserByEmail } from "@/lib/some-actions/find-existing-user-by-email";
import { generateVerificationtokenbyemail } from "@/lib/some-actions/generateverificationtokenbtemail";
import { existingToken } from "@/lib/some-actions/get-verificationtoken-byemail";
import { sendVerificationEmail } from "@/lib/some-actions/mail";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const existingVerifyToken = await existingToken(body?.token);

    if (!existingVerifyToken) {
      return NextResponse.json({
        message: "can not verify email",
        status: 500,
      });
    }
    const findUser = await findUserByEmail(
      existingVerifyToken?.email as string
    );
    if (!findUser) {
      return NextResponse.json({
        message: "can not verify email",
        status: 500,
      });
    }
    if (new Date() > existingVerifyToken?.expires) {
      const newToken = await generateVerificationtokenbyemail(
        findUser?.email as string
      );
      await sendVerificationEmail(findUser.email as string, newToken.token);
      return NextResponse.json({
        message: "new token sent check email",
        status: 200,
      });
    }

    await prisma.user.update({
      where: { id: findUser.id },
      data: { emailVerified: new Date() },
    });
    await prisma.verificationToken.delete({
      where: { token: body?.token, id: existingVerifyToken.id },
    });
    return NextResponse.json({ message: "email verified", status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "can not verify email", status: 500 });
  }
};
