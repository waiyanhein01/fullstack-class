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
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCartStore } from "@/store/cartStore";
import CartItem from "./CartItem";

export default function Cart() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  const { carts: cartItems } = useCartStore();
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="relative">
            {totalItems > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 size-5 rounded-full text-sm"
              >
                {totalItems}
              </Badge>
            )}
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
              Cart Items
              {totalItems > 0 && (
                <span className="mx-1 text-red-500">({totalItems})</span>
              )}
            </SheetTitle>
            <SheetDescription>Happy Shopping with us</SheetDescription>
            <Separator className="my-4" />
          </SheetHeader>
          {cartItems.length > 0 ? (
            <>
              <div className="px-4">
                <ScrollArea className="h-[60vh]">
                  {cartItems.map((cart) => (
                    <CartItem key={cart.id} cart={cart} />
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
                    <span className="font-semibold">
                      Calculated at checkout
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-semibold">
                      Total
                    </span>
                    <span className="font-semibold">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                </div>
                <SheetClose asChild>
                  <Button type="submit">Checkout</Button>
                </SheetClose>
              </SheetFooter>
            </>
          ) : (
            <div className="flex h-[60vh] flex-col items-center justify-center">
              <Icons.CartIcon size={"icon"} className="size-10" />
              <h2 className="text-lg font-semibold">Your cart is empty</h2>
              <p className="text-muted-foreground">
                Add items to your cart to see them here.
              </p>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
