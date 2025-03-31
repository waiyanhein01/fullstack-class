import { BreadCrumb } from "@/components/layout/components/BreadCrumb";
import Container from "@/components/layout/components/Container";
import { products } from "@/data/products";
import ProductsCard from "./ProductsCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import ProductRatingStar from "./ProductRatingStar";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import { useParams } from "react-router";
import { formatPrice } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const ProductsDetail = () => {
  const { productId } = useParams();

  const currentProduct = products.find((product) => productId === product.id);
  console.log("currentProduct", currentProduct);
  return (
    <div className="container mx-auto my-20 overflow-hidden">
      <Container>
        <BreadCrumb
          currentPage="ProductsDetail"
          links={[{ path: "/products", title: "Products" }]}
        />
        <div className="flex w-full flex-col gap-16 md:flex-row">
          <div className="w-full md:w-1/2">
            <Carousel
              plugins={[
                Autoplay({
                  delay: 2000,
                }),
              ]}
              className="w-full overflow-hidden"
            >
              <CarouselContent>
                {currentProduct?.images?.map((image) => (
                  <CarouselItem>
                    <div className="p-1">
                      <img src={image} alt={image} className="h-full w-full" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
          <div className="w-full md:w-1/2">
            <h1 className="text-lg font-bold md:text-xl 2xl:text-2xl">
              {currentProduct?.name}
            </h1>

            <h2 className="mt-3 font-semibold">
              {formatPrice(currentProduct?.price ?? 0)}
            </h2>
            <Separator className="my-4" />

            <h3 className="my-4 font-semibold">
              {currentProduct?.inventory} in stock
            </h3>

            <div className="mt-4 flex items-center justify-between">
              <ProductRatingStar rating={Number(currentProduct?.rating)} />
              <span className="">
                <Button variant="outline">
                  <Icons.HeartIcon />
                </Button>
              </span>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h1 className="pb-4 text-lg font-bold md:text-xl 2xl:text-2xl">
            More Products from Furniture Shop
          </h1>
          <ScrollArea className="w-96 rounded-md whitespace-nowrap lg:w-full">
            <div className="flex w-max gap-8 p-4 lg:w-full lg:p-0">
              {products.slice(0, 4).map((product) => (
                <ProductsCard product={product} key={product.id} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </Container>
    </div>
  );
};

export default ProductsDetail;
