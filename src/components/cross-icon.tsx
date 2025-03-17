"use client";
import { motion } from "framer-motion";

const CrossIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="red"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6"
  >
    {/* First Stroke */}
    <motion.line
      x1="6"
      y1="6"
      x2="18"
      y2="18"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    />
    {/* Second Stroke */}
    <motion.line
      x1="18"
      y1="6"
      x2="6"
      y2="18"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    />
  </svg>
);

export default CrossIcon;
