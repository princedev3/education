import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type paramsType = {
  params: Promise<{ id: string }>;
};
export const GET = async (req: NextRequest, { params }: paramsType) => {
  try {
    const id = (await params).id;
    const courseArrays = await prisma.module.findMany({
      where: {
        subjectId: id,
      },
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
