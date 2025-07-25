import axios from "./axiosInstance";

const supportAPI = async (comment) => {
  const res = await axios.post("/supports", comment);
  return res.data;
};

export default supportAPI;

export const viewSupportDetail = async (supportId) => {
  const res = await axios.post("/supports/detail", { supportId: supportId });
  return res.data;
};

export const resolveSupport = async (supportId, resolve) => {
  const res = await axios.put("/supports/resolve", {
    supportId: supportId,
    resolve: resolve,
  });
  return res.data;
};
