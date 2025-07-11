import axios from "axios";

const registerAPI = async (data) => {
  const res = await axios.post(`http://localhost:3000/auth/register`, data);
  return res.data;
};

export default registerAPI;

export const verifyAPI = async (data) => {
  const res = await axios.post(`http://localhost:3000/auth/verify-otp`, data);
  return res.data;
};
