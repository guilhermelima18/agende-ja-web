/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from "react";

import { useAuth as useAuthContext } from "@/contexts/auth";
import { useToast } from "./use-toast";

import { api } from "@/lib/axios";

type AuthParams = {
  email: string;
  password: string;
};

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);

  const { setUserLogged } = useAuthContext();
  const { toast } = useToast();

  const handleAuth = useCallback(
    async ({ email, password }: AuthParams) => {
      try {
        setIsLoading(true);

        const response = await api.post("/sign-in", { email, password });

        if (response && response.data.data.role === "admin") {
          const saveUserStorage = {
            id: response.data.data.id,
            role: response.data.data.role,
            name: response.data.data.name,
            email: response.data.data.email,
            phoneNumber: response.data.data.phoneNumber,
            dateOfBirth: response.data.data.dateOfBirth,
            companyId: response.data.data.companyId,
          };

          setUserLogged(saveUserStorage);

          localStorage.setItem(
            "@agende-ja-web:user",
            JSON.stringify(saveUserStorage)
          );

          return {
            data: response.data.data,
            status: response.status,
          };
        } else {
          toast({
            title: "Atenção!",
            description: "Você não tem permissão para acessar o sistema!",
            variant: "destructive",
          });
        }
      } catch (error: any) {
        toast({
          title: "Atenção!",
          description:
            error?.response?.data?.message ||
            "Não foi possível entrar no sistema!",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [toast, setUserLogged]
  );

  return {
    isLoading,
    handleAuth,
  };
}
