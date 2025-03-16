import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const formdata = await req.formData();
    const task = formdata.get("task") as string;
    const answer = formdata.get("answer") as string;
    const moduleId = formdata.get("moduleId") as string;
    const option = formdata.get("option") as string;

    const taskCreated = await prisma.task.create({
      data: {
        task,
        answer,
        moduleId,
        option: option.split(","),
      },
    });
    return NextResponse.json({ taskCreated, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "can not create task", status: 500 });
  }
};
