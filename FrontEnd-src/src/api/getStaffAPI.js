import axios from "./axiosInstance";

export const getStaffAPI = async () => {
  const response = await axios.get("/auth/all");
  return response.data.accounts;
};
