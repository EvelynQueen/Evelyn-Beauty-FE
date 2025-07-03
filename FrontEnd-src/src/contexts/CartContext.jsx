// src/context/CartContext.tsx
import { createContext, useEffect, useState } from "react";
import { addToCartAPI, getCartAPI, getCartItemsAPI } from "../api/getCartAPI";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartId, setCartId] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const handleGetCart = async () => {
    if (cartId) return cartId;

    try {
      const res = await getCartAPI();

      if (!res || res === "undefined") {
        return null;
      }

      setCartId(res);
      return res;
    } catch (error) {
      console.error("Failed to get cart:", error);
      return null;
    }
  };

  const handleAddToCart = async (productId, classificationId, quantity) => {
    const currentCartId = await handleGetCart();

    if (!currentCartId || currentCartId === "undefined") {
      return "Error: Cart not found";
    }

    if (!productId || !classificationId || !quantity) {
      return "Error: Product or classification or quantity not found";
    }

    try {
      await addToCartAPI(currentCartId, productId, classificationId, quantity);
      return null;
    } catch (error) {
      console.log(error.response.data.message);
      return "Error: Failed to add to cart";
    }
  };

  const handleGetCartCount = async () => {
    try {
      const items = await getCartItemsAPI();
      const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(totalQuantity);
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
    }
  };

  useEffect(() => {
    handleGetCartCount();
  }, []);

  const value = {
    cartId,
    handleGetCart,
    handleAddToCart,
    cartCount,
    handleGetCartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
