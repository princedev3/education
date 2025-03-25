"use client";
import React from "react";
import { FadeLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/45 flex items-center justify-center z-50">
      <FadeLoader color="#1e81b0" className="w-10 h-10" />
    </div>
  );
};

export default Loading;
