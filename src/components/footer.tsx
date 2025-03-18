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
    <div className="p-4">
      <div className="grid gap-y-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Link href="/" className="cursor-pointer">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={40}
                height={40}
                className="object-contain min-w-10 min-h-10"
              />
            </Link>
            <p className="text-gray-700 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
              minus asperiores laboriosam commodi sint excepturi officia
              consequuntur optio. Dicta, saepe?
            </p>
          </div>
          <div className="flex gap-3">
            {[
              { icon: <Instagram size={18} />, label: "Instagram" },
              { icon: <Linkedin size={18} />, label: "LinkedIn" },
              { icon: <Mail size={18} />, label: "Email" },
              { icon: <Facebook size={18} />, label: "Facebook" },
            ].map((item, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full text-gray-500 hover:bg-gray-100 cursor-pointer">
                      {item.icon}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>

        <div className="grid gap-2 md:justify-center">
          <h1 className="text-xl font-semibold text-gray-700">Links</h1>
          <nav className="grid gap-2">
            {navbarLink.map((item) => (
              <Link
                key={item.id}
                href={item.path}
                className="text-sm text-gray-600 capitalize hover:text-gray-900"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="grid gap-2">
          <h1 className="text-xl font-semibold text-gray-700">
            Sign up for emails
          </h1>
          <p className="text-sm text-gray-700">
            Get education alerts and free updates directly to your email.
          </p>
          <form className="flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="border p-2 rounded-lg outline-none flex-grow"
            />
            <button className="bg-[#1e81b0] text-white px-4 py-2 rounded-lg capitalize hover:bg-[#166590]">
              Sign Up
            </button>
          </form>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex justify-center text-sm text-gray-700">
        <p>Education at its best &copy; 2025</p>
      </div>
    </div>
  );
};

export default Footer;
