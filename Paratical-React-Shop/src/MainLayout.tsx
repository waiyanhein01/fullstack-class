import { Outlet } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Dashboard;
