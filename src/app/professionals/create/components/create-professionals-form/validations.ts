import { z } from "zod";

export const createProfessionalsSchema = z.object({
  name: z.string().min(1, "Campo obrigatório"),
  email: z.string().email("E-mail inválido"),
  phoneNumber: z.string().min(15, "Celular inválido"),
});

export type CreateProfessionalsSchemaType = z.infer<
  typeof createProfessionalsSchema
>;
