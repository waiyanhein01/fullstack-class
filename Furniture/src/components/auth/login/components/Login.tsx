import { Icons } from "@/components/Icons";
import { LoginForm } from "./LoginForm";
import { Link } from "react-router";

const Login = () => {
  return (
    <div>
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <Link to="/login" className="flex items-center gap-2 font-medium">
              <div className="text-primary-foreground flex h-6 w-6 items-center justify-center rounded-md">
                <Icons.NavIcon className="size-6" />
              </div>
              Furniture Shop
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-[400px] rounded-2xl border bg-white p-8 shadow-md dark:bg-slate-800">
              <LoginForm />
            </div>
          </div>
        </div>
        <div className="bg-muted relative hidden lg:block">
          <img
            src="/images/house.webp"
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
