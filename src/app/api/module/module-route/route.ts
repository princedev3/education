import { NextRequest, NextResponse } from "next/server";
import { v2 as cloud } from "cloudinary";
import streamifier from "streamifier";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
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
    if (!session) {
      return NextResponse.json({
        message: "can not create module",
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

    const createModule = await prisma.module.create({
      data: {
        name: textArea.name,
        description: textArea.description,
        subjectId: textArea.subjectId,
        images,
        pdf: {
          create: pdfArray.map((singleUrl) => ({
            url: singleUrl,
          })),
        },
      },
    });
    return NextResponse.json({ createModule, status: 200 });
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
    const courseArrays = await prisma.module.findMany({
      select: {
        id: true,
        name: true,
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
