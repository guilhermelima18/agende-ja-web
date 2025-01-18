"use client";

import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { useAuth } from "@/contexts/auth";
import { useProfessionals } from "@/hooks/use-professionals";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FiltersAppointmentsProps = {
  professionalSelected: string | null;
  setProfessionalSelected: Dispatch<SetStateAction<string | null>>;
};

export function FiltersAppointments({
  professionalSelected,
  setProfessionalSelected,
}: FiltersAppointmentsProps) {
  const { userLogged } = useAuth();
  const { professionals, getProfessionals } = useProfessionals();

  const professionalsAdapter = useMemo(() => {
    if (!!professionals?.length && professionals?.length > 0) {
      return professionals.map((professional) => ({
        label: professional.name,
        value: professional.id,
      }));
    }
  }, [professionals]);

  useEffect(() => {
    if (userLogged?.companyId) {
      getProfessionals({ companyId: userLogged?.companyId });
    }
  }, [userLogged, getProfessionals]);

  return (
    <div className="flex flex-col">
      <h4 className="text-sm mb-1">Selecione uma profissional</h4>
      <Select
        value={professionalSelected || ""}
        onValueChange={(value) => setProfessionalSelected(value)}
      >
        <SelectTrigger className="w-80">
          <SelectValue placeholder="Escolha uma profissional" />
        </SelectTrigger>
        <SelectContent>
          {professionalsAdapter?.map((professional) => (
            <SelectItem key={professional.value} value={professional.value}>
              {professional.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
