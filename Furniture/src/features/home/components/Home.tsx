import HeroSection from "./HeroSection";
import ProductCarouselSection from "./ProductCarouselSection";
import BlogCardSection from "./BlogCardSection";
import Container from "@/components/layout/components/Container";
import ProductCardSection from "./ProductCardSection";

import { posts } from "@/data/posts";
import { products } from "@/data/products";
import { useLoaderData } from "react-router";

const blogSLiceCard = posts.slice(0, 3);
const productSlice = products.slice(0, 4);

const Home = () => {
  const { productsData, postsData } = useLoaderData();
  console.log(productsData, postsData);
  return (
    <section className="container mx-auto my-20 2xl:my-16">
      <Container>
        <HeroSection />
        <ProductCarouselSection products={productsData.products} />
        <ProductCardSection products={productSlice} />
        <BlogCardSection posts={blogSLiceCard} />
      </Container>
    </section>
  );
};

export default Home;
