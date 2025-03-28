"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import DOMPurify from "dompurify";
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
import { Loader } from "lucide-react";
import CrossIcon from "@/components/cross-icon";
import CheckIcon from "@/components/check-icon";

interface moduleType extends Module {
  tasks: Task[];
  pdf: Pdf[];
}

export interface courseArrayType extends Subject {
  pdf: Pdf[];
  modules: moduleType[];
}

const page = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const session = useUserStore((state) => state.session);
  const [loading, setLoading] = useState(false);
  const [submittingTaskId, setSubmittingTaskId] = useState<string | null>("");
  const [courseModule, setCourseModule] = useState<moduleType[]>([]);
  const [attempts, setAttempts] = useState<{ [key: string]: boolean }>({});
  const [singleData, setSingleData] = useState<courseArrayType | null>({
    id: "",
    name: "",
    modules: [],
    desc: "",
    duration: "",
    userId: "",
    coverImage: "",
    images: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    pdf: [],
  });
  const memoizedCreateModule = useMemo(
    () => <CreateModule setCourseModule={setCourseModule} />,
    []
  );
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
        setCourseModule(data.singleSubject.modules);
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
      setSubmittingTaskId(taskId);
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
        setSubmittingTaskId(null);
      }
      setSubmittingTaskId(null);
    } catch (error) {
      console.log(error);
      setSubmittingTaskId(null);
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

  const handleReset = async (moduleId: string) => {
    const userId = session?.user?.id;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_FETCH_URL}/attempt-task?userId=${userId}&moduleId=${moduleId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status === 200) {
      setAttempts((prev) => {
        const updatedAttempts = { ...prev };
        singleData?.modules
          .find((module) => module.id === moduleId)
          ?.tasks.forEach((task) => {
            delete updatedAttempts[task.id];
          });
        return updatedAttempts;
      });

      setSingleData((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          modules:
            prev.modules.map((module) =>
              module.id === moduleId
                ? {
                    ...module,
                    tasks: module.tasks.map((task) => ({
                      ...task,
                      isCorrect: undefined,
                    })),
                  }
                : module
            ) || [],
        };
      });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="grid grid-flow-col my-4 gap-5">
        {session?.user?.role === "ADMIN" && memoizedCreateModule}
        {session?.user?.role === "ADMIN" && memoizedCreateTask}
      </div>
      <div className="my-3">
        <div className=" ">
          <div className="grid gap-2">
            <h1 className="text-3xl font-semibold capitalize">
              {singleData?.name}
            </h1>

            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(singleData?.desc as string),
              }}
            />
            <span className="text-lg text-gray-500">
              Duration: {singleData?.duration}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-6 my-4 items-center">
          {singleData?.images?.map((item, index) => (
            <ShowImage item={item} index={index} key={index} />
          ))}
        </div>
        <div className="grid gap-2">
          {singleData?.pdf?.map((item, index) => (
            <ShowPdf key={item.id} item={item.url} index={index} />
          ))}
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {courseModule.length &&
        courseModule.length > 0 &&
        Array.isArray(courseModule) ? (
          courseModule?.map((module, index) => (
            <AccordionItem key={module.id} value={module.name}>
              <AccordionTrigger>
                <div className="text-xl font-medium capitalize">
                  Module {index + 1}:{" "}
                  <span className="text-gray-600">{module.name}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(module.description as string),
                  }}
                />
                <div className="flex flex-wrap my-4 gap-6 items-center">
                  {module?.images?.map((img, idx) => (
                    <ShowImage item={img} index={idx} key={img} />
                  ))}
                </div>
                <div className="grid gap-2 my-4">
                  {module?.pdf?.map((pdf, idx) => (
                    <ShowPdf key={pdf.id} item={pdf.url} index={idx} />
                  ))}
                </div>
                <div className="flex flex-col gap-6">
                  {module?.tasks?.map((task, idx) => {
                    const isAttempted = attempts[task.id] !== undefined;
                    const isCorrect = attempts[task.id];

                    return (
                      <div key={task.id} className="flex flex-col gap-2">
                        <span className="text-lg">{task.task}</span>
                        <form
                          onSubmit={(e) => handleSubmit(e, task.id)}
                          className="flex gap-4 items-center"
                        >
                          <Select required name="useranswer">
                            <SelectTrigger className="py-2 px-4 border rounded-md w-[180px] ">
                              <SelectValue placeholder="Select an answer" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Choose Answer</SelectLabel>
                                {task.option.map((opt) => (
                                  <SelectItem key={opt} value={opt}>
                                    {opt}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>

                          <button
                            disabled={
                              isAttempted || submittingTaskId === task.id
                            }
                            type="submit"
                            className="px-4 py-2 w-[120px] bg-blue-500 flex items-center justify-center text-white rounded-md disabled:bg-gray-400"
                          >
                            {submittingTaskId === task.id ? (
                              <Loader size={25} className="animate-spin" />
                            ) : isAttempted ? (
                              "Attempted"
                            ) : (
                              "Submit"
                            )}
                          </button>

                          {attempts[task.id] !== undefined &&
                            (isCorrect ? <CheckIcon /> : <CrossIcon />)}
                        </form>
                      </div>
                    );
                  })}
                </div>
                {module &&
                  module.tasks &&
                  Array.isArray(module.tasks) &&
                  module.tasks.length > 0 &&
                  module.tasks.every(
                    (task) => attempts[task.id] !== undefined
                  ) && (
                    <button
                      onClick={() => handleReset(module.id)}
                      className="my-3 rounded-lg bg-blue-500  text-white p-3  cursor-pointer "
                    >
                      Want to retake task
                    </button>
                  )}
              </AccordionContent>
            </AccordionItem>
          ))
        ) : (
          <p>No modules available</p>
        )}
      </Accordion>
    </div>
  );
};

export default page;
