import Title from "./Title";
import { Product } from "@/types";
import ProductCard from "./ProductCard";
interface ProductsProps {
  products: Product[];
}
const ProductCardSection = ({ products }: ProductsProps) => {
  return (
    <section className="mt-24">
      <Title
        title="Feature Products"
        href={`/products`}
        linkTitle="View All Products"
      />
      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductCardSection;
