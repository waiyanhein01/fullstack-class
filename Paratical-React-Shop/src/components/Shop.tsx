import useSWR from "swr";
import ProductCard from "./ProductCard";
import SkeletonLoader from "./SkeletonLoader";

const Shop = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, isLoading } = useSWR(
    "https://fakestoreapi.com/products",
    fetcher
  );

  return (
    <section className="container mx-auto">
      {isLoading ? (
        <SkeletonLoader {...data} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-5 w-full">
          {data?.map((item: any) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Shop;
