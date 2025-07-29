import Header from "@/components/layout/components/Header";
import ChangePassword from "../components/ChangePassword";
import Footer from "@/components/layout/components/Footer";

const ChangePasswordPage = () => {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <ChangePassword />
      <Footer />
    </div>
  );
};

export default ChangePasswordPage;
