import Container from "@/components/layout/components/Container";
import ProductsCard from "./ProductsCard";
import ProductRatingStar from "./ProductRatingStar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { BreadCrumb } from "@/components/layout/components/BreadCrumb";
import { Separator } from "@/components/ui/separator";
import { useLoaderData, useNavigate } from "react-router";
import { formatPrice } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Autoplay from "embla-carousel-autoplay";
import { AddToCartForm } from "./AddToCardForm";
import { useSuspenseQuery } from "@tanstack/react-query";
import { productDetailQuery, productsQuery } from "@/api/query";
import { Image, Product } from "@/types";
// import FavouriteIcon from "./FavouriteIcon"; // if using with react-router
import FavouriteIcon from "./TanStackOptimistic"; // if using with TanStack Query
import { useCartStore } from "@/store/cartStore";

const ProductsDetail = () => {
  // const { productId } = useParams();
  // const currentProduct = products.find((product) => productId === product.id);

  const { addItem } = useCartStore();

  const nav = useNavigate();
  const { productId } = useLoaderData();
  const { data: productDetailData } = useSuspenseQuery(
    productDetailQuery(Number(productId)),
  );
  const { data: productsData } = useSuspenseQuery(productsQuery("limit=4"));

  const imgUrl = import.meta.env.VITE_IMG_URL;

  const handleAddToCart = (quantity: number) => {
    addItem({
      id: productDetailData.product.id,
      name: productDetailData.product.name,
      price: productDetailData.product.price,
      image: productDetailData.product.images[0].path,
      quantity,
    });
  };

  const backHandler = () => {
    nav(-1);
  };

  return (
    <div className="container mx-auto my-20 overflow-hidden">
      <Container>
        <BreadCrumb
          currentPage="ProductsDetail"
          links={[{ onClick: backHandler, title: "Products" }]}
        />
        <div className="flex w-full flex-col gap-16 md:flex-row">
          <div className="w-full md:w-1/2">
            <Carousel
              plugins={[
                Autoplay({
                  delay: 2000,
                  stopOnInteraction: false,
                }),
              ]}
              className="w-full overflow-hidden"
            >
              <CarouselContent>
                {productDetailData.product.images.map((image: Image) => (
                  <CarouselItem key={image.id}>
                    <div className="p-1">
                      <img
                        src={imgUrl + image.path}
                        alt={productDetailData.product.name}
                        loading="lazy"
                        decoding="async"
                        className="object-contain object-center"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
          <div className="w-full md:w-1/2">
            <h1 className="text-lg font-bold md:text-xl 2xl:text-2xl">
              {productDetailData.product.name}
            </h1>

            <h2 className="mt-3 font-semibold">
              {formatPrice(productDetailData.product.price ?? 0)}
            </h2>

            <Separator className="my-5" />

            <h3 className="my-4 font-semibold">
              {productDetailData.product.inventory} in stock
            </h3>

            <div className="mt-5 flex items-center justify-between">
              <ProductRatingStar
                rating={Number(productDetailData.product.rating)}
              />
              <FavouriteIcon
                productId={productDetailData.product.id}
                isFavourite={productDetailData.product.user.length > 0}
              />
            </div>

            <div className="mt-5">
              <AddToCartForm
                buyNowDisabled={productDetailData.product.status !== "ACTIVE"}
                productId={productDetailData.product.id}
                handleAddToCart={handleAddToCart}
              />
            </div>

            <Separator className="mt-5" />

            <div className="">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Description</AccordionTrigger>
                  <AccordionContent>
                    {productDetailData.product.description}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h1 className="pb-4 text-lg font-bold md:text-xl 2xl:text-2xl">
            More Products from Furniture Shop
          </h1>
          <ScrollArea className="">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {productsData.products.map((product: Product) => (
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
