import * as React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { MainNavItems } from "@/types";
import { siteConfig } from "@/configs/site";
import { Link } from "react-router";
import { Icons } from "@/components/Icons";

interface MainNavBarProps {
  items?: MainNavItems[];
}
const MainNavBar = ({ items }: MainNavBarProps) => {
  return (
    <header className="hidden gap-24 lg:flex lg:items-center lg:gap-10">
      <Link to="/" className="flex items-center gap-3">
        <Icons.NavIcon className="size-7" aria-hidden="true" />
        <h1 className="inline-block font-semibold">{siteConfig.name}</h1>
        <span className="sr-only">Home</span>
      </Link>
      <div className="">
        <NavigationMenu>
          <NavigationMenuList>
            {items?.[0]?.card && (
              <NavigationMenuItem>
                <NavigationMenuTrigger>{items[0].title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="from-muted/50 to-muted flex size-full flex-col justify-start rounded-md bg-gradient-to-b p-5 no-underline outline-none select-none focus:shadow-md"
                          to="/"
                        >
                          <div className="mb-2 flex items-center justify-baseline gap-3">
                            <Icons.NavIcon className="size-6" />
                            <div className="font-medium">{siteConfig.name}</div>
                          </div>
                          <p className="text-muted-foreground text-sm leading-tight">
                            {siteConfig.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <div className="">
                      {items[0].card.map((item) => (
                        <ListItem
                          key={item.title}
                          href={item.href}
                          title={item.title}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </div>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}
            <div className="flex items-center gap-5">
              {items?.[0]?.menu &&
                items?.[0]?.menu.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <Link to={String(item.href)}>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
            </div>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          to={String(href)}
          className={cn(
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none",
            className,
          )}
          {...props}
        >
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default MainNavBar;
