"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ThreeDots } from "react-loader-spinner";
import { PlusIcon } from "lucide-react";

import { useAuth } from "@/contexts/auth";
import { useProfessionals } from "@/hooks/use-professionals";

import { EmptyMessage } from "@/components/empty-message";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { TableProfessionals } from "./components/table-professionals";

export default function Professionals() {
  const navigate = useRouter();

  const { userLogged } = useAuth();
  const { professionals, professionalsLoading, getProfessionals } =
    useProfessionals();

  useEffect(() => {
    if (userLogged?.companyId) {
      getProfessionals({
        companyId: userLogged?.companyId,
      });
    }
  }, [userLogged?.companyId, getProfessionals]);

  return (
    <Layout>
      <div className="w-full h-full flex flex-col">
        <div className="w-full flex items-center justify-between gap-4">
          <h1 className="font-semibold text-lg">Profissionais</h1>

          <Button onClick={() => navigate.push("/professionals/create")}>
            <PlusIcon />
            Cadastrar profissional
          </Button>
        </div>

        {professionalsLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <ThreeDots width={50} height={50} color="#884DEE" />
          </div>
        ) : professionals?.length === 0 ? (
          <EmptyMessage message="Não existe profissionais para esse estabelecimento!" />
        ) : (
          <div className="mt-10">
            <TableProfessionals professionals={professionals} />
          </div>
        )}
      </div>
    </Layout>
  );
}
