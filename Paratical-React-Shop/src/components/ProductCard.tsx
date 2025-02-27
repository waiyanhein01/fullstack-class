interface ProductCardTypes {
  //   id: number;
  title: string;
  price: number;
  image: string;
}

const ProductCard = ({ title, price, image }: ProductCardTypes) => {
  return (
    <div className="p-4 ">
      <div className="bg-white rounded-lg shadow-md p-4 border flex flex-col grow h-[340px]">
          <img
            src={image}
            alt={title}
            className="w-full h-40 object-contain mb-4"
          />
          <h2 className="text-base font-bold line-clamp-2">{title}</h2>
          <p className="text-gray-500">${price}</p>

          <button className="mt-auto bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded">Add to Cart</button>
        </div>
    </div>
  );
};

export default ProductCard;
