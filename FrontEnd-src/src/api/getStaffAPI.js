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
