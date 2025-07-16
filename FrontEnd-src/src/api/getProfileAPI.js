import axios from "./axiosInstance";

const getProfileAPI = async () => {
  const res = await axios.get(`/profiles`);
  return res.data;
};
export default getProfileAPI;

export const uploadProfileAPI = async (name, phone, address) => {
  const res = await axios.post(`/profiles`, {
    name,
    phone,
    address,
  });
  return res.data;
};

export const deleteProfileAPI = async (profileId) => {
  const res = await axios.delete(`/profiles/profileId?profileId=${profileId}`);
  return res.data;
};
