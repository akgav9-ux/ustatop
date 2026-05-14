import { getTranslations } from "next-intl/server";

export default async function MessagesPage() {
  const t = await getTranslations("messagesPage");

  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm min-h-[500px]">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {t("title")}
      </h1>

      {/* Здесь будет список чатов. Пока сделаем красивое состояние "пусто" */}
      <div className="flex h-[400px] flex-col items-center justify-center text-center">
        <div className="text-6xl mb-4">💬</div>
        <h2 className="text-xl font-semibold text-gray-900">
          {t("empty")}
        </h2>
        <p className="mt-2 text-gray-500 max-w-sm">
          {t("emptyDesc")}
        </p>
      </div>
    </div>
  );
}