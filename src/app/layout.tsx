import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UstaTop",
  description: "Платформа поиска мастеров",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="bg-gray-50 text-gray-900">
        {children}
    </body>
    </html>
  );
}