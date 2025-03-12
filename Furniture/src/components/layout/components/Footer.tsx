import EmailInput from "@/components/email-input";
import { Icons } from "@/components/Icons";
import { siteConfig } from "@/configs/site";
import { Link } from "react-router";
const Footer = () => {
  return (
    <footer className=" flex items-center mt-auto border-t border-t-slate-300">
      <section className="container mx-auto py-10">
        <div className="flex flex-col md:flex-row md:items-start justify-between">
          <Link to={"/"} className="flex items-center gap-3">
            <Icons.NavIcon className="size-7" aria-hidden="true" />
            <h1 className="inline-block font-semibold">{siteConfig.name}</h1>
            <span className="sr-only">Home</span>
          </Link>

          <div className="">
            <div className="grid grid-cols-2 md:grid-cols-4 space-x-10 md:space-x-20 lg:space-x-24">
              {siteConfig.footerNav.map((head) => (
                <h1 key={head.title} className="text-base font-semibold pb-4">
                  {head.title}
                </h1>
              ))}
              {siteConfig.footerNav.map((list) => (
                <ul key={list.title}>
                  {list.items.map((item) => (
                    <li key={item.title} className="text-muted-foreground text-sm pb-2 hover:text-foreground cursor-pointer">
                      <Link to={String(item.href)} target={item.external ? "_blank" : ""}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>

          <div className="lg:w-[250px] w-full">
            <h1 className="text-base font-semibold pb-4">Subscribe to our newsletter.</h1>
            <EmailInput/>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
