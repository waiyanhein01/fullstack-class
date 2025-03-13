import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const HeroSection = () => {
  return (
    <section className="flex flex-col items-center justify-between lg:flex-row">
      <div className="min-w-2/5 space-y-4 text-center lg:text-left">
        <h1 className="text-primary text-4xl font-extrabold xl:text-5xl 2xl:text-7xl">
          Modern Interior Design Studio
        </h1>
        <p className="text-primary">
          Furniture is an essential components of any living space,providing
          functionality,comfort,and aesthetic appeal.
        </p>
        <div className="space-x-5">
          <Button
            className="rounded-full border bg-orange-300 px-8 py-6 font-bold hover:bg-orange-400"
            asChild
          >
            <Link to={""}>Shop Now</Link>
          </Button>

          <Button
            className="bg-background hover:bg-accent text-primary rounded-full border px-8 py-6 font-bold"
            asChild
          >
            <Link to={""}>Explore</Link>
          </Button>
        </div>
      </div>
      <div className="flex h-full min-w-3/5 justify-center">
        <img src="/images/couch.png" alt="couch" />
      </div>
    </section>
  );
};

export default HeroSection;
