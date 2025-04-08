import { Link } from "react-router";
import { RegisterForm } from "./RegisterForm";
import { Icons } from "@/components/Icons";

const Register = () => {
  return (
    <div className="flex min-h-svh flex-col p-6 md:p-10">
      <div className="flex justify-center gap-2 md:justify-start">
        <Link to="/login" className="flex items-center gap-2 font-medium">
          <div className="text-primary-foreground flex h-6 w-6 items-center justify-center rounded-md">
            <Icons.NavIcon className="size-6" />
          </div>
          Furniture Shop
        </Link>
      </div>
      <div className="flex flex-grow items-center justify-center">
        <div className="w-[400px] rounded-2xl border bg-white p-8 shadow-md dark:bg-slate-800">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
