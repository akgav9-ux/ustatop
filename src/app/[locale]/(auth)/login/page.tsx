"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  loginSchema,
  LoginSchema,
} from "@/schemas/loginSchema";

export default function LoginPage() {

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (
    data: LoginSchema
  ) => {

    const result = await signIn(
      "credentials",
      {
        email: data.email,
        password: data.password,

        redirect: false,
      }
    );

    if (result?.error) {
      alert("Неверный email или пароль");
      return;
    }

    alert("Вход выполнен ✅");

    router.push("/ru");
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm p-8">

      <h1 className="text-3xl font-bold">
        Вход
      </h1>

      <p className="mt-2 text-gray-500">
        Войдите в аккаунт
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 space-y-4"
      >

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
            ? "Вход..."
            : "Войти"}
        </button>

      </form>

      <p className="mt-6 text-center text-gray-500">
        Нет аккаунта?{" "}

        <Link
          href="/ru/register"
          className="text-blue-600 font-medium"
        >
          Регистрация
        </Link>
      </p>

    </div>
  );
}