import MainLayout from "@/components/layout/MainLayout";
import RightSidebar from "@/components/layout/RightSidebar";

export default function MainGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout right={<RightSidebar />}>
      {children}
    </MainLayout>
  );
  
}