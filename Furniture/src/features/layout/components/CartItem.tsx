import { CartType } from "@/types";
import CartItemForm from "./CartItemForm";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

export interface CartItemProps {
  cart: CartType;
}

const imgUrl = import.meta.env.VITE_IMG_URL;

const CartItem = ({ cart }: CartItemProps) => {
  const { updateItem, removeItem } = useCartStore();
  const handleUpdate = (quantity: number) => {
    updateItem(cart.id, quantity);
  };
  const handleRemove = () => {
    removeItem(cart.id);
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <img src={imgUrl + cart.image} alt="" className="size-16 rounded-md" />
        <div className="">
          <h1 className="text-sm font-semibold">{cart.name}</h1>
          <h2 className="text-muted-foreground text-sm font-normal">
            {formatPrice(cart.price)} x {cart.quantity} =
            <span className="px-1">
              {formatPrice(cart.price * cart.quantity)}
            </span>
          </h2>
          {/* <h3 className="text-muted-foreground text-sm font-normal">
            {` ${item.category} / ${item.subcategory}`}
          </h3> */}
        </div>
      </div>
      <CartItemForm
        onUpdate={handleUpdate}
        onRemove={handleRemove}
        quantity={cart.quantity}
      />
    </div>
  );
};

export default CartItem;
