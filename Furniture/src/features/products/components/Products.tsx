import { BreadCrumb } from "@/components/layout/components/BreadCrumb";
import Container from "@/components/layout/components/Container";
import ProductsCard from "./ProductsCard";
import { ProductFilter } from "./ProductFilter";
import { useInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query";
import { categoryTypeQuery, productsInfiniteQuery } from "@/api/query";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";

const Products = () => {
  const { data: catTypeData } = useSuspenseQuery(categoryTypeQuery());
  const {
    status,
    data,
    isFetching,
    isFetchingNextPage,
    // isFetchingPreviousPage,
    fetchNextPage,
    // fetchPreviousPage,
    hasNextPage,
    // hasPreviousPage,
    error,
  } = useInfiniteQuery(productsInfiniteQuery());

  const allProducts = data?.pages.flatMap((page) => page.products) ?? [];

  return status === "pending" ? (
    <p>Loading..</p>
  ) : status === "error" ? (
    <p>Blog Error:{error.message}</p>
  ) : (
    <section className="container mx-auto my-20">
      <Container>
        <BreadCrumb currentPage="Products" />

        <div className="flex w-full flex-col md:flex-row">
          <section className="w-full md:w-1/5">
            <div className="sticky top-20">
              <h1 className="">
                <ProductFilter filterLists={catTypeData} />
              </h1>
            </div>
          </section>
          <section className="w-full md:w-4/5">
            <h1 className="text-xl font-bold 2xl:text-2xl">All Products</h1>
            <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {allProducts.map((product: Product) => (
                <ProductsCard product={product} key={product?.id} />
              ))}
            </div>
          </section>
        </div>
        <div className="my-4 flex justify-center">
          <Button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            variant={!hasNextPage ? "ghost" : "secondary"}
          >
            {isFetchingNextPage
              ? "Loading..."
              : hasNextPage
                ? "Load More"
                : "Nothing more to load"}
          </Button>
        </div>
        <div className="">
          {isFetching && !isFetchingNextPage ? "Background Updating..." : null}
        </div>

        {/* <ProductsPagination /> */}
      </Container>
    </section>
  );
};

export default Products;
