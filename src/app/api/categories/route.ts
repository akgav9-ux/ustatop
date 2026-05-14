import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Делаем явный лог, чтобы увидеть, что происходит
    console.log("Попытка загрузки категорий из Prisma...");
    
    const categories = await prisma.category.findMany();
    
    console.log("Категории успешно получены:", categories);
    return NextResponse.json(categories);
  } catch (error: any) {
    // ✅ Вот тут мы увидим реальную ошибку в терминале VS Code!
    console.error("❌ КРИТИЧЕСКАЯ ОШИБКА API /api/categories:", error);
    
    return NextResponse.json(
      { error: error.message || "Ошибка базы данных" }, 
      { status: 500 }
    );
  }
}