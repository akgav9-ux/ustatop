"use client";

import { useLocale } from "next-intl";
import Link from "next/link";

export default function LanguageSwitcher() {

  const locale = useLocale();

  return (
    <div className="bg-white rounded-2xl shadow-sm">
      {locale === "ru" ? (
        <Link
          href="/uz"
          className="block px-4 py-3 font-medium hover:bg-gray-50 rounded-2xl transition text-center"
        >
          UZ
        </Link>
      ) : (
        <Link
          href="/ru"
          className="block px-4 py-3 font-medium hover:bg-gray-50 rounded-2xl transition text-center"
        >
          RU
        </Link>
      )}
    </div>
  );
}