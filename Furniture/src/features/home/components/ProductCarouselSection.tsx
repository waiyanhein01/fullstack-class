import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@/types";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router";

interface ProductProps {
  products: Product[];
}

const imgUrl = import.meta.env.VITE_IMG_URL;

const ProductCarouselSection = ({ products }: ProductProps) => {
  return (
    <section>
      <Carousel
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <div className="flex gap-5">
                <img
                  src={imgUrl + product?.images[0].path}
                  className="size-28 rounded-md border object-contain object-center"
                  loading="lazy"
                  decoding="async"
                  alt={product.name}
                />
                <div className="space-y-2">
                  <h1 className="text-base font-semibold">{product.name}</h1>
                  <p className="text-muted-foreground line-clamp-2 text-sm">
                    {product.description}
                  </p>
                  <Link
                    to={`/product/${product.id}`}
                    className="text-primary text-sm hover:underline"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>
    </section>
  );
};

export default ProductCarouselSection;
