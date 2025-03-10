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

interface MobileNavBarProps {
  items: MainNavItems[];
}

const MobileNavBar = ({ items }: MobileNavBarProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild className="lg:hidden mx-4">
        <Button variant="ghost" size={"icon"}>
          <Icons.MobileMenuIcon className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <ScrollArea className="mx-4">
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
                        className="ml-4 text-foreground/70 text-sm font-medium"
                      >
                        {item.title}
                      </Link>
                    </AccordionContent>
                  ))}
              </AccordionItem>
            </Accordion>

            <div className="flex flex-col gap-4 items-start text-sm font-medium">
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
