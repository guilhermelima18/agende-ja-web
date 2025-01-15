"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/auth";

import { Sidebar } from "../sidebar";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const navigate = useRouter();
  const { userLogged } = useAuth();

  useEffect(() => {
    if (userLogged === null) {
      navigate.push("/");
    }
  }, [navigate, userLogged]);

  return (
    <div className="w-full h-full flex">
      <Sidebar />

      <div className="w-full h-full p-4 overflow-y-auto">{children}</div>
    </div>
  );
}
