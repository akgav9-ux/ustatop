"use client";

import { useTranslations } from "next-intl";

interface OrderCardProps {
  title: string;
  district: string;
  budget: string;
  responses: number;
  image: string;
  description?: string;
}

export default function OrderCard({ title, district, budget, responses, image, description }: OrderCardProps) {
  const t = useTranslations("ordersBlock");

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white p-5 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
      <div className="flex flex-col gap-4 md:flex-row">
        <img
          src={image || "/images/repair.jpg"}
          alt={title}
          className="h-40 w-full rounded-2xl object-cover md:h-32 md:w-32"
        />

        <div className="flex flex-1 flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {title}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{district}</p>
            {description && <p className="mt-2 text-sm text-gray-600 line-clamp-2">{description}</p>}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-xl font-bold text-green-600">
              {budget}
            </span>
            <span className="rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700">
              {t("responses")}: {responses}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}