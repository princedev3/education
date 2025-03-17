"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div>
      <motion.section
        id="hero-section"
        className=" bg-[#003DA6] relative min-h-[70vh] my-4 rounded-xs grid grid-cols-1 md:grid-cols-2"
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.4, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Image
          src={"/bg-noise.png"}
          fill
          objectFit="cover"
          objectPosition="center"
          priority
          alt="Hero Section Backgroun Image"
          className="opacity-30"
        />
        <div className="text-2xl font-medium text-white flex items-center justify-center flex-col gap-3">
          <p className="text-center">The beautiful thing </p>
          <p className="text-center">about learning is that no one can take</p>
          <p className="text-center"> it away from you.</p>
        </div>

        <div className="relative ">
          <Image
            src={"/about.jpg"}
            fill
            objectFit="cover"
            objectPosition="center"
            priority
            alt="Hero Section Backgroun Image"
            className="opa"
          />
        </div>
      </motion.section>
    </div>
  );
};

export default About;
