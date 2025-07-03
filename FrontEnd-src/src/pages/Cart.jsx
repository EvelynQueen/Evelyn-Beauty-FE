import { useEffect, useState } from "react";
import { getCartItemsAPI } from "../api/getCartAPI";
import QuantityButton from "../components/QuantityButton";
import { RiDeleteBin6Line } from "react-icons/ri";
import Footer from "../components/Footer";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const fetchCartItems = async () => {
    const response = await getCartItemsAPI();
    setCartItems(response.product);
    return cartItems;
  };
  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div>
      <div className="w-full flex flex-col h-full mb-20">
        <div className="flex flex-col gap-y-5 w-full h-full">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex w-full flex-row items-center justify-between gap-5 rounded-md border border-gray-300 p-4"
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

                  <RiDeleteBin6Line className="basis-1/6 text-center text-red-500 hover:underline cursor-pointer" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
