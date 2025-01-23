import moment from "moment";
import { CheckCircle, Trash } from "lucide-react";

import { AppointmentsProps } from "@/hooks/use-appointments";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { formatSchedulingStatus } from "@/helpers/constants";

type TableAppointmentsProps = {
  appointments: AppointmentsProps[];
  handleUpdateAppointmentsStatus: (appointmentId: string) => void;
  handleDeleteAppointments: (appointmentId: string) => void;
};

export function TableAppointments({
  appointments,
  handleUpdateAppointmentsStatus,
  handleDeleteAppointments,
}: TableAppointmentsProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Cliente</TableHead>
          <TableHead>Procedimento</TableHead>
          <TableHead>Profissional</TableHead>
          <TableHead>Agendado para</TableHead>
          <TableHead className="w-[100px]">Status</TableHead>
          <TableHead className="w-[100px]" />
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
            <TableCell className="flex items-center gap-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDeleteAppointments(appointment.id)}
              >
                <Trash />
              </Button>

              <Button
                size="sm"
                onClick={() => handleUpdateAppointmentsStatus(appointment.id)}
              >
                <CheckCircle />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
