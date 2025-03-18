"use cient";
import { useUserStore } from "@/providers/user-session";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

const ShowImage = ({ item, index }: { item: string; index: number }) => {
  const session = useUserStore((state) => state.session);

  const handleDownload = async (imageUrl: string, index: number) => {
    if (!session) {
      toast.error("You must be logged in to download images.");
      return;
    }
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `image-${index}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Image
        onClick={() => handleDownload(item, index)}
        src={item}
        alt=""
        width={200}
        height={200}
        className="w-[200px] h-[200px] object-cover  cursor-pointer rounded-xl"
      />
    </>
  );
};

export default ShowImage;
