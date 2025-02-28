interface SkeletonLoaderProps {
  count?: number;
}
const SkeletonLoader = ({ count = 12 }: SkeletonLoaderProps) => {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-5 w-full">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="">
          <div className="bg-white rounded-lg shadow-md p-4 border flex flex-col grow h-[340px] animate-pulse">
            <div className="w-full h-40 bg-gray-300 rounded mb-4"></div>
            <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="mt-auto bg-gray-300 rounded h-10 w-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
