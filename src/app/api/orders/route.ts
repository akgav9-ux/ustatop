import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(request: Request) {
  const session = await auth();
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Авторизуйтесь" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const order = await prisma.order.create({
      data: {
        title: body.title,
        description: body.description,
        district: body.district,
        budget: Number(body.budget),
        categoryId: body.categoryId,
        userId: session.user.id, // ✅ ID берется из сессии
      },
    });

    return NextResponse.json(order);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}