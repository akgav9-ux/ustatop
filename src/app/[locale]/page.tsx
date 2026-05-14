import MainLayout from "@/components/layout/MainLayout";
import RightSidebar from "@/components/layout/RightSidebar";

import HeroSection from "@/components/shared/home/HeroSection";
import CategoriesSection from "@/components/shared/home/CategoriesSection";
import OrdersSection from "@/components/shared/home/OrdersSection";

export default function HomePage() {
  return (
    <MainLayout right={<RightSidebar />}>
      <div className="space-y-8">
        <HeroSection />

        <CategoriesSection />

        <OrdersSection />
      </div>
    </MainLayout>
  );
}