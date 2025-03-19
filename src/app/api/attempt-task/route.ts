import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "you have to login", status: 500 });
    }
    const { taskId, userValue } = await req.json();
    if (!taskId || !userValue) {
      return NextResponse.json({ message: "no answer provided", status: 500 });
    }
    const givenTask = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
    if (!givenTask) {
      return NextResponse.json({ message: "task does not exist", status: 500 });
    }
    const isCorrect =
      givenTask.option.includes(String(userValue)) &&
      givenTask.answer === String(userValue);

    await prisma.taskAttempt.create({
      data: {
        userId: session.user?.id as string,
        taskId: givenTask?.id,
        userAnswer: userValue,
        isCorrect,
      },
    });

    return NextResponse.json({ success: true, isCorrect, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "failed task", status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "you have to login", status: 500 });
    }

    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ message: "you have to login", status: 500 });
    }

    const allAtempts = await prisma.taskAttempt.findMany({
      where: {
        userId,
      },
    });

    return NextResponse.json({ allAtempts, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "failed to fetch attempt",
      status: 500,
    });
  }
};
export const DELETE = async (req: NextRequest) => {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "you have to login", status: 500 });
    }

    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    const moduleId = searchParams.get("moduleId") as string;
    if (!userId) {
      return NextResponse.json({ message: "you have to login", status: 500 });
    }

    if (userId !== session?.user?.id) {
      return NextResponse.json({ message: "you have to login", status: 500 });
    }

    const allAtempts = await prisma.taskAttempt.deleteMany({
      where: {
        userId,
        task: {
          moduleId,
        },
      },
    });

    return NextResponse.json({ message: "task reset", status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "failed to fetch attempt",
      status: 500,
    });
  }
};
