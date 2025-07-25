import axios from "./axiosInstance";

const getAllPromotionSF = async () => {
  const res = await axios.get(`/promotion-programs/os/on`);
  console.log("getAllPromotionSF response:", res.data);
  return res.data;
};
export default getAllPromotionSF;

export const handleAddPromotion = async (promotionData) => {
  try {
    const res = await axios.post("/promotion-programs", promotionData);
    console.log("handleAddPromotion response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi thêm promotion:", error);
    throw error;
  }
};
