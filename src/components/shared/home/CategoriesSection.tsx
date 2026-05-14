"use client";

import {
  Hammer,
  Wrench,
  Zap,
  Paintbrush,
  Sofa,
  Grid2x2,
} from "lucide-react";
import { useTranslations } from "next-intl";

export default function CategoriesSection() {
  const t = useTranslations("categories");

  const categories = [
    { key: "repair", icon: <Hammer size={32} /> },
    { key: "plumbing", icon: <Wrench size={32} /> },
    { key: "electric", icon: <Zap size={32} /> },
    { key: "finishing", icon: <Paintbrush size={32} /> },
    { key: "furniture", icon: <Sofa size={32} /> },
    { key: "other", icon: <Grid2x2 size={32} /> },
  ];

  return (
    <section className="mt-10">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        {t("title")}
      </h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {categories.map((category) => (
          <div
            key={category.key}
            className="cursor-pointer rounded-2xl bg-white p-6 text-center shadow-sm transition hover:shadow-md"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="text-blue-600">{category.icon}</div>
              <p className="font-medium text-gray-800">
                {t(category.key)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}