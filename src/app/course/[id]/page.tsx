"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import Loading from "@/components/loading";
import { Module, Pdf, Subject, Task } from "@prisma/client";
import ShowImage from "@/components/course/show-image";
import ShowPdf from "@/components/course/show-pdf";
import CreateModule from "@/components/course/create-module";
import CreateTask from "@/components/course/create-task";
import { useUserStore } from "@/providers/user-session";

interface moduleType extends Module {
  tasks: Task[];
  pdf: Pdf[];
}

interface courseArrayType extends Subject {
  pdf: Pdf[];
  modules: moduleType[];
}

const page = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const session = useUserStore((state) => state.session);
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState<{ [key: string]: boolean }>({});
  const [singleData, setSingleData] = useState<courseArrayType | null>(null);
  const memoizedCreateModule = useMemo(() => <CreateModule />, []);
  const memoizedCreateTask = useMemo(
    () => (
      <CreateTask
        onTaskCreated={(newTask) => {
          if (!singleData) return;
          setSingleData({
            ...singleData,
            modules: singleData?.modules.map((module) =>
              module.id === newTask.moduleId
                ? { ...module, tasks: [...module.tasks, newTask] }
                : module
            ),
          });
        }}
      />
    ),
    [singleData]
  );

  useEffect(() => {
    const fetchCourseFunc = async () => {
      setLoading(true);
      if (!id) return;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_FETCH_URL}/subject/create-subject/${id}`,
        {
          method: "GET",
        }
      );

      const data = await res.json();

      if (data.status === 200) {
        setSingleData(data.singleSubject);
        setLoading(false);
      }
      setLoading(false);
    };
    fetchCourseFunc();
  }, [id]);

  useEffect(() => {
    const fetchAttempts = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_FETCH_URL}/attempt-task?userId=${session?.user?.id}`
      );
      const data = await res.json();
      const attemptData = data.allAtempts.reduce(
        (
          acc: { [key: string]: boolean },
          attempt: { taskId: string; isCorrect: boolean }
        ) => {
          acc[attempt.taskId] = attempt.isCorrect;
          return acc;
        },
        {} as { [key: string]: boolean }
      );
      setAttempts(attemptData);
    };

    if (session?.user) {
      fetchAttempts();
    }
  }, [session, id]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    taskId: string
  ) => {
    try {
      e.preventDefault();
      const formdata = new FormData(e.target as HTMLFormElement);
      const userValue = formdata.get("useranswer");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_FETCH_URL}/attempt-task`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userValue,
            taskId,
            userId: session?.user?.id,
          }),
        }
      );

      const data = await res.json();
      if (data.status === 200) {
        router.refresh();
        setAttempts((prev) => ({
          ...prev,
          [taskId]: data.isCorrect,
        }));

        setSingleData((prev) => {
          if (!prev) return prev;

          return {
            ...prev,
            modules: prev.modules.map((module) => ({
              ...module,
              tasks: module.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, isCorrect: data.isCorrect }
                  : task
              ),
            })),
          };
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (Object.keys(attempts).length > 0) {
      setSingleData((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          modules: prev.modules.map((module) => ({
            ...module,
            tasks: module.tasks.map((task) =>
              attempts[task.id] !== undefined
                ? { ...task, isCorrect: attempts[task.id] }
                : task
            ),
          })),
        };
      });
    }
  }, [attempts]);
  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="my-3">
        <div className="grid grid-flow-col">
          <div className="grid gap-2">
            <h1 className="text-3xl">{singleData?.name} </h1>
            <span className="text-lg">{singleData?.desc} </span>
            <span className="text-lg">Duration: {singleData?.duration} </span>
          </div>
          <div className="grid grid-flow-col gap-2 self-start justify-end">
            {session?.user?.role === "ADMIN" && memoizedCreateModule}
            {session?.user?.role === "ADMIN" && memoizedCreateTask}
          </div>
        </div>
        <div className="flex flex-wrap  gap-6 my-3  items-center">
          {singleData?.images.map((item, index) => (
            <>
              <ShowImage item={item} index={index} key={item} />
            </>
          ))}
        </div>
        <div className="grid gap-2">
          {singleData?.pdf.map((item, index) => (
            <>
              <ShowPdf key={item.id} item={item.url} index={index} />
            </>
          ))}
        </div>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {singleData?.modules &&
          singleData?.modules.map((item, index) => {
            return (
              <AccordionItem key={item.id} value={item.name}>
                <AccordionTrigger className="">
                  <div className="">
                    <span className="text-xl font-medium capitalize">
                      {" "}
                      Module {index + 1}
                    </span>
                    :{" "}
                    <span className="text-gray-600 text-xl capitalize">
                      {item.name}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="">
                    <span className="text-lg text-gray-700">
                      {item.description}{" "}
                    </span>
                    <div className="flex flex-wrap my-2 gap-6 items-center">
                      {item?.images.map((item, index) => (
                        <>
                          <ShowImage item={item} index={index} key={item} />
                        </>
                      ))}
                    </div>
                    <div className="grid gap-2 my-2">
                      {item?.pdf.map((item, index) => (
                        <>
                          <ShowPdf
                            key={item.id}
                            item={item.url}
                            index={index}
                          />
                        </>
                      ))}
                    </div>
                    <div className="">
                      <div className="flex flex-col gap-3">
                        {item?.tasks &&
                          item?.tasks.map((item, taskIndex) => {
                            const taskId = item.id;
                            const isAttempted = attempts[taskId] !== undefined;
                            const isCorrect = attempts[taskId];
                            return (
                              <div
                                key={item.id}
                                className="flex gap-6 items-center"
                              >
                                <span key={item.task} className="text-xl">
                                  {item.task}{" "}
                                </span>
                                <form
                                  onSubmit={(e) => handleSubmit(e, item.id)}
                                  className="flex items-center"
                                >
                                  <Select required name="useranswer">
                                    <SelectTrigger
                                      name="useranswer"
                                      className="py-5 rounded-2xl w-[200px] "
                                    >
                                      <SelectValue placeholder="Select a subject" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>select answer</SelectLabel>
                                        {item.option.length &&
                                          item.option.map((item) => (
                                            <SelectItem key={item} value={item}>
                                              {item}{" "}
                                            </SelectItem>
                                          ))}
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>

                                  <button
                                    disabled={isAttempted}
                                    type="submit"
                                    className="ml-4 disabled:cursor-not-allowed rounded-lg px-4 py-2 bg-blue-500 text-white"
                                  >
                                    {isAttempted ? "Attempted" : "Submit"}
                                  </button>
                                  {attempts[item.id] !== undefined && (
                                    <span
                                      className={
                                        attempts[item.id]
                                          ? "text-green-500"
                                          : "text-red-500"
                                      }
                                    >
                                      {attempts[item.id]
                                        ? "✅ Passed"
                                        : "❌ Failed"}
                                    </span>
                                  )}
                                </form>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
      </Accordion>
    </div>
  );
};

export default page;
