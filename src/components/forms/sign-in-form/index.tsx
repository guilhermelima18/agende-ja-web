"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
  signInSchema,
  SignInSchemaType,
} from "@/validations/sign-in-validation";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

export function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
  });

  const router = useRouter();
  const { isLoading, handleAuth } = useAuth();

  async function handleSignIn(data: SignInSchemaType) {
    const response = await handleAuth({
      email: data.email,
      password: data.password,
    });

    if (response?.status === 200) {
      router.push("/home");
    }
  }

  console.log(errors);

  return (
    <form
      className="w-1/2 border border-gray-200 rounded-md p-8"
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
        Entrar
      </Button>
    </form>
  );
}
