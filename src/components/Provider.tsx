"use client";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

type providerProps = {
  children: any;
  session?: Session | undefined;
};

export const Provider = ({ children, session }: providerProps) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
