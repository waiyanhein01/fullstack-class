import { Product } from "@/types";
import Title from "./Title";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Icons } from "@/components/Icons";
import { formatPrice } from "@/lib/utils";
interface ProductsProps {
  products: Product[];
}

const imgUrl = import.meta.env.VITE_IMG_URL;

const ProductCardSection = ({ products }: ProductsProps) => {
  return (
    <section className="mt-24">
      <Title
        title="Feature Products"
        href={`/products`}
        linkTitle="View All Products"
      />
      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {products.slice(0, 4).map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <CardContent>
              <Link to={`/products/${product.id}`} className="">
                <img
                  src={imgUrl + product.images[0].path}
                  alt="Blog Image"
                  loading="lazy"
                  decoding="async"
                  className="aspect-square w-full object-contain"
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
              {product.status === "active" ? (
                <Button className="flex w-full cursor-pointer items-center justify-center bg-[#3b5d50] hover:bg-[#2f4c3f]">
                  <Icons.PlusIcon />
                  Add to cart
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
        ))}
      </div>
    </section>
  );
};

export default ProductCardSection;
