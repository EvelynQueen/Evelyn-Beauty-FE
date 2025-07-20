import axios from "./axiosInstance";

const paymentAPI = async (data) => {
  const res = await axios.post("/payment/create-payos", data);
  return res.data;
};

export default paymentAPI;

export const getPromotionAPI = async (items) => {
  const res = await axios.post("/promotion-programs", {
    items,
  });
  return res.data.data;
};

export const getShippingAPI = async (fullAddress) => {
  const res = await axios.post("/delivery/calculate-fee-v2", {
    address: fullAddress,
  });
  return res.data;
};
