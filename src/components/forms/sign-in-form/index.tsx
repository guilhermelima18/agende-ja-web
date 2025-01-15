"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThreeDots } from "react-loader-spinner";

import { useAuth } from "@/hooks/use-auth";
import { useAuth as useAuthContext } from "@/contexts/auth";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
  signInSchema,
  SignInSchemaType,
} from "@/validations/sign-in-validation";
import { useEffect } from "react";

export function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
  });

  const navigate = useRouter();
  const { isLoading, handleAuth } = useAuth();
  const { userLogged } = useAuthContext();

  async function handleSignIn(data: SignInSchemaType) {
    const response = await handleAuth({
      email: data.email,
      password: data.password,
    });

    if (response?.status === 200) {
      navigate.push("/home");
    }
  }

  useEffect(() => {
    if (userLogged !== null) {
      navigate.push("/home");
    }
  }, [navigate, userLogged]);

  return (
    <form
      className="w-full xl:w-1/2 border border-gray-200 rounded-md p-8"
      onSubmit={handleSubmit(handleSignIn)}
    >
      <h4 className="mb-4 font-bold text-lg">Entrar no sistema</h4>
      <div className="w-full">
        <Label>E-mail</Label>
        <Input
          type="email"
          placeholder="Digite seu e-mail..."
          {...register("email")}
        />
        {errors?.email && (
          <p className="text-xs text-red-500 mt-1">{errors?.email?.message}</p>
        )}
      </div>

      <div className="w-full">
        <Label>Senha</Label>
        <Input
          type="password"
          placeholder="Digite sua senha..."
          {...register("password")}
        />
        {errors?.password && (
          <p className="text-xs text-red-500 mt-1">
            {errors?.password?.message}
          </p>
        )}
      </div>

      <Button className="w-full mt-4" disabled={isLoading || isSubmitting}>
        {isLoading || isSubmitting ? (
          <ThreeDots width={20} height={20} color="#fff" />
        ) : (
          "Entrar"
        )}
      </Button>
    </form>
  );
}
