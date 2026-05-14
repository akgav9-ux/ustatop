import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();

  console.log("🛠 Запрос на отклик для ID:", id); // ✅ Лог для проверки

  if (!id || id === "undefined") {
    return NextResponse.json({ error: "Неверный ID заказа" }, { status: 400 });
  }

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Авторизуйтесь для отклика" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { text, price } = body;

    const response = await prisma.response.create({
      data: {
        text,
        price: Number(price),
        orderId: id, // Теперь ID точно есть
        userId: session.user.id,
      },
    });

    return NextResponse.json(response);
  } catch (error: any) {
    console.error("❌ Ошибка сервера:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}