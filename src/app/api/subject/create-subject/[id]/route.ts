import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
type paramType = {
  params: Promise<{ id: string }>;
};

export const GET = async (req: NextRequest, { params }: paramType) => {
  try {
    const { id } = await params;
    const singleSubject = await prisma.subject.findUnique({
      where: {
        id,
      },
      include: {
        modules: {
          include: {
            pdf: true,
            tasks: true,
          },
        },
        pdf: true,
      },
    });
    return NextResponse.json({
      singleSubject,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "can not  fetch  single subject",
      status: 500,
    });
  }
};
