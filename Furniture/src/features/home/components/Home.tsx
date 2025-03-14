import { products } from "@/data/products";
import HeroSection from "./HeroSection";
import ProductCarouselSection from "./ProductCarouselSection";
import BlogCardSection from "./BlogCardSection";
import { posts } from "@/data/posts";

const blogSLiceCard = posts.slice(0, 3);

const Home = () => {
  return (
    <section className="container mx-auto my-20 2xl:my-16">
      <div className="mx-5 space-y-10 lg:mx-20 2xl:mx-0 2xl:space-y-32">
        <HeroSection />
        <ProductCarouselSection products={products} />
        <BlogCardSection posts={blogSLiceCard} />
      </div>
    </section>
  );
};

export default Home;
