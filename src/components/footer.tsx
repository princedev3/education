import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div>
      <Link href={"/"} className="cursor-pointer">
        <Image
          src={"/logoz.png"}
          alt=""
          width={40}
          height={40}
          className="object-cover w-[40px] h-[40px]"
        />
      </Link>
    </div>
  );
};

export default Footer;
