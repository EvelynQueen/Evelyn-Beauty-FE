import axios from "./axiosInstance";
const getStaffAPI = async () => {
  const res = await axios.get("/auth/all");
  return res.data.accounts;
};
export default getStaffAPI;

export const addStaffAPI = async (data) => {
  const res = await axios.post("/auth/create", data);
  return res.data;
};

export const deleteStaffAPI = async (accountId) => {
  const res = await axios.delete(`/auth/delete/${accountId}`);
  return res.data;
};

export const addProductAPI = async (product, images) => {
  const formData = new FormData();

  formData.append("products", JSON.stringify([product]));

  images.forEach((img) => {
    formData.append("images", img);
  });

  const res = await axios.post("/products/importProduct", formData);
  return res.data;
};
export const deleteProductAPI = async (productId) => {
  const res = await axios.delete(
    `http://localhost:3000/api/products/deleteProduct?productId=${productId}`
  );
  return res.data.data;
};
