import React from "react";
import axios from "../api/axiosInstance";

// Hàm lấy danh sách đơn support (dùng cho staff/founder)
export const getAllSupportRequests = async () => {
  try {
    const res = await axios.get("/supports");
    return { success: true, data: res.data };
  } catch (error) {
    console.error("Lỗi lấy danh sách support:", error);
    return { success: false, error };
  }
};

// Hàm xử lý đơn support (giữ lại cho các action khác)
export const handleSupportRequest = async (supportId, action) => {
  // action: 'resolve', 'reject', ...
  // TODO: Gọi API thực tế xử lý đơn support ở đây
  console.log(`Xử lý supportId: ${supportId}, action: ${action}`);
  return { success: true };
};

// Hàm resolve đơn support (staff nhập nội dung xử lý)
export const handleSupportResolve = async (supportId, resolveContent) => {
  try {
    // Giả định API: PUT /supports/resolve
    const res = await axios.put("/supports/resolve", {
      supportId,
      resolve: resolveContent,
    });
    return { success: true, data: res.data };
  } catch (error) {
    console.error("Lỗi xử lý resolve support:", error);
    return { success: false, error };
  }
};

const SupportRequestforSF = () => {
  return <div>SupportRequestforSF component</div>;
};

export default SupportRequestforSF;
