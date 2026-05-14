"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { House, ClipboardList, MessageCircle, User, Plus } from "lucide-react";

export default function MobileBottomNav() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("menu"); // ✅ Используем переводы

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white lg:hidden">
      <div className="grid grid-cols-5 items-center h-20">
        <NavItem
          href={`/${locale}`}
          icon={<House size={22} />}
          label={t("home")}
          active={pathname === `/${locale}`}
        />
        <NavItem
          href={`/${locale}/orders`}
          icon={<ClipboardList size={22} />}
          label={t("orders")}
          active={pathname === `/${locale}/orders`}
        />

        {/* CENTER BUTTON */}
        <div className="flex justify-center">
          <button 
            onClick={() => router.push(`/${locale}/orders/create`)}
            className="flex h-16 w-16 -mt-8 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition hover:bg-blue-700"
          >
            <Plus size={30} />
          </button>
        </div>

        <NavItem
          href={`/${locale}/messages`}
          icon={<MessageCircle size={22} />}
          label={t("messages")}
          active={pathname === `/${locale}/messages`}
        />
        <NavItem
          href={`/${locale}/profile`}
          icon={<User size={22} />}
          label={t("profile")}
          active={pathname === `/${locale}/profile`}
        />
      </div>
    </div>
  );
}

function NavItem({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active: boolean }) {
  return (
    <Link href={href} className={`flex flex-col items-center justify-center gap-1 text-[10px] font-medium ${active ? "text-blue-600" : "text-gray-500"}`}>
      {icon}
      <span>{label}</span>
    </Link>
  );
}