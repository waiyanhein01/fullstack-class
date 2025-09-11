import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

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
