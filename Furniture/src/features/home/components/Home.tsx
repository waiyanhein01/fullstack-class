import HeroSection from "./HeroSection";
import ProductCarouselSection from "./ProductCarouselSection";
import BlogCardSection from "./BlogCardSection";
import Container from "@/components/layout/components/Container";
import ProductCardSection from "./ProductCardSection";

import { useLoaderData } from "react-router";
const Home = () => {
  const { productsData, postsData } = useLoaderData();
  return (
    <section className="container mx-auto my-20 2xl:my-16">
      <Container>
        <HeroSection />
        <ProductCarouselSection products={productsData.products} />
        <ProductCardSection products={productsData.products} />
        <BlogCardSection posts={postsData.posts} />
      </Container>
    </section>
  );
};

export default Home;
