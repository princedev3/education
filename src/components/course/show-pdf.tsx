"use client";
import { Download } from "lucide-react";
import Image from "next/image";
import React from "react";

const ShowPdf = ({ item, index }: { item: string; index: number }) => {
  return (
    <ul>
      <li className=" flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            src={"/pdf.jpg"}
            width={40}
            height={40}
            className="h-10 w-10 object-cover"
            alt=""
          />
          <span className="">
            {item.split("/")[item.split("/").length - 1]}{" "}
          </span>
        </div>
        <a href={item} target="_blank" download className="pointer">
          <Download className="text-gray-600" fontSize={20} />
        </a>
      </li>
    </ul>
  );
};

export default ShowPdf;
