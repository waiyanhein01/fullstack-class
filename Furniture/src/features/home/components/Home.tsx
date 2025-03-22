import { products } from "@/data/products";
import HeroSection from "./HeroSection";
import ProductCarouselSection from "./ProductCarouselSection";
import BlogCardSection from "./BlogCardSection";
import { posts } from "@/data/posts";
import Container from "@/components/layout/components/Container";
import ProductCardSection from "./ProductCardSection";

const blogSLiceCard = posts.slice(0, 3);
const productSlice = products.slice(0, 4);

const Home = () => {
  return (
    <section className="container mx-auto my-20 2xl:my-16">
      <Container>
        <HeroSection />
        <ProductCarouselSection products={products} />
        <ProductCardSection products={productSlice} />
        <BlogCardSection posts={blogSLiceCard} />
      </Container>
    </section>
  );
};

export default Home;
