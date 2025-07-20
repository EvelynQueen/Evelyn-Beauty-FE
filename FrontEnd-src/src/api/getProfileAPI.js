import axios from "./axiosInstance";

const getProfileAPI = async () => {
  const res = await axios.get(`/profiles`);
  console.log("getProfileAPI response:", res.data);
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

export const getProvincesAPI = async () => {
  const res = await axios.get(`/delivery/provinces`);
  return res.data.data;
};

export const getDistrictAPI = async (provinceId) => {
  const res = await axios.get(
    `/delivery/districts-by-province?province_id=${provinceId}`
  );
  return res.data.data;
};
export const getWardsAPI = async (districtId) => {
  const res = await axios.get(
    `/delivery/wards-by-district?district_id=${districtId}`
  );
  return res.data.data;
};

export const addProfileAPI = async (profile) => {
  console.log("Profile gửi lên:", profile);

  const res = await axios.post(`/profiles`, profile);
  return res.data;
};
