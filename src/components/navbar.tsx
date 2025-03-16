"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { UserButton } from "./user/user-button";

const Navbar = () => {
  // const { session } = useUserStore((state) => state);
  const [open, setOpen] = useState(false);
  const navbarLink = [
    {
      id: "1",
      name: "course",
      path: "/course",
    },
    {
      id: "2",
      name: "contact us",
      path: "/contact",
    },
    {
      id: "3",
      name: "about",
      path: "/about",
    },
  ];
  const pathName = usePathname();

  return (
    <div className="">
      <div className="h-[80px] grid grid-flow-col items-center justify-between ">
        <Link href={"/"} className="cursor-pointer">
          <Image
            src={"/logoz.png"}
            alt=""
            width={70}
            height={70}
            className="object-cover w-[70px] h-[70px]"
          />
        </Link>
        <div className="hidden md:flex justify-center items-center gap-5">
          {navbarLink.map((item) => (
            <Link
              key={item.id}
              className={`${
                pathName === item.path ? "text-[#1e81b0] " : ""
              }  text-xl cursor-pointer capitalize `}
              href={item.path}
            >
              {item.name}{" "}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex space-x-2 justify-end">
          <UserButton />
          {/* <Button className="text-white cursor-pointer hover:bg-[#1e81b0] bg-[#1e81b0] text-xl py-6 px-6">
            <Link href={"/login"}>Sign in</Link>
          </Button>
          <Button className="text-white cursor-pointer hover:bg-[#1e81b0] bg-[#1e81b0] text-xl py-6 px-6 capitalize">
            get started
          </Button> */}
        </div>
        <div className=" md:hidden justify-end !z-[10000] ">
          {open ? (
            <X
              onClick={() => setOpen(false)}
              size={50}
              className="cursor-pointer border rounded-full border-white p-[6px]  text-white"
            />
          ) : (
            <Menu
              className="cursor-pointer z-50"
              size={35}
              onClick={() => setOpen(!open)}
            />
          )}
        </div>
      </div>
      {
        <div
          className={`${
            open
              ? "bg-gray-900/70 backdrop-blur md:hidden w-full h-full fixed top-0 left-0"
              : ""
          } z-50`}
        >
          <div
            className={`${
              open
                ? "md:hidden w-full h-full fixed top-0 left-0 bg-[#1e81b0]  ease-in duration-500 transition-all"
                : "-left-[100%] ease-in duration-500 transition-all w-full h-full fixed top-0 "
            }  !z-[1000000] `}
          >
            <div className="flex flex-col justify-center items-center w-full h-full gap-5">
              {navbarLink.map((item) => (
                <Link
                  onClick={() => setOpen(false)}
                  key={item.id}
                  className={`
                 text-xl cursor-pointer capitalize text-white font-medium `}
                  href={item.path}
                >
                  {item.name}{" "}
                </Link>
              ))}
              <Link
                onClick={() => setOpen(false)}
                href={"/login"}
                className="text-white cursor-pointer font-medium text-xl "
              >
                Sign in
              </Link>
              <Link
                onClick={() => setOpen(false)}
                href={"/"}
                className="text-white cursor-pointer  text-xl font-medium capitalize"
              >
                get started
              </Link>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default Navbar;
