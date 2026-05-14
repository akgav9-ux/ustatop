"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl"; // ✅ Добавили useTranslations
import {
  Menu,
  X,
  House,
  ClipboardList,
  Users,
  MessageCircle,
  Heart,
} from "lucide-react";

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("menu"); // ✅ Подключили переводы

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center"
      >
        <Menu size={24} />
      </button>

      {open && <div onClick={() => setOpen(false)} className="fixed inset-0 bg-black/40 z-40" />}

      <div className={`fixed top-0 left-0 h-full w-[280px] bg-white z-50 transition-transform duration-300 p-6 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold text-blue-600">UstaTop</h2>
          <button onClick={() => setOpen(false)}><X size={24} /></button>
        </div>

        <nav className="space-y-2">
          <MobileItem href={`/${locale}`} icon={<House size={20} />} title={t("home")} active={pathname === `/${locale}`} />
          <MobileItem href={`/${locale}/orders`} icon={<ClipboardList size={20} />} title={t("orders")} active={pathname === `/${locale}/orders`} />
          {/* ✅ Добавили "Мои заявки" */}
          <MobileItem href={`/${locale}/profile/my-orders`} icon={<ClipboardList size={20} />} title={t("myOrders")} active={pathname === `/${locale}/profile/my-orders`} />
          <MobileItem href={`/${locale}/masters`} icon={<Users size={20} />} title={t("masters")} active={pathname === `/${locale}/masters`} />
          <MobileItem href={`/${locale}/messages`} icon={<MessageCircle size={20} />} title={t("messages")} active={pathname === `/${locale}/messages`} />
          <MobileItem href={`/${locale}/profile`} icon={<Heart size={20} />} title={t("profile")} active={pathname === `/${locale}/profile`} />
        </nav>
      </div>
    </>
  );
}

interface MobileItemProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  active?: boolean;
}

function MobileItem({ href, icon, title, active }: MobileItemProps) {
  return (
    <Link
      href={href}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition ${
        active ? "bg-blue-600 text-white" : "hover:bg-gray-100 text-gray-700"
      }`}
    >
      {icon}
      <span>{title}</span>
    </Link>
  );
}