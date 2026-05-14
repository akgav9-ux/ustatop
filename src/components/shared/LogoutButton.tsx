"use client";

import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function LogoutButton() {
  const t = useTranslations("profilePage");

  return (
    <button
      onClick={() => signOut({ callbackUrl: "/ru/login" })}
      className="mt-6 w-full rounded-2xl bg-red-50 px-4 py-3 font-medium text-red-600 transition hover:bg-red-100"
    >
      {t("logout")}
    </button>
  );
}