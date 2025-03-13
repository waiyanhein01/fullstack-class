import { Link } from "react-router";

const Home = () => {
  return (
    //#3b5d50
    <section className=" container mx-auto my-24">
      <div className="lg:flex-row flex flex-col items-center justify-between mx-5 lg:mx-20 2xl:mx-0">
        <div className=" space-y-4">
          <h1 className="">Modern Interior Design Studio</h1>
          <p className="">
            Furniture is an essential components of any living space,providing
            functionality,comfort,and aesthetic appeal.
          </p>
          <div className="">
            <button className="border border-slate-400 px-4 py-2 rounded-md">
              <Link to={""}>Shop Now</Link>
            </button>

            <button className="border border-slate-400 px-4 py-2 rounded-md">
              <Link to={""}>Explore</Link>
            </button>
          </div>
        </div>
        <div className=" w-full h-full flex justify-center">
          <img src="/images/couch.png" alt="couch" />
        </div>
      </div>
    </section>
  );
};

export default Home;
