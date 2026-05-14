import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { formatPrice } from "@/lib/formatPrice";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function MyOrdersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();
  const t = await getTranslations("myOrders");

  if (!session?.user?.id) {
    redirect(`/${locale}/login`);
  }

  // Загружаем только заявки текущего пользователя
  const myOrders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
      </div>

      {myOrders.length === 0 ? (
        <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
          <h2 className="text-xl font-semibold">{t("noOrders")}</h2>
          <Link href={`/${locale}/orders/create`} className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-2xl">
            {t("createNow")}
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {myOrders.map((order) => (
            <article key={order.id} className="rounded-3xl bg-white p-5 shadow-sm">
              <h2 className="text-xl font-bold">{order.title}</h2>
              <p className="text-gray-500 text-sm mt-1">{order.district}</p>
              <p className="mt-3 font-bold text-green-600">{formatPrice(order.budget)}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}