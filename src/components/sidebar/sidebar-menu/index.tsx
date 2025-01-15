import { ReactNode } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type SidebarMenuProps = {
  name: string;
  path: string;
  icon: ReactNode;
};

export function SidebarMenu({ name, path, icon: Icon }: SidebarMenuProps) {
  return (
    <Link href={path}>
      <Button className="w-full">
        {Icon && Icon}
        {name}
      </Button>
    </Link>
  );
}
