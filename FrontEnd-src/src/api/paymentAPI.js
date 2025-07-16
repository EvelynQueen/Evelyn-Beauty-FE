import axios from "./axiosInstance";

const paymentAPI = async ({ profileId, promotionProgramId, items }) => {
  const res = await axios("/payment/create-payos", {
    profileId,
    promotionProgramId,
    items,
  });
  return res.data;
};

export default paymentAPI;

export const getPromotionAPI = async (items) => {
  const res = await axios.post("/promotion-programs", {
    items,
  });
  return res.data.data;
};
