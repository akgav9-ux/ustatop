"use client";

import { useTranslations } from "next-intl";
import OrderCard from "@/components/shared/OrderCard";
import { orders } from "@/constants/orders";

export default function OrdersSection() {
  const t = useTranslations("ordersBlock");

  return (
    <section className="mt-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {t("title")}
        </h2>

        <button className="text-sm font-medium text-blue-600 transition hover:text-blue-700">
          {t("viewAll")}
        </button>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            title={order.title}
            district={order.district}
            budget={order.budget}
            responses={order.responses}
            image={order.image}
          />
        ))}
      </div>
    </section>
  );
}