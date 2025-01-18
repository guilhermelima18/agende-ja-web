"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThreeDots } from "react-loader-spinner";

import { useAuth } from "@/contexts/auth";
import { useProfessionals } from "@/hooks/use-professionals";
import { useToast } from "@/hooks/use-toast";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { phoneMask } from "@/helpers/masks";
import {
  createProfessionalsSchema,
  CreateProfessionalsSchemaType,
} from "./validations";

export function CreateProfessionalsForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateProfessionalsSchemaType>({
    resolver: zodResolver(createProfessionalsSchema),
    mode: "onChange",
  });

  const navigate = useRouter();
  const { toast } = useToast();
  const { userLogged } = useAuth();
  const { createProfessionalsLoading, createProfessionals } =
    useProfessionals();

  async function handleProfessionalsCreate(
    data: CreateProfessionalsSchemaType
  ) {
    const values = {
      ...data,
      phoneNumber: data.phoneNumber?.replace(/\D/g, ""),
    };

    const response = await createProfessionals({
      name: values.name,
      email: values.email,
      phoneNumber: values.phoneNumber,
      companyId: userLogged?.companyId || "",
    });

    if (response && response.status === 201) {
      toast({
        title: "Sucesso!",
        description: "Profissional cadastrado!",
        variant: "default",
      });
      navigate.push("/professionals");
    }
  }

  return (
    <form
      className="flex flex-col"
      onSubmit={handleSubmit(handleProfessionalsCreate)}
    >
      <div className="w-full max-w-[500px] flex flex-col gap-4">
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="name">Nome</label>
          <Input
            id="name"
            placeholder="Digite o nome..."
            {...register("name")}
          />
          {errors.name?.message && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="w-full flex flex-col gap-1">
          <label htmlFor="email">E-mail</label>
          <Input
            id="email"
            placeholder="Digite o e-mail..."
            {...register("email")}
          />
          {errors.email?.message && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="w-full flex flex-col gap-1">
          <label htmlFor="phoneNumber">Celular</label>
          <Input
            id="phoneNumber"
            placeholder="Digite o celular..."
            {...register("phoneNumber")}
            onChange={(e) => {
              const value = phoneMask(e.target.value);
              setValue("phoneNumber", value);
            }}
            maxLength={15}
          />
          {errors.phoneNumber?.message && (
            <p className="text-xs text-red-500">{errors.phoneNumber.message}</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <Button
          className="w-full max-w-[500px]"
          type="submit"
          disabled={isSubmitting || createProfessionalsLoading}
        >
          {createProfessionalsLoading || isSubmitting ? (
            <ThreeDots width={20} height={20} color="#fff" />
          ) : (
            "Salvar"
          )}
        </Button>
      </div>
    </form>
  );
}
