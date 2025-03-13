import { Icons } from "@/components/Icons";
import Footer from "@/components/layout/components/Footer";
import Header from "@/components/layout/components/Header";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center my-24">
        <Icons.ExclamationIcon className="size-28 text-muted-foreground/70" aria-hidden="true" />
        <h1 className="text-2xl font-semibold">404 Not Found</h1>
        <p className="text-muted-foreground">
          The page you are looking for does not exist.
        </p>
        <Link to={"/"}>
          <button className="mt-4 border border-slate-400 rounded-md px-4 py-2 cursor-pointer">
            Go to home
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
