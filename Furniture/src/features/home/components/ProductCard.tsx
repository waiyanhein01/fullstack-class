import { Product } from "@/types";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Icons } from "@/components/Icons";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

interface ProductsProps {
  product: Product;
}

const imgUrl = import.meta.env.VITE_IMG_URL;

const ProductCard = ({ product }: ProductsProps) => {
  const { carts, addItem } = useCartStore();
  const existingItem = carts.find((cart) => cart.id === product.id);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      image: product.images[0].path,
      price: product.price,
      quantity: 1,
    });
  };
  return (
    <Card key={product.id} className="overflow-hidden">
      <CardContent>
        <Link to={`/products/${product.id}`} className="">
          <img
            src={imgUrl + product.images[0].path}
            alt="Blog Image"
            loading="lazy"
            decoding="async"
            className="aspect-square w-full bg-neutral-100 object-contain object-center"
          />
          <h1 className="my-2 ml-4 line-clamp-1 text-base font-semibold">
            {product.name}
          </h1>
          <div className="flex items-center">
            {product.discount > 0 && (
              <h2 className="ml-4 text-sm font-semibold line-through">
                {formatPrice(product.discount)}
              </h2>
            )}
            <h2 className="ml-4 text-sm font-semibold">
              {formatPrice(product.price)}
            </h2>
          </div>
        </Link>
      </CardContent>
      <CardFooter className="w-full">
        {product.status === "ACTIVE" ? (
          <Button
            onClick={handleAddToCart}
            disabled={existingItem ? true : false}
            className="flex w-full cursor-pointer items-center justify-center bg-[#3b5d50] hover:bg-[#2f4c3f]"
          >
            {!existingItem && (
              <Icons.PlusIcon className="size-4" aria-hidden="true" />
            )}
            {existingItem ? "Added" : "Add to Cart"}
          </Button>
        ) : (
          <Button className="w-full" disabled={true}>
            Sold Out
          </Button>
        )}
        {/* <Button variant="outline">Cancel</Button>
              <Button>Deploy</Button> */}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
