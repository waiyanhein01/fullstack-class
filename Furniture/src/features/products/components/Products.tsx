import { BreadCrumb } from "@/components/layout/components/BreadCrumb";
import Container from "@/components/layout/components/Container";
import ProductsCard from "./ProductsCard";
import { ProductFilter } from "./ProductFilter";
import { useInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query";
import {
  categoryTypeQuery,
  productsInfiniteQuery,
  queryClient,
} from "@/api/query";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { useSearchParams } from "react-router";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // get url params
  const rawCategory = searchParams.get("categories");
  const rawType = searchParams.get("types");

  // decode validation covert string to array
  const selectedCategory = rawCategory
    ? decodeURIComponent(rawCategory)
        .split(",")
        .map((cat) => Number(cat.trim()))
        .filter((cat) => !isNaN(cat))
        .map((cat) => cat.toString())
    : [];

  const selectedType = rawType
    ? decodeURIComponent(rawType)
        .split(",")
        .map((type) => Number(type.trim()))
        .filter((type) => !isNaN(type))
        .map((type) => type.toString())
    : [];

  // array to string
  const category =
    selectedCategory.length > 0 ? selectedCategory.join(",") : null;
  const type = selectedType.length > 0 ? selectedType.join(",") : null;

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
    refetch,
  } = useInfiniteQuery(productsInfiniteQuery(category, type));

  const allProducts = data?.pages.flatMap((page) => page.products) ?? [];

  const productFilterHandler = (categories: string[], types: string[]) => {
    const newParams = new URLSearchParams();
    if (categories.length > 0)
      newParams.set("categories", categories.join(","));
    if (types.length > 0) newParams.set("types", types.join(","));

    // update url & trigger via query key
    setSearchParams(newParams);
    // cancel In-flight queries
    queryClient.cancelQueries({ queryKey: ["products", "infinite"] });
    // clear cache
    queryClient.removeQueries({ queryKey: ["products", "infinite"] });
    // refetch
    refetch();
  };

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
                <ProductFilter
                  filterLists={catTypeData}
                  productFilterHandler={productFilterHandler}
                  selectedCategory={selectedCategory}
                  selectedType={selectedType}
                />
              </h1>
            </div>
          </section>
          <section className="w-full md:w-4/5">
            <section className="">
              <h1 className="text-xl font-bold 2xl:text-2xl">All Products</h1>
              <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {allProducts.map((product: Product) => (
                  <ProductsCard product={product} key={product?.id} />
                ))}
              </div>
            </section>
            <div className="my-4 flex justify-center">
              <Button
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
                variant={!hasNextPage ? "ghost" : "outline"}
              >
                {isFetchingNextPage
                  ? "Loading..."
                  : hasNextPage
                    ? "See More"
                    : "Nothing more to show"}
              </Button>
            </div>
            <div className="">
              {isFetching && !isFetchingNextPage
                ? "Background Updating..."
                : null}
            </div>
          </section>
        </div>

        {/* <ProductsPagination /> */}
      </Container>
    </section>
  );
};

export default Products;
