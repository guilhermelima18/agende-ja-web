import moment from "moment";

import { AppointmentsProps } from "@/hooks/use-appointments";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatSchedulingStatus } from "@/helpers/constants";

type TableAppointmentsProps = {
  appointments: AppointmentsProps[];
};

export function TableAppointments({ appointments }: TableAppointmentsProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Cliente</TableHead>
          <TableHead>Procedimento</TableHead>
          <TableHead>Profissional</TableHead>
          <TableHead>Agendado para</TableHead>
          <TableHead className="w-[100px]">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.map((appointment) => (
          <TableRow key={appointment.id}>
            <TableCell>{appointment.user}</TableCell>
            <TableCell>{appointment.service}</TableCell>
            <TableCell>{appointment.professional}</TableCell>
            <TableCell>
              {moment
                .utc(appointment.scheduledAt)
                .format("DD/MM/YYYY [às] HH:mm")}
            </TableCell>
            <TableCell>{formatSchedulingStatus(appointment.status)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
