import axios from "axios";

const BASE = "http://localhost:3000/api/auth";

const registerAPI = async (data) => {
  const res = await axios.post(`${BASE}/register`, data);
  return res.data;
};

export default registerAPI;

export const verifyAPI = async (data) => {
  const res = await axios.post(`${BASE}/verify-otp`, data);
  return res.data;
};

export const verifyStaffAPI = async (data) => {
  const res = await axios.post(
    `http://localhost:3000/api/auth/verify-otp-account`,
    data
  );
  return res.data;
};

export const forgotPassAPI = async (email) => {
  const res = await axios.post(`${BASE}/forgot-password`, { email });
  return res.data;
};

export const resetPasswordAPI = async (data) => {
  const res = await axios.post(`${BASE}/reset-password`, data);
  return res.data;
};
