import { prisma } from "@/lib/prisma";

type Props = {
  params: { slug: string };
};

export default async function Page({ params }: Props) {
  const { slug } = params;

  // 1️⃣ Найти категорию по slug
  const category = await prisma.category.findUnique({
    where: { slug },
  });

  if (!category) {
    return <div style={{ padding: 40 }}>Категория не найдена</div>;
  }

  // 2️⃣ Найти заявки по categoryId
  const orders = await prisma.order.findMany({
    where: {
      categoryId: category.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div style={{ padding: "40px" }}>
      <h1>{category.nameRu}</h1>

      {orders.length === 0 ? (
        <p>Пока нет заявок</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} style={{ marginBottom: 20 }}>
            <h3>{order.title}</h3>
            <p>{order.description}</p>
            <p>Бюджет: {order.budget}</p>
          </div>
        ))
      )}
    </div>
  );
}