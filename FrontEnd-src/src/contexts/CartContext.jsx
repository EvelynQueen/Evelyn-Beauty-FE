// src/context/CartContext.tsx
import { createContext, useState } from "react";
import { addToCartAPI, deleteCartItemAPI, getCartAPI } from "../api/getCartAPI";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartId, setCartId] = useState("");

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
      return "You've must login first!";
    }

    if (!productId || !classificationId || !quantity) {
      return "Error: Product or classification or quantity not found";
    }

    try {
      await addToCartAPI(currentCartId, productId, classificationId, quantity);
      return null;
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 403:
            return "You've must login first!";
          case 400:
            return "Error: Amount of product is not enough";
          default:
            return "Error: Failed to add to cart";
        }
      }
    }
  };

  const handleDeleteFromCart = async (productId, classificationId) => {
    const currentCartId = await handleGetCart();
    if (!currentCartId || currentCartId === "undefined") {
      return "Error: Cart not found";
    }

    try {
      await deleteCartItemAPI(currentCartId, productId, classificationId);
      return "Delete from cart successfully";
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  const value = {
    cartId,
    handleGetCart,
    handleAddToCart,
    handleDeleteFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
