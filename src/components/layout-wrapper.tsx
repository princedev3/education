"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import Footer from "./footer";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const [mounted, setMounted] = useState(false);

  const isAuthPage =
    pathName === "/login" ||
    pathName === "/register" ||
    pathName === "/course" ||
    pathName?.startsWith("/course") ||
    pathName?.startsWith("/verify-email") ||
    pathName?.startsWith("/forgot-password");
  useEffect(() => {
    setMounted(true);
  }, []);
  if (mounted) {
    return (
      <div>
        {!isAuthPage && <Navbar />}
        {children}
        {!isAuthPage && <Footer />}
      </div>
    );
  }
};

export default LayoutWrapper;
