"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type SidebarMenuProps = {
  name: string;
  path: string;
  icon: ReactNode;
};

export function SidebarMenu({ name, path, icon: Icon }: SidebarMenuProps) {
  const pathname = usePathname();

  console.log(pathname === path);

  return (
    <Link href={path}>
      <Button
        className={`${
          pathname === path ? "bg-purple-500" : "bg-white text-gray-900"
        } w-full flex items-center justify-start hover:text-white hover:bg-purple-500`}
      >
        {Icon && Icon}
        {name}
      </Button>
    </Link>
  );
}
