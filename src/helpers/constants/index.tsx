import { CalendarCheck, House } from "lucide-react";

const sidebarMenu = [
  {
    name: "Início",
    path: "/inicio",
    icon: <House />,
  },
  {
    name: "Agendamentos",
    path: "/agendamentos",
    icon: <CalendarCheck />,
  },
];

const schedulingStatus = {
  PENDING: "PENDENTE",
  CANCELED: "CANCELADO",
  CONFIRMED: "CONFIRMADO",
};

function formatSchedulingStatus(status: "PENDING" | "CANCELED" | "CONFIRMED") {
  return schedulingStatus[status];
}

export { sidebarMenu, formatSchedulingStatus };
