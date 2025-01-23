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
  professionalId?: string;
  companyId: string;
};

export function useAppointments() {
  const [appointments, setAppointments] = useState<AppointmentsProps[]>([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(false);

  const getAppointments = useCallback(
    async ({ professionalId, companyId }: GetAppointmentsParams) => {
      try {
        setAppointmentsLoading(true);

        let endpoint = `/appointments?companyId=${companyId}`;

        if (professionalId) {
          endpoint += `&professionalId=${professionalId}`;
        }

        const response = await api.get(endpoint);

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

  const updateAppointmentsStatus = useCallback(
    async ({ appointmentId }: { appointmentId: string }) => {
      try {
        const response = await api.put(`/appointments/${appointmentId}`);

        return {
          data: response.data.data,
          status: response.status,
        };
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  const deleteAppointments = useCallback(
    async ({ appointmentId }: { appointmentId: string }) => {
      try {
        const response = await api.delete(`/appointments/${appointmentId}`);

        return {
          data: response.data.data,
          status: response.status,
        };
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  return {
    appointments,
    appointmentsLoading,
    getAppointments,
    updateAppointmentsStatus,
    deleteAppointments,
  };
}
