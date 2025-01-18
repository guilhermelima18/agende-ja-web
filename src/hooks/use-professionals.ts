import { useCallback, useState } from "react";
import { api } from "@/lib/axios";

export type ProfessionalsProps = {
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

type CreateProfessionalsBody = {
  name: string;
  email: string;
  phoneNumber: string;
  companyId: string;
};

export function useProfessionals() {
  const [professionals, setProfessionals] = useState<ProfessionalsProps[]>([]);
  const [professionalsLoading, setProfessionalsLoading] = useState(false);
  const [createProfessionalsLoading, setCreateProfessionalsLoading] =
    useState(false);

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

  const createProfessionals = useCallback(
    async ({
      name,
      email,
      phoneNumber,
      companyId,
    }: CreateProfessionalsBody) => {
      try {
        setCreateProfessionalsLoading(true);
        const response = await api.post("/professionals", {
          name,
          email,
          phoneNumber,
          companyId,
        });

        return {
          data: response.data.data,
          status: response.status,
        };
      } catch (error) {
        console.log(error);
      } finally {
        setCreateProfessionalsLoading(false);
      }
    },
    []
  );

  return {
    professionals,
    professionalsLoading,
    createProfessionalsLoading,
    getProfessionals,
    createProfessionals,
  };
}
