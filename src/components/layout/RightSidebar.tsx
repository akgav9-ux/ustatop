"use client";

import { useTranslations } from "next-intl";
import MastersSection from "@/components/shared/home/MastersSection";

export default function RightSidebar() {
  const t = useTranslations("howItWorks");

  return (
    <div className="space-y-6">
      {/* Как это работает */}
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h3 className="mb-6 text-2xl font-bold text-gray-900">
          {t("title")}
        </h3>

        <div className="space-y-5">
          <Step number="1" title={t("step1Title")} desc={t("step1Desc")} />
          <Step number="2" title={t("step2Title")} desc={t("step2Desc")} />
          <Step number="3" title={t("step3Title")} desc={t("step3Desc")} />
          <Step number="4" title={t("step4Title")} desc={t("step4Desc")} />
        </div>
      </div>

      {/* Рекомендуемые мастера */}
      <MastersSection />
    </div>
  );
}

function Step({
  number,
  title,
  desc,
}: {
  number: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
        {number}
      </div>

      <div>
        <p className="font-semibold text-gray-900">{title}</p>
        <p className="mt-1 text-sm text-gray-500">{desc}</p>
      </div>
    </div>
  );
}