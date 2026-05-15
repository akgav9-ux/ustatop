import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/formatPrice";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import RespondForm from "@/components/shared/RespondForm"; // ✅ Импортируем компонент

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}) {
  const { locale, id } = await params;
  const t = await getTranslations("orderDetails");

  const order = await prisma.order.findUnique({
    where: { id },
    include: { responses: { include: { user: true } } },
  });

  if (!order) notFound();

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      <div className="bg-white rounded-3xl p-8 shadow-sm">
        <h1 className="text-3xl font-bold">{order.title}</h1>
        <p className="mt-4 text-gray-600">{order.description}</p>
        
        {/* ✅ Вставляем форму и передаем orderId */}
        <RespondForm orderId={order.id} />
      </div>
    </div>
  );
}