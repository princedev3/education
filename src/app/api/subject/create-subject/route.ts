import { NextRequest, NextResponse } from "next/server";
import { v2 as cloud } from "cloudinary";
import streamifier from "streamifier";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
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
    const imgFile: File[] = [];
    const pdfFile: File[] = [];
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({
        message: "can not create subject",
        status: 500,
      });
    }
    Array.from(formdata.entries()).forEach(([key, value]) => {
      if (typeof value === "string") {
        textArea[key] = value;
      } else if (value instanceof File) {
        if (key === "image" && value.size > 0) {
          imgFile.push(value);
        }
        if (key === "pdf" && value.size > 0) {
          pdfFile.push(value);
        }
      }
    });

    const pdfArray: string[] = pdfFile.length
      ? await Promise.all(
          pdfFile.map(async (item) => {
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
        )
      : [];

    const images: string[] = imgFile.length
      ? await Promise.all(
          imgFile.map(async (item) => {
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
        )
      : [];

    const subjectCreate = await prisma.subject.create({
      data: {
        name: textArea.name,
        desc: textArea.desc,
        duration: `${textArea.duration} Weeks`,
        coverImage: images.length ? images[0] : "/course.png",
        userId: session?.user?.id as string,
        images,
        pdf: {
          create: pdfArray.map((singleUrl) => ({
            url: singleUrl,
          })),
        },
      },
    });
    return NextResponse.json({
      subjectCreate,
      status: 200,
      message: "subject created",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "can not create subject",
      status: 500,
    });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const courseArrays = await prisma.subject.findMany({
      include: {
        pdf: true,
      },
    });
    return NextResponse.json({ courseArrays, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "can not fetch subjects",
      status: 500,
    });
  }
};
