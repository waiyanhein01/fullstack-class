import { Outlet } from "react-router";
import Footer from "@/components/layout/components/Footer";
import Header from "@/components/layout/components/Header";

const MainLayout = () => {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default MainLayout;
