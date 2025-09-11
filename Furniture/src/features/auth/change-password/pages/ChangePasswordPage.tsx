import Header from "@/features/layout/components/Header";
import ChangePassword from "../components/ChangePassword";
import Footer from "@/features/layout/components/Footer";

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
