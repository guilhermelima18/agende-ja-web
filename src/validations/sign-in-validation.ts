import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string({ required_error: "E-mail é um campo obrigatório" })
    .email("E-mail inválido"),
  password: z
    .string({ required_error: "Senha é um campo obrigatório" })
    .min(6, "Senha deve ter no mínimo 6 dígito"),
});

export type SignInSchemaType = z.infer<typeof signInSchema>;
