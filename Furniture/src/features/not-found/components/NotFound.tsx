import { Icons } from "@/components/Icons";
import Footer from "@/components/layout/components/Footer";
import Header from "@/components/layout/components/Header";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="my-24 flex flex-1 flex-col items-center justify-center">
        <Icons.ExclamationIcon
          className="text-muted-foreground/70 size-28"
          aria-hidden="true"
        />
        <h1 className="text-2xl font-semibold">404 Not Found</h1>
        <p className="text-muted-foreground">
          The page you are looking for does not exist.
        </p>
        <Link to={"/"}>
          <button className="mt-4 cursor-pointer rounded-md border border-slate-400 px-4 py-2">
            Go to home
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
