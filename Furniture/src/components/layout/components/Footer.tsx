import EmailInput from "@/components/email-input";
import { Icons } from "@/components/Icons";
import { siteConfig } from "@/configs/site";
import { Link } from "react-router";
const Footer = () => {
  return (
    <footer className="mt-auto flex items-center border-t border-t-slate-300">
      <section className="container mx-auto py-6 lg:py-10">
        <div className="mx-5 flex flex-col justify-between lg:mx-20 lg:flex-row lg:items-start 2xl:mx-0">
          <Link to={"/"} className="mb-5 flex items-center gap-3">
            <Icons.NavIcon className="size-7" aria-hidden="true" />
            <h1 className="inline-block font-semibold">{siteConfig.name}</h1>
            <span className="sr-only">Home</span>
          </Link>

          <div className="">
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4 xl:space-x-5 2xl:space-x-24">
              {siteConfig.footerNav.map((head) => (
                <div key={head.title} className="">
                  <h1 className="pb-4 text-base font-semibold">{head.title}</h1>
                  <ul key={head.title}>
                    {head.items.map((item) => (
                      <li
                        key={item.title}
                        className="text-muted-foreground hover:text-foreground cursor-pointer pb-2 text-sm"
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

          <div className="w-full pt-5 lg:w-[250px] lg:pt-0">
            <h1 className="pb-4 text-base font-semibold">
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
