import { useCallback, useState } from "react";
import { api } from "@/lib/axios";

type ProfessionalsProps = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  companyId: string;
};

type GetProfessionalsParams = {
  companyId: string;
};

export function useProfessionals() {
  const [professionals, setProfessionals] = useState<ProfessionalsProps[]>([]);
  const [professionalsLoading, setProfessionalsLoading] = useState(false);

  const getProfessionals = useCallback(
    async ({ companyId }: GetProfessionalsParams) => {
      try {
        setProfessionalsLoading(true);

        const response = await api.get(`/professionals?companyId=${companyId}`);

        if (response) {
          setProfessionals(response.data.data);
        }

        return response.data;
      } catch (error) {
        console.log(error);
      } finally {
        setProfessionalsLoading(false);
      }
    },
    []
  );

  return {
    professionals,
    professionalsLoading,
    getProfessionals,
  };
}
