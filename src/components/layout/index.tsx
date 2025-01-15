"use client";

import { ReactNode } from "react";
import { Sidebar } from "../sidebar";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="w-full h-full flex">
      <Sidebar />

      <div className="w-full h-full p-4 overflow-y-auto">{children}</div>
    </div>
  );
}
