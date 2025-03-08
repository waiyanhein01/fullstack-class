import { Outlet } from "react-router";
import Footer from "@/components/layout/components/Footer";
import Header from "@/components/layout/components/Header";

const MainLayout = () => {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default MainLayout;
