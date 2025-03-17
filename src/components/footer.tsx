"use client";
import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { navbarLink } from "@/data/data";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <div className="">
      <div className="grid  gap-y-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="w-full grid ">
          <div className="flex gap-2">
            <Link href={"/"} className="cursor-pointer">
              <Image
                src={"/logo.svg"}
                alt=""
                width={40}
                height={40}
                className="object-contain w-[40px] h-[40px]"
              />
            </Link>
            <span className="text-gray-700 text-sm w-full">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
              minus asperiores laboriosam commodi sint excepturi officia
              consequuntur optio. Dicta, saepe?
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a href="#">
              <div className="w-7 h-7 rounded-full border flex items-center border-gray-300 hover:bg-gray-100 justify-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Instagram size={18} className="text-gray-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>instagram</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </a>
            <a href="#">
              <div className="w-7 h-7 rounded-full border flex items-center border-gray-300 hover:bg-gray-100 justify-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Linkedin size={18} className="text-gray-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Linkedin</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </a>
            <a href="#">
              <div className="w-7 h-7 rounded-full border flex items-center border-gray-300 hover:bg-gray-100 justify-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Mail size={18} className="text-gray-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>gmail</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </a>
            <a href="#">
              <div className="w-7 h-7 rounded-full border flex items-center border-gray-300 hover:bg-gray-100 justify-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Facebook size={18} className="text-gray-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Facebook</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </a>
          </div>
        </div>
        <div className="grid md:justify-center">
          <h1 className="text-xl capitalize font-semibold text-gray-700">
            Links
          </h1>
          <div className="grid gap-y-4">
            {navbarLink.map((item) => (
              <Link
                key={item.id}
                className={`
                text-sm cursor-pointer capitalize  text-gray-600`}
                href={item.path}
              >
                {item.name}{" "}
              </Link>
            ))}
          </div>
        </div>
        <div className="grid gap-y-2">
          <span className="text-xl capitalize font-semibold text-gray-700">
            {" "}
            sign up for emails
          </span>
          <span className="text-sm text-gray-700">
            get education alert any time. and free update directly into your
            email. sign up
          </span>
          <form action="" className="grid grid-cols-[auto_100px] gap-4 ">
            <input
              type="email"
              className="border outline-none w-full h-full rounded-lg p-1"
            />
            <button className="bg-[#1e81b0] text-white capitalize rounded-lg ">
              sign up{" "}
            </button>
          </form>
        </div>
      </div>
      <Separator className="my-3 mt-4" />

      <div className="flex items-center justify-center text-sm text-gray-700">
        Education at its best <p>&copy; 2025 </p>
      </div>
    </div>
  );
};

export default Footer;
