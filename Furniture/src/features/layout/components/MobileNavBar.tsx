import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MainNavItems } from "@/types";
import { siteConfig } from "@/configs/site";
import { Link } from "react-router";
import { useEffect, useState } from "react";

interface MobileNavBarProps {
  items: MainNavItems[];
}

const MobileNavBar = ({ items }: MobileNavBarProps) => {
  const [isCloseDesktop, setIsCloseDesktop] = useState(false);
  const query = "(min-width: 1024px)";

  useEffect(() => {
    const onChange = (events: MediaQueryListEvent) => {
      setIsCloseDesktop(events.matches);
    };
    const result = matchMedia(query);
    result.addEventListener("change", onChange);
    return () => {
      result.removeEventListener("change", onChange);
    };
  }, [query]);

  if (isCloseDesktop) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger asChild className="lg:hidden">
        <Button variant="ghost" size={"icon"}>
          <Icons.MobileMenuIcon className="size-5" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <ScrollArea className="mx-5">
          <SheetHeader>
            <SheetClose asChild>
              <Link to="/" className="flex items-center space-x-2 pt-6">
                <Icons.NavIcon className="size-7" aria-hidden="true" />
                <SheetTitle className="">{siteConfig.name}</SheetTitle>
                <span className="sr-only">Home</span>
              </Link>
            </SheetClose>

            <Accordion type="multiple" className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>{items[0].title}</AccordionTrigger>
                {items[0].card &&
                  items[0].card.map((item) => (
                    <AccordionContent key={item.title}>
                      <Link
                        to={String(item.href)}
                        className="text-foreground/70 ml-4 text-sm font-medium"
                      >
                        {item.title}
                      </Link>
                    </AccordionContent>
                  ))}
              </AccordionItem>
            </Accordion>

            <div className="flex flex-col items-start gap-4 text-sm font-medium">
              {items?.[0]?.menu &&
                items[0].menu.map((item) => (
                  <SheetClose key={item.title} asChild>
                    <Link to={String(item.href)}>{item.title}</Link>
                  </SheetClose>
                ))}
            </div>
          </SheetHeader>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavBar;
