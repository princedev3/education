"use client";
import { useModalStore } from "@/lib/modal-toggle";
import { LoaderCircle, X } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

const CreateModule = () => {
  const params = useParams();
  const id = params.id as string;

  const state = useModalStore();
  const [loading, setLoading] = useState(false);

  const isOpen = state.isOpen && state.type === "create-module";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);
    if (id) {
      formData.append("subjectId", id);
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_FETCH_URL}/module/module-route`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    if (data.status === 200) {
      target.reset();
      state.setOpen(false, "create-module");
    }
    setLoading(false);
  };

  return (
    <>
      <div
        className="text-white bg-blue-600 flex items-center justify-center px-3 py-2 text-sm lg:text-lg font-semibold rounded-2xl capitalize cursor-pointer"
        onClick={() => state.setOpen(true, "create-module")}
      >
        create module
      </div>
      {isOpen && (
        <div className="w-full z-50 h-screen fixed left-0 top-0 bg-black/50 p-3 lg:p-16 motion-preset-expand duration-1000">
          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="bg-white min-h-full w-full rounded-3xl max-w-5xl mx-auto  p-4 flex flex-col gap-3"
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
                create module
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                <div className="grid gap-y-2">
                  <label htmlFor="" className="text-lg capitalize ">
                    name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter module name"
                    className="border outline-none p-2 placeholder:text-gray-700 text-lg rounded-2xl"
                  />
                </div>
                <div className="grid gap-y-2">
                  <label htmlFor="" className="text-lg capitalize ">
                    description
                  </label>
                  <input
                    type="text"
                    name="description"
                    required
                    placeholder="enter description"
                    className="border outline-none p-2 placeholder:text-gray-700 text-lg rounded-2xl"
                  />
                </div>

                <div className="grid gap-y-2">
                  <label htmlFor="" className="text-lg capitalize ">
                    images
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    multiple
                    className="border outline-none p-2 placeholder:text-gray-700 text-lg rounded-2xl"
                  />
                </div>
                <div className="grid gap-y-2">
                  <label htmlFor="" className="text-lg capitalize ">
                    files
                  </label>
                  <input
                    type="file"
                    name="pdf"
                    multiple
                    accept="application/pdf"
                    className="border outline-none p-2 placeholder:text-gray-700 text-lg rounded-2xl"
                  />
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
                  "Create Module"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default CreateModule;
