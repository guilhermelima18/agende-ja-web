"use client";

import { useEffect } from "react";
import { useQueryState } from "nuqs";
import { ThreeDots } from "react-loader-spinner";

import { useAuth } from "@/contexts/auth";
import { useToast } from "@/hooks/use-toast";
import { useAppointments } from "@/hooks/use-appointments";

import { Layout } from "@/components/layout";
import { EmptyMessage } from "@/components/empty-message";
import { TableAppointments } from "./components/table-appointments";
import { FiltersAppointments } from "./components/filters-appointments";

export default function Appointments() {
  const [professionalSelected, setProfessionalSelected] =
    useQueryState("profissional");

  const { toast } = useToast();
  const { userLogged } = useAuth();
  const {
    appointments,
    appointmentsLoading,
    getAppointments,
    updateAppointmentsStatus,
    deleteAppointments,
  } = useAppointments();

  async function handleUpdateAppointmentsStatus(appointmentId: string) {
    const response = await updateAppointmentsStatus({ appointmentId });

    if (response && response.status === 200) {
      const successToast = toast({
        title: "Sucesso!",
        description: "Agendamento atualizado!",
        variant: "primary",
      });

      await getAppointments({
        professionalId: professionalSelected!,
        companyId: userLogged!.companyId,
      });

      setTimeout(() => {
        successToast.dismiss();
      }, 1000);
    }
  }

  async function handleDeleteAppointments(appointmentId: string) {
    const response = await deleteAppointments({ appointmentId });

    if (response && response.status === 200) {
      const successToast = toast({
        title: "Sucesso!",
        description: "Agendamento excluído!",
        variant: "primary",
      });

      await getAppointments({
        professionalId: professionalSelected!,
        companyId: userLogged!.companyId,
      });

      setTimeout(() => {
        successToast.dismiss();
      }, 1000);
    }
  }

  useEffect(() => {
    if (professionalSelected && userLogged?.companyId) {
      getAppointments({
        professionalId: professionalSelected,
        companyId: userLogged?.companyId,
      });
    }
  }, [professionalSelected, userLogged, getAppointments]);

  return (
    <Layout>
      <div className="w-full h-full flex flex-col">
        <div className="w-full flex flex-col gap-4">
          <h1 className="font-semibold text-lg">Agendamentos</h1>

          <FiltersAppointments
            professionalSelected={professionalSelected}
            setProfessionalSelected={setProfessionalSelected}
          />
        </div>

        {appointmentsLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <ThreeDots width={50} height={50} color="#884DEE" />
          </div>
        ) : appointments?.length === 0 ? (
          <EmptyMessage message="Primeiro, escolha um profissional" />
        ) : (
          <div className="w-full h-[700px] overflow-y-auto mt-10">
            <TableAppointments
              appointments={appointments}
              handleUpdateAppointmentsStatus={handleUpdateAppointmentsStatus}
              handleDeleteAppointments={handleDeleteAppointments}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}
