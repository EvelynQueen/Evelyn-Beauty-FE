import axios from "./axiosInstance";

export const getCartAPI = async () => {
  const accountId = localStorage.getItem("accountId");
  if (!accountId) throw new Error("No accountId found in localStorage");

  const response = await axios.post("/carts/getByAccount", { accountId });
  console.log("Cart API response:", response.data);

  return response.data.cartId; // ✅ đổi từ cartID sang cartId
};

export const getCartItemsAPI = async () => {
  const response = await axios.get("/cart-items");
  console.log("Cart items API response:", response.data);
  return response.data;
};

export const addToCartAPI = (cartId, productId, classificationId, quantity) => {
  if (!cartId || !productId || !classificationId || !quantity) {
    throw new Error("addToCartAPI");
  }
  console.log("Add to cart params:", {
    cartId,
    productId,
    classificationId,
    quantity,
  });
  return axios.post("/cart-items/add", {
    cartId,
    productId,
    classificationId,
    quantity,
  });
};
