import { BreadCrumb } from "@/components/layout/components/BreadCrumb";
import Container from "@/components/layout/components/Container";
import { products } from "@/data/products";
import ProductsCard from "./ProductsCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const ProductsDetail = () => {
  return (
    <div className="container mx-auto my-20 overflow-hidden">
      <Container>
        <BreadCrumb
          currentPage="ProductsDetail"
          links={[{ path: "/products", title: "Products" }]}
        />
        <div className="">For products Details</div>
        <div className="mt-8">
          <h1 className="pb-4 text-xl font-bold 2xl:text-2xl">
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
