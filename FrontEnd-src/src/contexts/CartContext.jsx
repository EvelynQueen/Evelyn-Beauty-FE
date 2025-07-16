// src/context/CartContext.tsx
import { createContext, useMemo, useState } from "react";
import {
  addToCartAPI,
  deleteCartItemAPI,
  getCartAPI,
  getCartItemsAPI,
} from "../api/getCartAPI";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartId, setCartId] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
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
      return { success: true, status: 200 };
    } catch (error) {
      if (error.response) {
        if (!error.response?.status) {
          return { success: false, status: 0 };
        } else {
          return {
            success: false,
            status: error.status,
          };
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

  const handleGetCartItems = async () => {
    try {
      const res = await getCartItemsAPI();
      setCartItems(res.product);
      return { success: true, status: 200 };
    } catch (error) {
      if (!error.response?.status) {
        return { success: false, status: 0 };
      } else {
        return {
          success: false,
          status: error.status,
        };
      }
    }
  };

  const selectedCartItems = useMemo(
    () =>
      cartItems.filter((item) =>
        selectedItems.includes(item.product.productId)
      ),
    [cartItems, selectedItems]
  );

  const selectedCartItemsForDiscount = useMemo(
    () =>
      selectedCartItems.map((item) => ({
        productId: item.product.productId,
        classificationId: item.classification.classificationId,
        quantity: item.quantity,
      })),
    [selectedCartItems]
  );

  const selectedTotal = useMemo(
    () =>
      selectedCartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ),
    [selectedCartItems]
  );

  const value = {
    cartId,
    handleGetCart,
    handleAddToCart,
    handleDeleteFromCart,
    cartItems,
    handleGetCartItems,
    selectedItems,
    setSelectedItems,
    selectedTotal,
    selectedCartItemsForDiscount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
