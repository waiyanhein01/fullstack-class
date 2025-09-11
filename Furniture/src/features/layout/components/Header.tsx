import MainNavBar from "./MainNavBar";
import { siteConfig } from "@/configs/site";
import MobileNavBar from "./MobileNavBar";
import { ModeToggle } from "@/components/mode-toggle";
import { DropdownProfile } from "./DropDownProfile";
import Cart from "./Cart";
import ProgressLoader from "@/components/progress-loader.tsx";
import WhiteListHeart from "./WhiteListHeart";
import { userProfileQuery } from "@/api/query";
import { useSuspenseQuery } from "@tanstack/react-query";

const Header = () => {
  const { data: user } = useSuspenseQuery(userProfileQuery());
  return (
    <header className="bg-background fixed top-0 z-50 flex h-16 w-full items-center border-b border-b-slate-300">
      <section className="container mx-auto">
        <ProgressLoader />
        <div className="mx-5 flex items-center justify-between gap-6 lg:mx-20 2xl:mx-0">
          <div className="">
            <MainNavBar items={siteConfig.mainNav} />
            <MobileNavBar items={siteConfig.mainNav} />
          </div>

          <div className="flex items-center gap-4">
            <WhiteListHeart favProducts={user?.user?.products} />
            <Cart />
            <ModeToggle />
            <DropdownProfile user={user.user} />
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;
