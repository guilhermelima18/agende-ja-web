"use client";

import { useEffect, useMemo } from "react";
import { ThreeDots } from "react-loader-spinner";

import { useAuth } from "@/contexts/auth";
import { useAppointments } from "@/hooks/use-appointments";

export function CardResumeAppointments() {
  const { userLogged } = useAuth();
  const { appointments, appointmentsLoading, getAppointments } =
    useAppointments();

  const totalAppointments = useMemo(() => {
    if (!!appointments?.length && appointments?.length > 0) {
      return appointments?.length;
    }

    return 0;
  }, [appointments]);

  const pendingAppointments = useMemo(() => {
    if (!!appointments?.length && appointments?.length > 0) {
      return appointments?.filter(
        (appointment) => appointment.status === "PENDING"
      )?.length;
    }

    return 0;
  }, [appointments]);

  const canceledAppointments = useMemo(() => {
    if (!!appointments?.length && appointments?.length > 0) {
      return appointments?.filter(
        (appointment) => appointment.status === "CANCELED"
      )?.length;
    }

    return 0;
  }, [appointments]);

  useEffect(() => {
    if (userLogged?.companyId) {
      getAppointments({
        companyId: userLogged?.companyId,
      });
    }
  }, [userLogged, getAppointments]);

  return (
    <>
      {appointmentsLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <ThreeDots width={50} height={50} color="#884DEE" />
        </div>
      ) : (
        <div className="w-full flex items-center justify-center gap-8 mt-20">
          <div className="w-80 h-40 flex flex-col items-center justify-center gap-8 p-4 border border-gray-500 rounded-md">
            <h4>Total de agendamentos</h4>
            <span className="font-semibold text-4xl">{totalAppointments}</span>
          </div>

          <div className="w-80 h-40 flex flex-col items-center justify-center gap-8 p-4 border border-gray-500 rounded-md">
            <h4>Agendamentos pendentes</h4>
            <span className="font-semibold text-4xl">
              {pendingAppointments}
            </span>
          </div>

          <div className="w-80 h-40 flex flex-col items-center justify-center gap-8 p-4 border border-gray-500 rounded-md">
            <h4>Agendamentos cancelados</h4>
            <span className="font-semibold text-4xl">
              {canceledAppointments}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
