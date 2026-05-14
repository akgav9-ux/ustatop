import { z } from "zod";

export const orderSchema = z.object({
  title: z.string().min(5, "Минимум 5 символов"),
  description: z.string().min(10, "Минимум 10 символов"),
  district: z.string().min(2, "Укажите район"),
  budget: z.string().min(1, "Укажите бюджет"),
  categoryId: z.string().min(1, "Выберите категорию"),
});

export type OrderSchema = z.infer<typeof orderSchema>;