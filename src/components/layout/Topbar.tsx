"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileSidebar from "./MobileSidebar";

export default function Topbar() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();

  return (
    <header className="mb-6">
      <div className="flex items-center justify-between gap-4">
        
        {/* LEFT */}
        <div className="flex items-center gap-3 min-w-0">
          <MobileSidebar />
          <button className="bg-white px-4 py-3 rounded-2xl shadow-sm font-medium whitespace-nowrap">
            📍 Ташкент
          </button>
          
          <div className="hidden md:flex bg-white rounded-2xl px-4 py-3 shadow-sm w-[250px] lg:w-[400px] min-w-0">
            <input
              type="text"
              placeholder={t("topbar.search")}
              className="w-full outline-none bg-transparent"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <LanguageSwitcher />

          <button 
            onClick={() => router.push(`/${locale}/orders/create`)} // ✅ Вот она рабочая кнопка!
            className="hidden sm:flex bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-3 rounded-2xl font-medium whitespace-nowrap items-center justify-center"
          >
            + {t("topbar.createOrder")}
          </button>

          <button className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center">
            🔔
          </button>

          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="profile"
            className="h-12 w-12 rounded-2xl object-cover shadow-sm"
          />
        </div>
      </div>
    </header>
  );
}