import { Link } from "react-router-dom";
import useProduct from "../hook/useProduct";
import { assets } from "../assets/assets";

const ProductItem = ({ productId, name, price, image }) => {
  const { currency } = useProduct();

  return (
    <Link
      to={`/products/${productId}`}
      className="cursor-pointer block rounded-xl hover:shadow-lg p-4 w-full h-full"
    >
      <div className="overflow-hidden rounded-xl aspect-square">
        <img
          className="w-full h-full hover:scale-110 transition duration-200 object-cover"
          src={image && image.length > 0 ? image[0] : assets.defaultImage}
          alt={name}
        />
      </div>
      <div className="text-left mt-3">
        <p className="text-sm font-medium text-gray-600 truncate">{name}</p>
        <p className="text-sm font-semibold text-gray-800">
          {Number(price).toLocaleString()} {currency}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
