"use client";
import { useModalStore } from "@/lib/modal-toggle";
import { LoaderCircle, X } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useUserStore } from "@/providers/user-session";
import RichTextEditor from "../rich-text-editor";
import { useSubjectStore } from "@/providers/subject-array-provider";
const CreateSubject = () => {
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const state = useModalStore();
  const session = useUserStore((state) => state.session);

  const { courseArray, setCourseArray } = useSubjectStore((state) => state);

  const isOpen = state.isOpen && state.type === "create-course";
  const handleDesc = (e: string) => {
    setDescription(e);
  };
  const handleCreateSubjectFunc = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    const target = e.target as HTMLFormElement;
    const formdata = new FormData(target);
    formdata.append("desc", description);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_FETCH_URL}/subject/create-subject`,
      {
        method: "POST",
        body: formdata,
      }
    );
    const data = await res.json();
    if (data.status === 200) {
      setLoading(false);
      setCourseArray([...courseArray, data.subjectCreate]);
      toast.success(data.message);
      setDescription("");
      target.reset();
      state.setOpen(false, "create-course");
      return;
    }
    toast.error(data.message);
    setLoading(false);
  };
  if (session?.user?.role !== "ADMIN") {
    return null;
  }

  return (
    <>
      <div
        className="text-white bg-blue-600 px-3 py-2 text-lg font-semibold rounded-2xl capitalize cursor-pointer"
        onClick={() => state.setOpen(true, "create-course")}
      >
        create subject
      </div>
      {isOpen && (
        <div className="w-full z-50 fixed inset-0 bg-black/50 p-3 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="bg-white w-full max-w-5xl mx-auto rounded-3xl p-4 grid gap-3 self-start max-h-[90vh]"
          >
            <div className="justify-end flex">
              <X
                onClick={() => state.setOpen(false, "create-course")}
                className="border motion-preset-shake border-gray-700 cursor-pointer rounded-full p-1 motion-preset-slide-right"
                color="#4a5565"
                size={40}
              />
            </div>
            <form
              onSubmit={handleCreateSubjectFunc}
              className="grid gap-y-7  overflow-y-auto custom-scroll-bar pr-6 max-h-[70vh] h-full"
            >
              <h1 className="text-center text-2xl font-medium capitalize">
                create subject
              </h1>
              <div className="grid gap-7">
                <div className="w-full grid gap-y-3">
                  <div className="grid gap-y-2">
                    <label className="text-lg capitalize">subject</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="enter subject name"
                      className="border outline-none p-2 placeholder:text-gray-700 text-lg rounded-2xl"
                    />
                  </div>
                  <div className="grid gap-y-2">
                    <label className="text-lg capitalize">description</label>
                    <RichTextEditor
                      content={description}
                      handleDesc={handleDesc}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                  <div className="grid gap-y-2">
                    <label className="text-lg capitalize">duration</label>
                    <input
                      type="number"
                      name="duration"
                      placeholder="enter duration"
                      className="border outline-none p-2 placeholder:text-gray-700 text-lg rounded-2xl"
                    />
                  </div>
                  <div className="grid gap-y-2">
                    <label className="text-lg capitalize">cover image</label>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      multiple
                      className="border outline-none w-full p-2 placeholder:text-gray-700 text-lg rounded-2xl"
                    />
                  </div>
                  <div className="grid gap-y-2">
                    <label className="text-lg capitalize">add pdf</label>
                    <input
                      type="file"
                      name="pdf"
                      multiple
                      accept="application/pdf"
                      className="border outline-none p-2 w-full placeholder:text-gray-700 text-lg rounded-2xl"
                    />
                  </div>
                </div>
              </div>
              <button
                disabled={loading}
                className="capitalize text-lg p-2 cursor-pointer text-white font-medium rounded-2xl bg-[#1e81b0] w-full disabled:cursor-not-allowed"
                type="submit"
              >
                {loading ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <LoaderCircle className="animate-spin" size={20} />
                  </div>
                ) : (
                  "Create Subject"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default CreateSubject;
