"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type SidebarMenuProps = {
  name: string;
  path: string;
  subpath?: string;
  icon: ReactNode;
};

export function SidebarMenu({
  name,
  path,
  subpath,
  icon: Icon,
}: SidebarMenuProps) {
  const pathname = usePathname();

  return (
    <Link href={path}>
      <Button
        className={`${
          pathname === path || pathname === subpath
            ? "bg-primary"
            : "bg-white text-gray-900"
        } w-full flex items-center justify-start hover:text-white hover:bg-primary`}
      >
        {Icon && Icon}
        {name}
      </Button>
    </Link>
  );
}
