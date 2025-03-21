import { Product } from "@/types";
import Title from "./Title"
import { Link } from "react-router";
interface ProductsProps {
  products: Product[];
}

const ProductCardSection = ({products}:ProductsProps) => {
  return (
    <section className="mt-24">
      <Title title="Feature Product" href={`/blogs`} linkTitle="View All Posts" />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {products.map((product) => (
          <Link key={product.id} to={`/blogs/${product.id}`} className="">
            <img src={product.images[0]} alt="Blog Image" className="w-full rounded-2xl" />
            <h1 className="ml-4 text-base font-semibold line-clamp-1 my-2">{product.name}</h1>
            <h2 className="ml-4 text-sm">${product.price}</h2>
            
          </Link>
        ))}
      </div>
    </section>
  )
}

export default ProductCardSection