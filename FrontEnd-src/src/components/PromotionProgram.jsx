import axios from "./axiosInstance";
import { toast } from "react-toastify";

export const getAllPromotionSF = async () => {
  try {
    const res = await axios.get(`/promotion-programs/os/on`);
    if (res.data.success) {
      console.log("getAllPromotionSF response:", res.data);
      return res.data;
    } else {
      switch (res.data.status) {
        case 404:
          toast.error("No promotion programs found.");
          break;
        case 500:
          toast.error("Server error. Please try again later.");
          break;
        default:
          toast.error("An unexpected error occurred.");
      }
      return res.data;
    }
  } catch (error) {
    console.error("Lỗi khi lấy promotion:", error);
    toast.error("Something went wrong. Please try again.");
    throw error;
  }
};

export const handleAddPromotion = async (promotionData) => {
  try {
    const res = await axios.post("/promotion-programs", promotionData);
    if (res.data.success) {
      toast.success("Promotion added successfully!");
      console.log("handleAddPromotion response:", res.data);
      return res.data;
    } else {
      switch (res.data.status) {
        case 400:
          toast.error("Invalid promotion data. Please check your input.");
          break;
        case 500:
          toast.error("Server error. Please try again later.");
          break;
        default:
          toast.error("An unexpected error occurred.");
      }
      return res.data;
    }
  } catch (error) {
    console.error("Lỗi khi thêm promotion:", error);
    toast.error("Something went wrong. Please try again.");
    throw error;
  }
};

export const handleDeletePromotion = async (programId) => {
  try {
    const res = await axios.delete(`/promotion-programs/programId`, {
      params: { programId },
    });

    if (res.data.success) {
      toast.success("Promotion program deleted successfully!");
      console.log("Deleted promotion ID:", programId);
      return res.data;
    } else {
      switch (res.data.status) {
        case 400:
          toast.error("Invalid request. Please check the program ID.");
          break;
        case 404:
          toast.error("Promotion program not found.");
          break;
        case 500:
          toast.error("Server error. Please try again later.");
          break;
        default:
          toast.error("An unexpected error occurred.");
      }
      return res.data;
    }
  } catch (error) {
    console.error("Lỗi khi xoá promotion:", error);
    toast.error("Something went wrong. Please try again.");
    throw error;
  }
};
