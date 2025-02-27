import useSWR from "swr";
import ProductCard from "./ProductCard";

const Shop = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const {data} = useSWR("https://fakestoreapi.com/products",fetcher);



  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">{data?.map((item: any) => <ProductCard key={item.id} {...item}/>)}</div>
    </div>
  );
};

export default Shop;
