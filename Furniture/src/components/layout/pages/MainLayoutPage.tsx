import MainLayout from "@/components/layout/components/MainLayout";
import { Toaster } from "@/components/ui/sonner";
const MainLayoutPage = () => {
  return (
    <main>
      <Toaster position="top-right" />
      <MainLayout />
    </main>
  );
};

export default MainLayoutPage;
