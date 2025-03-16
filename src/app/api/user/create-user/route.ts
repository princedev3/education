import { findUserByEmail } from "@/lib/some-actions/find-existing-user-by-email";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { v2 as cloud } from "cloudinary";
import streamifier from "streamifier";
import { generateVerificationtokenbyemail } from "@/lib/some-actions/generateverificationtokenbtemail";
import prisma from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/some-actions/mail";

cloud.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  secure: true,
});

export const POST = async (req: NextRequest) => {
  try {
    const formdata = await req.formData();

    const textArea: { [key: string]: string } = {};
    let file: File[] = [];

    Array.from(formdata.entries()).forEach(([key, value]) => {
      if (typeof value === "string") {
        textArea[key] = value;
      } else if (value instanceof File) {
        file.push(value);
      }
    });
    const existingUser = await findUserByEmail(textArea.email);
    if (existingUser) {
      return NextResponse.json({ message: "can not create user", status: 500 });
    }

    const hash = await bcrypt.hash(textArea.password, 10);

    const buffer: string[] = await Promise.all(
      file.map(async (item) => {
        return new Promise(async (resolve, rejects) => {
          const bytes = Buffer.from(await item.arrayBuffer());
          const stream = cloud.uploader.upload_stream(
            { folder: "education" },
            (error, result) => {
              if (error) {
                rejects(error);
              } else {
                resolve(result?.secure_url as string);
              }
            }
          );
          streamifier.createReadStream(bytes).pipe(stream);
        });
      })
    );

    const { name, email } = textArea;
    if (!name || !email) {
      return NextResponse.json({ message: "enter input values", status: 500 });
    }

    const verifyToken = await generateVerificationtokenbyemail(email);

    const users = await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
        img: buffer[0],
      },
    });

    await sendVerificationEmail(email, verifyToken.token);

    return NextResponse.json({
      message: "user created check your email",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "can not create user", status: 500 });
  }
};
