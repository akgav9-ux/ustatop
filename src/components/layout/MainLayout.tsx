"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl"; // ✅ Объединили импорты
import Topbar from "./Topbar";
import {
  House,
  ClipboardList,
  Users,
  MessageCircle,
  Heart,
} from "lucide-react";

interface MainLayoutProps {
  children: ReactNode;
  right?: ReactNode;
}

export default function MainLayout({
  children,
  right,
}: MainLayoutProps) {
  const pathname = usePathname();
  const t = useTranslations("menu");
  const locale = useLocale(); // ✅ Теперь импорт тут, а не внутри функции

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-6 pb-28 lg:pb-6">
      <div className="grid grid-cols-12 gap-6">
        <aside className="hidden lg:col-span-2 lg:block">
          <div className="sticky top-6 rounded-3xl bg-white p-4 shadow-sm">
            <h2 className="mb-8 text-2xl font-bold text-blue-600">UstaTop</h2>

            <nav className="space-y-2">
              <SidebarItem
                href={`/${locale}`}
                title={t("home")}
                icon={<House size={20} />}
                active={pathname === `/${locale}`}
              />
              <SidebarItem
                href={`/${locale}/orders`}
                title={t("orders")}
                icon={<ClipboardList size={20} />}
                active={pathname === `/${locale}/orders`}
              />
              <SidebarItem
                href={`/${locale}/masters`}
                title={t("masters")}
                icon={<Users size={20} />}
                active={pathname === `/${locale}/masters`}
              />
              <SidebarItem
                href={`/${locale}/messages`}
                title={t("messages")}
                icon={<MessageCircle size={20} />}
                active={pathname === `/${locale}/messages`}
              />
              <SidebarItem
                href={`/${locale}/login`}
                title={t("profile")}
                icon={<Heart size={20} />}
                active={pathname === `/${locale}/login` || pathname === `/${locale}/profile`}
              />

              <SidebarItem
                href={`/${locale}/profile/my-orders`}
                title={t("myOrders")}
  i             con={<ClipboardList size={20} />}
                active={pathname === `/${locale}/profile/my-orders`}
              />
            </nav>
          </div>
        </aside>

        <main className="col-span-12 lg:col-span-7">
          <Topbar />
          {children}
        </main>

        <aside className="hidden xl:col-span-3 xl:block">{right}</aside>
      </div>
    </div>
  );
}

interface SidebarItemProps {
  href: string;
  title: string;
  icon: ReactNode;
  active?: boolean;
}

function SidebarItem({
  href,
  title,
  icon,
  active = false,
}: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 font-medium transition ${
        active
          ? "bg-blue-600 text-white shadow-md"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {icon}
      <span>{title}</span>
    </Link>
  );
  
}