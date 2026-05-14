"use client";

import { useTranslations } from "next-intl";

export default function MastersSection() {
  const t = useTranslations("masters");

  const masters = [
    {
      id: 1,
      name: "Александр П.",
      specialty: "Сантехник",
      rating: 4.9,
      reviews: 128,
      status: "online",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      name: "Бобур Т.",
      specialty: "Мастер на все руки",
      rating: 4.8,
      reviews: 96,
      status: "online",
      avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    },
    {
      id: 3,
      name: "Игорь С.",
      specialty: "Электрик",
      rating: 4.9,
      reviews: 74,
      status: "recently",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
  ];

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">
          {t("title")}
        </h3>

        <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition">
          {t("viewAll")}
        </button>
      </div>

      <div className="space-y-4">
        {masters.map((master) => (
          <div
            key={master.id}
            className="flex items-center gap-4 rounded-2xl bg-gray-50 p-4"
          >
            <img
              src={master.avatar}
              alt={master.name}
              className="h-14 w-14 rounded-xl object-cover"
            />

            <div className="flex-1">
              <p className="font-semibold text-gray-900">
                {master.name}
              </p>
              <p className="text-sm text-gray-500">
                {master.specialty}
              </p>
              <p className="text-sm text-gray-600">
                ⭐ {master.rating} ({master.reviews})
              </p>
            </div>

            <span
              className={`text-xs font-medium px-3 py-1 rounded-full ${
                master.status === "online"
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {master.status === "online"
                ? t("online")
                : t("recently")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}