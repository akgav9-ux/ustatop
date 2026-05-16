import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    // Проверка: пользователь уже существует?
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Пользователь с таким email уже зарегистрирован" },
        { status: 400 }
      );
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 12);

    // Создаем пользователя ПРЯМО в Neon PostgreSQL
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    console.log("✅ Новый пользователь создан:", user.email);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("❌ FULL ERROR:", error);

    return NextResponse.json(
      {
      error: error instanceof Error ? error.message : String(error)
    },
    { status: 500 }
  );
}
}