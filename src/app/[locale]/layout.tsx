import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import AuthProvider from "@/components/providers/AuthProvider";

const locales = ["ru", "uz"];

// Самое важное: отключаем кэш переводов
export const dynamic = "force-dynamic";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {

  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AuthProvider>
        {children}
        <MobileBottomNav />
      </AuthProvider>
    </NextIntlClientProvider>
  );
}