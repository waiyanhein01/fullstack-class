import { userProfileQuery } from "@/api/query";
import { BreadCrumb } from "@/components/layout/components/BreadCrumb";
import Container from "@/components/layout/components/Container";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const Favourite = () => {
  const { data } = useSuspenseQuery(userProfileQuery());
  console.log(data, "data");
  const imgUrl = import.meta.env.VITE_IMG_URL;

  return (
    <section className="container mx-auto my-20">
      <Container>
        <BreadCrumb currentPage="Favourite" />
        <h1 className="mb-8 text-xl font-bold 2xl:text-2xl">My Favourite</h1>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {data.user.products.length > 0 ? (
            data.user.products.map((product: Product) => (
              <Card key={product.id} className="overflow-hidden">
                <CardContent>
                  <Link to={`/products/${product.id}`} className="">
                    <img
                      src={imgUrl + product.images[0].path}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      className="object-contain object-center"
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
              </Card>
            ))
          ) : (
            <h1 className="mb-8">
              You haven't saved any items to your wishlist yet. Start shopping
              and add your favorite items to your wishlist.
            </h1>
          )}
        </div>
      </Container>
    </section>
  );
};

export default Favourite;
