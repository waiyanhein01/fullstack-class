import MainNavBar from "./MainNavBar";
import { siteConfig } from "@/configs/site";
import MobileNavBar from "./MobileNavBar";
import { ModeToggle } from "@/components/mode-toggle";

const Header = () => {
  return (
    <header className=" border-b border-b-slate-300 h-16 flex items-center">
      <div className="flex items-center justify-between gap-6 container mx-auto">
        <div className="">
          <MainNavBar items={siteConfig.mainNav} />
          <MobileNavBar items={siteConfig.mainNav} />
        </div>

        <div className="pe-4 lg:pe-0">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
