"use client";

import { useEffect } from "react";
import { Session } from "next-auth";
import { useUserStore } from "./user-session";

const SessionProvider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) => {
  const setSession = useUserStore((state) => state.setSession);

  useEffect(() => {
    setSession(session);
  }, [session, setSession]);

  return <>{children}</>;
};

export default SessionProvider;
