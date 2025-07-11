import { useEffect, useState } from "react";
import { getCartItemsAPI } from "../api/getCartAPI";
import QuantityButton from "../components/QuantityButton";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoSadOutline } from "react-icons/io5";
import Footer from "../components/Footer";
import useAuth from "../hook/useAuth";
import useCart from "../hook/useCart";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { token, accountId } = useAuth();
  const { handleDeleteFromCart } = useCart();

  const fetchCartItems = async () => {
    if (!token || !accountId) {
      setCartItems([]);
      return [];
    }
    try {
      const response = await getCartItemsAPI();
      setCartItems(response.product);
      return response.product;
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
      setCartItems([]);
      return [];
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
    if (token && accountId) {
      fetchCartItems();
    } else {
      setCartItems([]);
    }
  }, [token, accountId]);

  return (
    <div>
      <div className="w-full flex flex-col h-full mb-20">
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

                    <div className="basis-1/6">
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
      <Footer />
    </div>
  );
};

export default Cart;
