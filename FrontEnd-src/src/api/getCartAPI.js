import axios from "./axiosInstance";

export const getCartAPI = async () => {
  const accountId = localStorage.getItem("accountId");
  if (!accountId) throw new Error("No accountId found in localStorage");

  const response = await axios.post("/carts/getByAccount", { accountId });

  return response.data.cartId;
};

export const getCartItemsAPI = async () => {
  const response = await axios.get("/cart-items");
  return response.data;
};

export const addToCartAPI = async (
  cartId,
  productId,
  classificationId,
  quantity
) => {
  if (!cartId || !productId || !classificationId || !quantity) {
    throw new Error("addToCartAPI");
  }

  const response = await axios.post("/cart-items/add", {
    cartId,
    productId,
    classificationId,
    quantity,
  });

  return response.data;
};

export const deleteCartItemAPI = async (
  cartId,
  productId,
  classificationId
) => {
  const response = await axios.delete("/cart-items/delete", {
    data: {
      cartId,
      productId,
      classificationId,
    },
  });
  return response.data;
};
