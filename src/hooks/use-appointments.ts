import { useCallback, useState } from "react";
import { api } from "@/lib/axios";

export type AppointmentsProps = {
  id: string;
  scheduledAt: string;
  status: "PENDING" | "CANCELED" | "CONFIRMED";
  company: string;
  professional: string;
  service: string;
  user: string;
};

type GetAppointmentsParams = {
  professionalId: string;
  companyId: string;
};

export function useAppointments() {
  const [appointments, setAppointments] = useState<AppointmentsProps[]>([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(false);

  const getAppointments = useCallback(
    async ({ professionalId, companyId }: GetAppointmentsParams) => {
      try {
        setAppointmentsLoading(true);

        const response = await api.get(
          `/appointments?professionalId=${professionalId}&companyId=${companyId}`
        );

        if (response) {
          setAppointments(response.data.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setAppointmentsLoading(false);
      }
    },
    []
  );

  return {
    appointments,
    appointmentsLoading,
    getAppointments,
  };
}
