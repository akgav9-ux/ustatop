import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/formatPrice";
import { notFound } from "next/navigation";
import Link from "next/link"; // ✅ Добавили Link

const locales = ["ru", "uz"] as const;

export default async function OrdersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {

  const { locale } = await params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = (await import(`@/messages/${locale}.json`)).default;
  const t = messages.ordersPage;

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="space-y-6">

      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">
          {t.title}
        </h1>

        <p className="mt-2 text-gray-500">
          {orders.length} {t.active}
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-3xl bg-white p-10 text-center shadow-sm">

          <h2 className="text-xl font-semibold text-gray-900">
            {t.noOrders}
          </h2>

          <p className="mt-2 text-gray-500">
            {t.noOrdersDesc}
          </p>

        </div>
      ) : (
        <div className="space-y-4">

          {orders.map((order) => (
            <Link 
              key={order.id} 
              href={`/${locale}/orders/${order.id}`}
              className="block"
            >
              <article
                className="rounded-3xl bg-white p-5 shadow-sm transition hover:shadow-md cursor-pointer"
              >

                <div className="flex flex-col gap-4 md:flex-row">

                  <img
                    src={order.image || "/images/repair.jpg"}
                    alt={order.title}
                    className="h-36 w-full rounded-2xl object-cover md:w-36"
                  />

                  <div className="flex-1">

                    <h2 className="text-xl font-bold text-gray-900">
                      {order.title}
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                      {order.district}
                    </p>

                    <p className="mt-3 text-sm text-gray-600">
                      {order.description}
                    </p>

                    <p className="mt-3 text-2xl font-bold text-green-600">
                      {formatPrice(order.budget)}
                    </p>

                  </div>

                </div>

              </article>
            </Link>
          ))}

        </div>
      )}

    </section>
  );
}