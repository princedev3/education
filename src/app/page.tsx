"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { IoIosPeople } from "react-icons/io";
import { Instagram, Link as Links, Linkedin, UserRoundPen } from "lucide-react";
import { FaFacebookF } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 my-4  ">
      <div className="grid gap-y-7">
        <div className="">
          <h1 className="text-4xl">This is Your Gateway to Unlimited</h1>
          <h1 className="text-4xl">Educational Resources</h1>
        </div>
        <span className="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ullam
          vitae aliquam saepe inventore ipsam impedit quibusdam animi minus
          dolores! Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Laborum ullam vitae aliquam saepe inventore ipsam impedit quibusdam
          animi minus dolores!
        </span>
        <div className="grid grid-flow-col auto-cols-max gap-5">
          <Button className="text-white capitalize cursor-pointer hover:bg-[#1e81b0] bg-[#1e81b0] text-xl py-6 px-6">
            <Link href={"/about"}>learn more</Link>
          </Button>
          <Button className="text-white cursor-pointer hover:bg-[#1e81b0] bg-[#1e81b0] text-xl py-6 px-6 capitalize">
            <Link href={"/course"}>get started</Link>
          </Button>
        </div>
        <motion.div
          className="grid  grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] gap-5"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ scale: 0.4, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="flex items-center flex-col gap-1 shadow rounded-xl py-4">
            <IoIosPeople size={50} className="text-[#1e81b0] " />
            <span className="text-[#1e81b0] text-lg font-semibold">140K</span>
            <span className="text-[#1e81b0] capitalize text-lg">
              active students
            </span>
          </div>
          <div className="flex items-center gap-1 flex-col shadow rounded-xl py-4 ">
            <Links size={35} className="text-[#1e81b0] stroke-3" />
            <span className="text-[#1e81b0] text-lg font-semibold">18</span>
            <span className="text-[#1e81b0] capitalize text-lg">courses</span>
          </div>
          <div className="flex items-center gap-1 flex-col shadow rounded-xl py-4">
            <UserRoundPen size={40} className="text-[#1e81b0] " />
            <span className="text-[#1e81b0] text-lg font-semibold">45K</span>
            <span className="text-[#1e81b0] capitalize text-lg">Teachers</span>
          </div>
        </motion.div>
        <div className="grid grid-flow-col auto-cols-max gap-5">
          <Link
            href="#"
            className="bg-[#1e81b0] w-10 h-10 flex items-center justify-center rounded-full cursor-pointer "
          >
            <FaFacebookF className="text-white" size={20} />
          </Link>
          <Link
            href="#"
            className="bg-[#1e81b0] w-10 h-10 flex items-center justify-center rounded-full cursor-pointer "
          >
            <Linkedin className="text-white" size={20} />
          </Link>
          <Link
            href="#"
            className="bg-[#1e81b0] w-10 h-10 flex items-center justify-center rounded-full cursor-pointer "
          >
            <Instagram className="text-white" size={20} />
          </Link>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ scale: 0.4, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="grid grid-cols-2 gap-5 self-start"
      >
        <div className=" h-[450px] my-auto grid gap-4">
          <div className="w-full h-full relative">
            <Image
              src={"/edu-two.jpg"}
              alt=""
              fill
              className="object-cover rounded-3xl"
            />
          </div>
          <div className="w-full h-full relative">
            <Image
              src={"/ed-one.jpg"}
              alt=""
              fill
              className="object-cover rounded-3xl"
            />
          </div>
        </div>
        <div className="w-full h-[450px] relative my-auto ">
          <Image
            src={"/edu-three.jpg"}
            alt=""
            fill
            className="object-cover rounded-3xl"
          />
        </div>
      </motion.div>
    </div>
  );
}
