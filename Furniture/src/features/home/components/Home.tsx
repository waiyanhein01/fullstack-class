import { products } from "@/data/products";
import HeroSection from "./HeroSection";
import ProductCarouselSection from "./ProductCarouselSection";

const Home = () => {
  return (
    <section className="container mx-auto 2xl:my-16 my-20">
      <div className="mx-5 lg:mx-20 2xl:mx-0">
        <HeroSection />
        <ProductCarouselSection products={products} />
      </div>
    </section>
  );
};

export default Home;
