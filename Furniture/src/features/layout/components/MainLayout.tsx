import { Outlet, useLocation } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = () => {
  const location = useLocation();
  console.log(location);
  const dashboardPaths = location.pathname === "/admin";
  return (
    <main className="flex min-h-screen flex-col">
      {!dashboardPaths && <Header />}
      <Outlet />
      {!dashboardPaths && <Footer />}
    </main>
  );
};

export default MainLayout;
