import MainNavBar from "./MainNavBar";
import { siteConfig } from "@/configs/site";
import MobileNavBar from "./MobileNavBar";
import { ModeToggle } from "@/components/mode-toggle";

const Header = () => {
  return (
    <header className="w-full border-b border-b-slate-300 h-16 flex items-center fixed top-0 z-50 bg-background ">
      <section className="container mx-auto">
        <div className="flex items-center justify-between gap-6 mx-5 lg:mx-20 2xl:mx-0">
          <div className="">
            <MainNavBar items={siteConfig.mainNav} />
            <MobileNavBar items={siteConfig.mainNav} />
          </div>

          <div className="">
            <ModeToggle />
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;
