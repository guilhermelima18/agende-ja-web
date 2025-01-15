"use client";

import Image from "next/image";

import { useAuth } from "@/contexts/auth";

import { SidebarMenu } from "./sidebar-menu";
import { Button } from "../ui/button";

import { sidebarMenu } from "@/helpers/constants";

export function Sidebar() {
  const { handleDeleteUserLogged } = useAuth();

  return (
    <aside className="w-full max-w-80 p-4 flex flex-col justify-between border-r border-r-gray-300">
      <div className="flex flex-col gap-10">
        <div className="w-full flex items-center justify-center">
          <Image
            src="/icons/logo-agende-ja.png"
            width={130}
            height={130}
            objectFit="contain"
            alt=""
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          {sidebarMenu.map((menu) => (
            <SidebarMenu
              key={menu.path}
              name={menu.name}
              path={menu.path}
              icon={menu.icon}
            />
          ))}
        </div>
      </div>

      <div className="w-full">
        <Button
          className="w-full"
          variant="destructive"
          onClick={() => handleDeleteUserLogged()}
        >
          Sair
        </Button>
      </div>
    </aside>
  );
}
