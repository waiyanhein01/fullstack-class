import { Icons } from "@/components/Icons";
import { siteConfig } from "@/configs/site";
import { Link } from "react-router";
const Footer = () => {
  return (
    <footer className=" flex items-center mt-auto border border-t-slate-300 h-16">
      <section className="container mx-auto">
        <div className="">
          <Link to={"/"} className="flex items-center gap-3">
            <Icons.NavIcon className="size-7" aria-hidden="true" />
            <h1 className="inline-block font-semibold">{siteConfig.name}</h1>
            <span className="sr-only">Home</span>
          </Link>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
