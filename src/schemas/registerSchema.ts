import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Минимум 2 символа"),

  email: z
    .string()
    .email("Введите корректный email"),

  password: z
    .string()
    .min(6, "Минимум 6 символов"),
});

export type RegisterSchema = z.infer<
  typeof registerSchema
>;