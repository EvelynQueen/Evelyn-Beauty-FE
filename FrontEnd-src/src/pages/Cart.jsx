import { useEffect } from "react";
import QuantityButton from "../components/QuantityButton";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoSadOutline } from "react-icons/io5";
import Footer from "../components/Footer";
import useAuth from "../hook/useAuth";
import useCart from "../hook/useCart";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { IoIosArrowBack } from "react-icons/io";
import { BiSolidCart } from "react-icons/bi";

const Cart = () => {
  const { token, accountId } = useAuth();
  const {
    handleDeleteFromCart,
    handleGetCartItems,
    cartItems,
    selectedItems,
    setSelectedItems,
    selectedTotal,
  } = useCart();
  const countProduct = cartItems.map((item) => item.product.productId).length;
  const fetchCartItems = async () => {
    const res = await handleGetCartItems();
    if (!res.success) {
      switch (res.status) {
        case 403:
          toast.error("Session expired, please login again");
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

  const handleClick = async (productId, classificationId) => {
    const res = await handleDeleteFromCart(productId, classificationId);
    if (res) {
      toast.success("Delete from cart successfully!", {
        autoClose: 1000,
      });
    } else {
      toast.error("Failed to delete item from cart", {
        autoClose: 1000,
      });
    }
    fetchCartItems();
  };

  useEffect(() => {
    fetchCartItems();
  }, [token, accountId]);

  return (
    <div>
      {/* Cart - items */}
      <div className="w-full flex flex-col h-full mb-10">
        {/* Back to previous page */}
        <button
          onClick={() => window.history.back()}
          className="w-full flex flex-row justify-start items-center mb-5 caret-transparent cursor-pointer"
        >
          <IoIosArrowBack />
          <p className="text-sm sm:text-base md:text-xl ml-2">Back</p>
        </button>
        <hr className="w-full bg-gray-500 mb-5 caret-transparent" />
        {/* Title */}
        <div className="w-full flex flex-col items-start justify-center mb-10">
          <div className="w-full flex flex-row items-center justify-start gap-1 text-base md:text-xl caret-transparent">
            <BiSolidCart />
            <p>Cart</p>
          </div>
          <p className="text-sm md:text-base caret-transparent text-gray-600">
            You're have {countProduct} items in your cart
          </p>
        </div>
        {/* Cart-item */}
        <div className="flex flex-col gap-y-5 w-full h-full">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="flex w-full flex-row items-center justify-between gap-5 rounded-md border border-gray-300 p-4 hover:shadow-md"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-24 w-24 rounded-md border border-gray-200 object-cover"
                />

                <div className="flex w-full flex-col gap-3">
                  {/* Header */}
                  <div className="flex w-full flex-row justify-between text-sm font-semibold text-gray-600">
                    <div className="basis-1/3">Product</div>
                    <div className="basis-1/6 text-center">Price</div>
                    <div className="basis-1/6 text-center">Quantity</div>
                    <div className="basis-1/6 text-center">Delete</div>
                    <div className="basis-1/6 text-center text-transparent">
                      Select
                    </div>
                  </div>

                  {/* Item Info */}
                  <div className="flex w-full flex-row items-center justify-between">
                    <div className="basis-1/3 flex flex-col justify-center">
                      <div className="font-medium">{item.product.name}</div>
                      <div className="text-xs text-gray-500">
                        {item.classification.name}
                      </div>
                    </div>

                    <div className="basis-1/6 text-center font-bold">
                      {Number(item.product.price).toLocaleString()}
                    </div>

                    <div className="basis-1/6 flex justify-center">
                      <QuantityButton quantity={item.quantity} />
                    </div>

                    {/* Delete button */}
                    <RiDeleteBin6Line
                      onClick={() => {
                        handleClick(
                          item.product.productId,
                          item.classification.classificationId
                        );
                        console.log(
                          item.product.productId,
                          item.classification.classificationId
                        );
                      }}
                      className="basis-1/6 text-center text-red-500 cursor-pointer"
                    />

                    {/* Selected checkbox */}
                    <div className="basis-1/6 flex justify-center ">
                      <input
                        className="w-5 h-5 "
                        type="checkbox"
                        checked={selectedItems.includes(item.product.productId)}
                        onChange={() => {
                          setSelectedItems((prev) =>
                            prev.includes(item.product.productId)
                              ? prev.filter(
                                  (id) => id !== item.product.productId
                                )
                              : [...prev, item.product.productId]
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-y-5 my-20">
              <IoSadOutline className="text-gray-500 text-4xl sm:text-5xl md:text-6xl lg:text-7xl" />
              <p className="text-gray-500 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                Oops! It's empty here!
              </p>
              <Link to="/shopping">
                <button className="border border-gray-800 text-black px-4 py-2 rounded-md hover:scale-105 hover:bg-black hover:text-white transition-all duration-300 text-sm sm:text-base md:text-lg lg:text-xl">
                  Let's go for shopping
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Total cart */}
      <div className="w-1/5 flex flex-row items-end justify-around mb-20 sticky bottom-5 bg-gray-700 text-white py-1 px-2 rounded-2xl">
        <p className="font-bold text-base sm:text-xl md:text-2xl lg:text-3xl">
          Total
        </p>
        <p className="text-sm sm:text-base md:text-xl lg:text-2xl">
          {Number(selectedTotal).toLocaleString()}
        </p>
      </div>

      {/* Order button */}
      <div className="w-full">
        {selectedItems.length > 0 ? (
          <div className="w-full flex justify-end items-center gap-4 mb-20">
            <img src={assets.sale} alt="sale icon" className="w-1/15" />
            <p className="text:sm md:text-base lg:text-xl text-gray-600">
              Unlock more{" "}
              <span className="font-bold text-red-500">DISCOUNT</span> at
            </p>
            <Link
              to="/shipping-information"
              className="bg-black text-white px-4 py-2 text-sm sm:text-base md:text-lg rounded-md hover:scale-105 transition-transform duration-200"
            >
              Order
            </Link>
          </div>
        ) : (
          <p className="w-full flex justify-end items-center mb-20 gap-1 text-sm sm:text-base md:text-lg rounded-md text-gray-600">
            Please select items to continue to{" "}
            <span className="font-bold text-base md:text-xl lg:text-2xl">
              Order
            </span>
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
