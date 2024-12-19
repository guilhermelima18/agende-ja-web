/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from "react";

import { api } from "@/lib/axios";
import { useToast } from "./use-toast";

type AuthParams = {
  email: string;
  password: string;
};

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const handleAuth = useCallback(
    async ({ email, password }: AuthParams) => {
      try {
        setIsLoading(true);

        const response = await api.post("/sign-in", { email, password });
        return {
          data: response.data.data,
          status: response.status,
        };
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
    [toast]
  );

  return {
    isLoading,
    handleAuth,
  };
}
