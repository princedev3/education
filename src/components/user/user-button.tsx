"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ChevronDown } from "lucide-react";
import { useUserStore } from "@/providers/user-session";

export const UserButton = () => {
  const router = useRouter();

  const session = useUserStore((state) => state.session);

  const user = session?.user;
  const nameAbrev = user?.name?.split("").splice(0, 2).join("");

  const signOut = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_FETCH_URL}/user/logout-user`,
      {
        method: "POST",
      }
    );

    if (res.ok) {
      router.push("/login");
      return;
    }
  };

  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            asChild
            variant={"outline"}
            size={"default"}
            className="rounded-full"
          >
            <span className="flex space-x-2">
              <Avatar className="size-8">
                {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                <AvatarFallback className="uppercase">
                  {nameAbrev}
                </AvatarFallback>
              </Avatar>

              <div className="xl:flex flex-col justify-end hidden">
                <span>{user?.name}</span>
                <span className="line-clamp-1 text-xs text-gray-600">
                  {user?.email}
                </span>
              </div>
              <div>
                <ChevronDown className="w-4 h-4" />
              </div>
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-2">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signOut}>Log Out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  return (
    <div className="hidden md:flex space-x-2 justify-end">
      <Button className="text-white cursor-pointer hover:bg-[#1e81b0] bg-[#1e81b0] text-xl py-6 px-6">
        <Link href={"/login"}>Sign in</Link>
      </Button>
      <Button className="text-white cursor-pointer hover:bg-[#1e81b0] bg-[#1e81b0] text-xl py-6 px-6 capitalize">
        get started
      </Button>
    </div>
  );
};
