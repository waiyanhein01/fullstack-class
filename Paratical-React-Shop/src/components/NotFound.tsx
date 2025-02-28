import { Link } from "react-router";

const NotFound = () => {
  return (
    <section className=" text-center flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl md:text-5xl font-bold text-center">
        404 Not Found
      </h1>
      <p className="text-center md:text-lg mt-3 text-neutral-600">
        Oops! The page you are looking for does not exist.
      </p>
      <div className="mt-5">
        <Link
          to="/"
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded"
        >
          Go Back Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
