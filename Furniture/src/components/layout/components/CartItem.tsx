import { CartType } from "@/types";
import CartItemForm from "./CartItemForm";
import { formatPrice } from "@/lib/utils";

export interface CartItemProps {
  item: CartType;
}

const CartItem = ({ item }: CartItemProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <img src={item.image.url} alt="" className="size-16 rounded-md" />
        <div className="">
          <h1 className="text-sm font-semibold">{item.name}</h1>
          <h2 className="text-muted-foreground text-sm font-normal">
            {formatPrice(item.price)} x {item.quantity} =
            <span className="px-1">{formatPrice(item.price * item.quantity)}</span>
          </h2>
          <h3 className="text-muted-foreground text-sm font-normal">
            {` ${item.category} / ${item.subcategory}`}
          </h3>
        </div>
      </div>
      <CartItemForm />
    </div>
  );
};

export default CartItem;
