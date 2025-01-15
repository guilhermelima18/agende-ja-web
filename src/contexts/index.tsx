"use client";

import { ReactNode } from "react";
import { AuthProvider } from "./auth";

type ContextsProps = {
  children: ReactNode;
};

export function Contexts({ children }: ContextsProps) {
  return <AuthProvider>{children}</AuthProvider>;
}
