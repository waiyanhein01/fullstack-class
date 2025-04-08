import { Icons } from "@/components/Icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { formatPrice } from "@/lib/utils";
import CartItem from "./CartItem";
import { cartItems } from "@/data/carts";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Cart() {
  const totalCarts = 4;
  const totalCosts = 150;
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="relative">
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 size-5 rounded-full text-sm"
            >
              {totalCarts}
            </Badge>
            <Icons.CartIcon
              size={"icon"}
              className="size-4"
              aria-hidden="true"
            />
            <span className="sr-only">Cart Icon</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full">
          <SheetHeader>
            <SheetTitle>
              Cart Items (<span className="text-red-500">{totalCarts}</span>)
            </SheetTitle>
            <SheetDescription>Happy Shopping with us</SheetDescription>
            <Separator className="my-4" />
          </SheetHeader>
          <div className="px-4">
            <ScrollArea className="h-[60vh]">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </ScrollArea>
          </div>
          <SheetFooter>
            <Separator className="" />
            <div className="mb-3 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground font-semibold">
                  Shipping
                </span>
                <span className="font-semibold">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-semibold">
                  Taxes
                </span>
                <span className="font-semibold">Calculated at checkout</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-semibold">
                  Total
                </span>
                <span className="font-semibold">{formatPrice(totalCosts)}</span>
              </div>
            </div>
            <SheetClose asChild>
              <Button type="submit">Checkout</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
