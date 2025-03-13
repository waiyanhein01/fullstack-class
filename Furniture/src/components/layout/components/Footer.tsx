import EmailInput from "@/components/email-input";
import { Icons } from "@/components/Icons";
import { siteConfig } from "@/configs/site";
import { Link } from "react-router";
const Footer = () => {
  return (
    <footer className=" flex items-center mt-auto border-t border-t-slate-300">
      <section className="container mx-auto py-6 lg:py-10">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between mx-5 lg:mx-20 2xl:mx-0">
          <Link to={"/"} className="flex items-center gap-3 mb-5">
            <Icons.NavIcon className="size-7" aria-hidden="true" />
            <h1 className="inline-block font-semibold">{siteConfig.name}</h1>
            <span className="sr-only">Home</span>
          </Link>

          <div className="">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 xl:space-x-5 2xl:space-x-24">
              {siteConfig.footerNav.map((head) => (
                <div key={head.title} className="">
                  <h1 className="text-base font-semibold pb-4">{head.title}</h1>
                  <ul key={head.title}>
                    {head.items.map((item) => (
                      <li
                        key={item.title}
                        className="text-muted-foreground text-sm pb-2 hover:text-foreground cursor-pointer"
                      >
                        <Link
                          to={String(item.href)}
                          target={item.external ? "_blank" : ""}
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-[250px] w-full pt-5 lg:pt-0">
            <h1 className="text-base font-semibold pb-4">
              Subscribe to our newsletter.
            </h1>
            <EmailInput />
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
