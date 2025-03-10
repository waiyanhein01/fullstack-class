import MainNavBar from "./MainNavBar"
import { siteConfig } from "@/configs/site"
import MobileNavBar from "./MobileNavBar"
import { ModeToggle } from "@/components/mode-toggle"

const Header = () => {
  return (
    <header className="flex items-center border-b border-b-slate-300 h-16">
      <MainNavBar items={siteConfig.mainNav} />
      <MobileNavBar items={siteConfig.mainNav} />

      <div className=" pe-8">
        <ModeToggle/>
      </div>
    </header>
  )
}

export default Header
