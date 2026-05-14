import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import LogoutButton from "@/components/shared/LogoutButton";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();
  const t = await getTranslations("profilePage");

  if (!session) {
    redirect(`/${locale}/login`);
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>

        <div className="mt-8 space-y-6">
          <div className="rounded-2xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">{t("name")}</p>
            <p className="text-lg font-medium text-gray-900">{session.user?.name}</p>
          </div>

          <div className="rounded-2xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">{t("email")}</p>
            <p className="text-lg font-medium text-gray-900">{session.user?.email}</p>
          </div>

          <LogoutButton />
        </div>
      </div>
    </div>
  );
}