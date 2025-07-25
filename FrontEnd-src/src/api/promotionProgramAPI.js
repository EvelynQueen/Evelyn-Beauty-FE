import axios from "./axiosInstance";

const getAllPromotionSF = async () => {
  const res = await axios.get(`/promotion-programs/os/on`);
  console.log("getAllPromotionSF response:", res.data);
  return res.data;
};

export default getAllPromotionSF;

export const addPromotionSF = async (promotionData) => {
    try {
      const res = await axios.post("/promotion-programs/create", promotionData);
      console.log("addPromotionSF response:", res.data);
      return { success: true, data: res.data };
    } catch (error) {
      console.error(
        "Lỗi khi tạo promotion:",
        error.response?.data || error.message
      );
      return { success: false, error: error.response?.data || error.message };
    }
  };
