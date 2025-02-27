import { Link } from "react-router";

const Home = () => {
  return (
    <section className=" text-center">
      <h1 className="text-3xl font-bold text-center">
        Welcome to Our Fashion Shop
      </h1>
      <p className="text-center text-lg mt-3">
        This is simple landing page with React,TypeScript Vite and Tailwind CSS.
      </p>
      <div className="mt-5">
        <Link to="/shop" className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded ">
          Get Started
        </Link>
      </div>
    </section>
  );
};

export default Home;
