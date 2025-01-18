"use client";

import { useEffect } from "react";
import { useQueryState } from "nuqs";

import { Layout } from "@/components/layout";
import { TableAppointments } from "./components/table-appointments";
import { FiltersAppointments } from "./components/filters-appointments";
import { useAppointments } from "@/hooks/use-appointments";
import { useAuth } from "@/contexts/auth";
import { ThreeDots } from "react-loader-spinner";
import { EmptyMessage } from "@/components/empty-message";

export default function Appointments() {
  const [professionalSelected, setProfessionalSelected] =
    useQueryState("profissional");

  const { userLogged } = useAuth();
  const { appointments, appointmentsLoading, getAppointments } =
    useAppointments();

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
            setProfessionalSelected={setProfessionalSelected}
          />
        </div>

        {appointmentsLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <ThreeDots width={50} height={50} color="#884DEE" />
          </div>
        ) : appointments?.length === 0 ? (
          <EmptyMessage message="Não existe agendamentos para esse profissional!" />
        ) : (
          <div className="mt-10">
            <TableAppointments appointments={appointments} />
          </div>
        )}
      </div>
    </Layout>
  );
}
