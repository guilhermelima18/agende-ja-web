import { CalendarCheck, House, Users } from "lucide-react";

const sidebarMenu = [
  {
    name: "Início",
    path: "/home",
    icon: <House />,
  },
  {
    name: "Agendamentos",
    path: "/appointments",
    icon: <CalendarCheck />,
  },
  {
    name: "Profissionais",
    path: "/professionals",
    subpath: "/professionals/create",
    icon: <Users />,
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
