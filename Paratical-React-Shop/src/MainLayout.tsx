import { Outlet } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";

const Dashboard = () => {
  return <div className=" container mx-auto min-h-screen flex flex-col">
    <Header />
    <Outlet/>
    <Footer />
  </div>;
};

export default Dashboard;
