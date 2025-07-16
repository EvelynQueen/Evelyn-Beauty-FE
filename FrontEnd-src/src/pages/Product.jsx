import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { allProductsDetailAPI } from "../api/allProductAPI";
import RatingStar from "../components/RatingStart";
import useProduct from "../hook/useProduct";
import QuantityButton from "../components/QuantityButton";
import useCart from "../hook/useCart";
import { toast } from "react-toastify";
import Footer from "../components/Footer";

const Product = () => {
  const { currency } = useProduct();
  const { productId } = useParams();
  const [productDetail, setProductDetail] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { handleAddToCart } = useCart();

  const fetchProductDetail = async () => {
    const res = await allProductsDetailAPI(productId);
    setProductDetail(res);
    setImage(res.images[0]);
    return res;
  };

  const handleClick = async () => {
    const res = await handleAddToCart(
      productId,
      type.classificationId,
      quantity
    );
    if (res.success) {
      toast.success("Added  to cart successfully!", {
        autoClose: 1000,
      });
    } else {
      switch (res.status) {
        case 403:
          toast.error("Don't have enough amount in stock");
          break;
        case 0:
          toast.error("Something went wrong, please login again");
          break;
        default:
          toast.error("Something went wrong, please login again");
          break;
      }
    }
  };

  useEffect(() => {
    fetchProductDetail();
  }, [productId]);

  return productDetail ? (
    <div className="flex flex-col h-full">
      <div className="border-t-2 border-gray-300 pt-10 transition-opacity ease-in duration-500 opacity-100 mb-20">
        {/* PRoduct data */}
        <div className="flex gap-4 sm:gap-12 flex-col sm:flex-row">
          {/* Product image */}
          <div className="flex flex-col sm:flex-row gap-4 h-auto w-full sm:h-[500px] sm:w-1/2">
            {/* Thumbnail list */}
            <div className="flex flex-row sm:flex-col gap-2 overflow-x-auto overflow-y-hidden sm:overflow-y-auto sm:overflow-x-hidden sm:h-full">
              {productDetail.images.map((item, index) => (
                <img
                  onClick={() => {
                    setImage(item);
                    console.log("Selected type:", item.name);
                  }}
                  src={item}
                  key={index}
                  alt={`${productDetail.name} ${index + 1}`}
                  className="w-20 sm:w-full sm:h-24 object-cover rounded cursor-pointer flex-shrink-0 hover:scale-105 transition-transform duration-100"
                />
              ))}
            </div>

            {/* Main image */}
            <div className="w-full sm:w-[80%] h-full">
              <img
                src={image}
                alt="Selected"
                className="w-full h-full object-contain rounded "
              />
            </div>
          </div>

          {/* Product information */}
          <div className="flex flex-col w-full flex-1 sm:h-[500px] ">
            {/* Brand */}
            <p className="text-sm md:text-base lg:text-xl font-bold text-red-800 mb-3">
              {productDetail.brand}
            </p>
            {/* Name */}
            <p className="text-black text-base sm:text-xl md:text-2xl lg:text-3xl mb-3">
              {productDetail.name}
            </p>
            {/* Category */}
            <p className="text-gray-500 text-sm md:text-base mb-3">
              {productDetail.categories[0].name} products
            </p>
            {/* Rating */}
            <div className="flex flex-col sm:flex-row justify-start gap-4 mb-3 text-sm md:text-base">
              {/* Rating block */}
              <div className="flex flex-row items-center gap-2 ">
                <RatingStar />
                <p className="text-gray-600">
                  {Number(productDetail.averageRating).toFixed(2)}
                </p>
              </div>
              {/* Origin block */}
              <div className="flex flex-row items-center gap-2">
                <p className="text-black">Origin:</p>
                <p className="text-gray-600">{productDetail.origin}</p>
              </div>
            </div>
            {/* Price */}
            <p className="text-red-800 text-sm sm:text-base md:text-xl lg:text-2xl font-bold mb-5">
              {Number(productDetail.price).toLocaleString()} {currency}
            </p>

            <hr className="w-full mb-5 border-gray-300" />

            {/* Categorize */}
            <div className="flex flex-col mb-3 text-sm md:text-base">
              <p className="mb-3">Select type</p>
              <div className="flex gap-2 mb-3">
                {productDetail.classifications.map((item, index) => (
                  <button
                    onClick={() => {
                      setType(item);
                      console.log("Selected type:", item.name);
                    }}
                    className={`py-2 px-4 bg-white cursor-pointer border rounded-sm text-sm md:text-base ${
                      item.name === type.name
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                    key={index}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
              {/* Quantity */}
              <div className="flex justify-start">
                {" "}
                <QuantityButton quantity={quantity} setQuantity={setQuantity} />
              </div>
            </div>

            {/* Add to cart */}
            <div className="flex flex-col w-1/2">
              <button
                disabled={!type?.classificationId}
                className={`py-2 px-4 rounded-md ${
                  !type?.classificationId
                    ? "bg-gray-500 cursor-not-allowed text-gray-400"
                    : "bg-black text-white cursor-pointer"
                }`}
                onClick={handleClick}
              >
                Add to cart
              </button>
            </div>

            {/* Policy */}
            <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
              <p>100% original product.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
