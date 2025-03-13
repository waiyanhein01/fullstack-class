import HeroSection from "./HeroSection";
import ProductCarouselSection from "./ProductCarouselSection";

const Home = () => {
  return (
    <section className="container mx-auto my-24">
      <div className="mx-5 lg:mx-20 2xl:mx-0">
        <HeroSection />
        <ProductCarouselSection/>
      </div>
    </section>
  );
};

export default Home;
