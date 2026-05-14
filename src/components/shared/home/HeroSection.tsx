"use client";

import { useTranslations } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="rounded-3xl bg-[#071a3d] p-8 text-white shadow-sm md:p-10">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <h1 className="max-w-2xl text-3xl font-bold leading-tight md:text-5xl">
            {t("title")}
          </h1>

          <p className="mt-4 max-w-xl text-base text-blue-100 md:text-lg">
            {t("subtitle")}
          </p>

          <button className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700">
            {t("create")}
          </button>
        </div>
      </div>
    </section>
  );
}