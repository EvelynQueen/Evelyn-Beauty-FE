import axios from "axios";
const allProductAPI = async (categoryId, page = 1, limit = 10) => {
  let url = `http://localhost:3000/api/products/category?category=${categoryId}&page=${page}&limit=${limit}`;
  const res = await axios.get(url);
  return res.data.data;
};
export default allProductAPI;

export const allProductsDetailAPI = async (productId) => {
  const res = await axios.get(
    `http://localhost:3000/api/products/${productId}/detail`
  );
  return res.data.data;
};
