import { useEffect } from "react";
import QuantityButton from "../components/QuantityButton";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoSadOutline } from "react-icons/io5";
import Footer from "../components/Footer";
import useAuth from "../hook/useAuth";
import useCart from "../hook/useCart";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
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
        case 0:
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

        {/* Body */}
        <div className="w-full flex flex-col md:flex-row justify-center items-center md:justify-between md:items-start gap-5">
          {/* Cart Item */}
          <div className="flex-[5] flex flex-col gap-y-5 h-full">
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

                      <div className="basis-1/6 flex justify-center">
                        <RiDeleteBin6Line
                          onClick={() =>
                            handleClick(
                              item.product.productId,
                              item.classification.classificationId
                            )
                          }
                          className="text-red-500 cursor-pointer"
                        />
                      </div>

                      <div className="basis-1/6 flex justify-center">
                        <input
                          className="w-5 h-5"
                          type="checkbox"
                          checked={selectedItems.includes(
                            item.product.productId
                          )}
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

          <div className="flex-[2] flex flex-col justify-between">
            <div className="w-full rounded-md border border-gray-300 p-4 flex flex-col justify-between gap-6">
              {/* Total amount */}
              <div className="w-full h-13 flex flex-row justify-between items-center">
                <p className="font-semibold text-sm sm:text-base md:text-xl lg:text-2xl">
                  Total
                </p>
                <p className="text-sm sm:text-base md:text-xl text-red-600">
                  {selectedItems.length > 0
                    ? `${Number(selectedTotal).toLocaleString()} VND`
                    : "0 VND"}
                </p>
              </div>

              {/* Continue button */}
              <div className="w-full flex justify-center">
                {selectedItems.length > 0 ? (
                  <Link
                    to="/shipping-information"
                    className="bg-black text-white px-20 py-2 text-sm sm:text-base md:text-lg rounded-md hover:scale-105 transition-transform duration-200"
                  >
                    Continue
                  </Link>
                ) : (
                  <button
                    disabled
                    className="bg-gray-300 text-white px-20 py-2 text-sm sm:text-base md:text-lg rounded-md cursor-not-allowed opacity-60"
                  >
                    Continue
                  </button>
                )}
              </div>
            </div>

            <p className="w-full text-sm md:text-base">
              <span className="font-semibold">Shipping fees</span> and{" "}
              <span className="font-semibold">discounts</span> are not included.
              Continue to unlock better deals.
              <span className="text-red-600 font-bold">*</span>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
