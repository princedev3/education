"use client";
import { useModalStore } from "@/lib/modal-toggle";
import { LoaderCircle, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Task } from "@prisma/client";
type subjectArrayType = {
  id: string;
  name: string;
};

const CreateTask = ({
  onTaskCreated,
}: {
  onTaskCreated: (newTask: Task) => void;
}) => {
  const state = useModalStore();
  const [loading, setLoading] = useState(false);

  const [moduleArrayId, setModuleArrayId] = useState<subjectArrayType[]>([]);
  const isOpen = state.isOpen && state.type === "create-task";
  useEffect(() => {
    const fetchCourseFunc = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_FETCH_URL}/module/module-route`,
        {
          method: "GET",
        }
      );

      const data = await res.json();

      if (data.status === 200) {
        setModuleArrayId(data.courseArrays);
      }
    };
    fetchCourseFunc();
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_FETCH_URL}/task/task-route`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    if (data.status === 200) {
      onTaskCreated(data.taskCreated);
      target.reset();
      state.setOpen(false, "create-task");
    }
    setLoading(false);
  };

  return (
    <>
      <div
        className="text-white bg-blue-600 px-3 py-2 text-lg font-semibold rounded-2xl capitalize cursor-pointer"
        onClick={() => state.setOpen(true, "create-task")}
      >
        create task
      </div>
      {isOpen && (
        <div className="w-full z-50 h-screen fixed left-0 top-0 bg-black/50 p-16 motion-preset-expand duration-1000">
          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="bg-white min-h-full w-full rounded-3xl p-4 flex flex-col gap-3"
          >
            <div className="justify-end flex">
              <X
                onClick={() => state.setOpen(false, "create-course")}
                className="border motion-preset-shake  border-gray-700 cursor-pointer rounded-full p-1 motion-preset-slide-right "
                color="#4a5565"
                size={40}
              />
            </div>
            <form onSubmit={handleSubmit} className="grid gap-y-7">
              <h1 className="text-center text-2xl font-medium capitalize">
                create Task
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                <div className="grid gap-y-2">
                  <label htmlFor="" className="text-lg capitalize ">
                    task
                  </label>
                  <input
                    type="text"
                    name="task"
                    required
                    placeholder="enter task"
                    className="border outline-none p-2 placeholder:text-gray-700 text-lg rounded-2xl"
                  />
                </div>
                <div className="grid gap-y-2">
                  <label htmlFor="" className="text-lg capitalize ">
                    answer
                  </label>
                  <input
                    type="text"
                    name="answer"
                    required
                    placeholder="enter task answer"
                    className="border outline-none p-2 placeholder:text-gray-700 text-lg rounded-2xl"
                  />
                </div>
                <div className="grid gap-y-2">
                  <label htmlFor="" className="text-lg capitalize ">
                    module
                  </label>

                  <Select required name="moduleId">
                    <SelectTrigger className="w-full py-5 rounded-2xl">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Select Module</SelectLabel>
                        {moduleArrayId.length &&
                          moduleArrayId.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name}{" "}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-y-2">
                  <label htmlFor="" className="text-lg capitalize ">
                    Options
                  </label>
                  <div className="grid">
                    <input
                      type="text"
                      name="option"
                      required
                      placeholder="enter all possible answer"
                      className="border outline-none p-2 placeholder:text-gray-700 text-lg rounded-2xl"
                    />
                    <span className="text-sm text-gray-500">
                      seperate values with a ;
                    </span>
                  </div>
                </div>
              </div>
              <button
                className="capitalize text-lg p-2 cursor-pointer text-white font-medium rounded-2xl  bg-[#1e81b0] w-full"
                type="submit"
              >
                {loading ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <LoaderCircle
                      className="animate-spin flex items-center justify-center"
                      size={20}
                    />
                  </div>
                ) : (
                  "Create task"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default CreateTask;
