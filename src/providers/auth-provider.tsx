"use client";
import React, { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMoounted] = useState(false);
  useEffect(() => {
    setMoounted(true);
  }, []);
  if (!mounted) return null;
  return <SessionProvider>{children} </SessionProvider>;
};

export default AuthProvider;
