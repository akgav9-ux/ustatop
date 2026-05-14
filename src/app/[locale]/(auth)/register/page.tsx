"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  registerSchema,
  RegisterSchema,
} from "@/schemas/registerSchema";

export default function RegisterPage() {

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.error);
        return;
      }

      alert("✅ Аккаунт создан!");

      // Автоматически входим сразу после регистрации
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      router.push("/ru");

    } catch (error) {
      alert("❌ Ошибка соединения");
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm p-8">

      <h1 className="text-3xl font-bold">
        Регистрация
      </h1>

      <p className="mt-2 text-gray-500">
        Создайте аккаунт
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 space-y-4"
      >

        {/* NAME */}
        <div>
          <input
            type="text"
            placeholder="Имя"
            {...register("name")}
            className="w-full border rounded-2xl px-4 py-3 outline-none focus:border-blue-500"
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full border rounded-2xl px-4 py-3 outline-none focus:border-blue-500"
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <input
            type="password"
            placeholder="Пароль"
            {...register("password")}
            className="w-full border rounded-2xl px-4 py-3 outline-none focus:border-blue-500"
          />

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-2xl font-medium disabled:opacity-50"
        >
          {isSubmitting
            ? "Создание..."
            : "Создать аккаунт"}
        </button>

      </form>

      <p className="mt-6 text-center text-gray-500">
        Уже есть аккаунт?{" "}

        <Link
          href="/ru/login"
          className="text-blue-600 font-medium"
        >
          Войти
        </Link>
      </p>

    </div>
  );
}