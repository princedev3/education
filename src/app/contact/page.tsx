"use client";
import { Button } from "@/components/ui/button";
import { Accessibility, LoaderCircle, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const Contact = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [loading, setLoading] = useState(false);
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const target = event?.target as HTMLFormElement;
    const formData = new FormData(target);
    setLoading(true);
    formData.append("access_key", process.env.NEXT_PUBLIC_WEBFORM as string);

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    });
    const result = await response.json();
    if (result.success) {
      target.reset();
      setLoading(false);
    }
    setLoading(false);
  }
  return (
    <div className=" mb-3">
      <div className="w-full max-w-3xl mx-auto grid gap-y-4">
        <div className="grid gap-y-1 mb-3">
          <h1 className="text-center text-2xl md:text-4xl font-bold capitalize text-slate-800">
            contact us
          </h1>
          <div className="text-center text-xl font-semibold text-slate-800">
            Any questions or remarks? Just write to write us a message!
          </div>
        </div>
        <div className="mb-[50px] ">
          <form onSubmit={handleSubmit} className="w-full grid gap-y-6">
            <div className="w-full grid mx-auto grid-flow-col gap-6">
              <div className="grid gap-y-2">
                <label htmlFor="" className="text-slate-700 text-xl">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="enter your email"
                  name="email"
                  className={`border p-2 rounded-3xl border-black/30 transition-all ${
                    isFocused ? "bg-transparent" : "bg-slate-100"
                  }`}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
              </div>
              <div className="grid gap-y-2">
                <label htmlFor="" className="text-slate-700 text-xl">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="enter your name"
                  className={`border p-2 rounded-3xl border-black/30 transition-all ${
                    isFocused1 ? "bg-transparent" : "bg-slate-100"
                  }`}
                  onFocus={() => setIsFocused1(true)}
                  onBlur={() => setIsFocused1(false)}
                />
              </div>
            </div>
            <textarea
              rows={7}
              name="message"
              onFocus={() => setIsFocused2(true)}
              onBlur={() => setIsFocused2(false)}
              className={`border p-2 rounded-3xl border-black/30 transition-all ${
                isFocused2 ? "bg-transparent" : "bg-slate-100"
              }`}
              placeholder="enter your message "
            />
            <Button className="my-3 !py-7 text-xl bg-slate-800 hover:bg-slate-800 ">
              {loading ? (
                <LoaderCircle className="animate-spin text-center" size={20} />
              ) : (
                "submit"
              )}
            </Button>
          </form>
        </div>
      </div>
      <div className="md:h-[200px] gap-10 md:grid-flow-col grid auto-cols-max items-center justify-center md:justify-between md:bg-slate-800 relative">
        <div className="w-[180px] h-[180px]  md:absolute md:-top-10 md:left-[10%] flex items-center flex-col justify-center ">
          <div className="w-[130px] h-[130px] bg-[#EA6D27]   flex items-center justify-center rounded-full">
            <Accessibility
              className="font-semibold text-4xl text-white"
              size={90}
            />
          </div>
          <Link
            href={"/about"}
            className="text-lg font-semibold md:text-white text-slate-800 "
          >
            About Restur
          </Link>
        </div>
        <div className="w-[180px] h-[180px]  md:absolute md:-top-10 md:left-[58%] md:-translate-x-full flex items-center flex-col justify-center ">
          <div className="min-w-[130px] min-h-[130px] bg-[#EA6D27]   flex items-center justify-center rounded-full">
            <Phone className="font-semibold text-4xl text-white" size={70} />
          </div>
          <h1 className=" font-semibold md:text-white text-slate-800">
            Phone (Landline)
          </h1>
          <a
            href="tel:+35853157776"
            className="text-sm  md:text-white text-slate-800"
          >
            +35853157776
          </a>
          <a
            href="mailto:marvinprince232@gmail.com"
            className="text-sm  md:text-white text-slate-800"
          >
            marvinprince232@gmail.com
          </a>
        </div>
        <div className="w-[180px] h-[180px]  md:absolute md:-top-10 md:right-[10%]  flex items-center flex-col justify-center ">
          <div className="w-[130px] h-[130px] bg-[#EA6D27]   flex items-center justify-center rounded-full">
            <MapPin className="font-semibold text-4xl text-white" size={70} />
          </div>
          <h1 className=" font-semibold md:text-white text-slate-800">
            Our Office Location
          </h1>
          <span className="text-sm  md:text-white text-slate-800">
            Finland Kuopio, Keskusta
          </span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
