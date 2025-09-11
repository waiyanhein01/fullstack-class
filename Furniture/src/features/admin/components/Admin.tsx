import { AdminLoginForm } from "./AdminLooginForm";
import Container from "@/features/layout/components/Container";

const Admin = () => {
  return (
    <Container>
      <div className="flex min-h-screen w-full flex-col">
        <div className="flex h-screen items-center justify-center">
          <div className="w-[400px] rounded-2xl border bg-white p-8 shadow-md dark:bg-slate-800">
            <AdminLoginForm />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Admin;
