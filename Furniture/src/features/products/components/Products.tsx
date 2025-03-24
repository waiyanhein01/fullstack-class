import { BreadCrumb } from "@/components/layout/components/BreadCrumb";
import Container from "@/components/layout/components/Container";
import { products } from "@/data/products";
import ProductsCard from "./ProductsCard";
import { ProductsPagination } from "./ProductsPagination";

const Products = () => {
  return (
    <section className="container mx-auto my-20">
      <Container>
        <BreadCrumb currentPage="Products" />

        <div className="flex w-full flex-col md:flex-row">
          <section className="w-full md:w-1/5">
            <div className="sticky top-20">
              <h1 className="">Filter</h1>
            </div>
          </section>
          <section className="w-full md:w-4/5">
            <h1 className="text-xl font-bold 2xl:text-2xl">All Products</h1>
            <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductsCard product={product} key={product.id} />
              ))}
            </div>
          </section>
        </div>

        <ProductsPagination />
      </Container>
    </section>
  );
};

export default Products;
