import axios from "axios";

const registerAPI = async (data) => {
  const res = await axios.post(`http://localhost:3000/api/auth/register`, data);
  return res.data;
};

export default registerAPI;

export const verifyAPI = async (data) => {
  const res = await axios.post(
    `http://localhost:3000/api/auth/verify-otp`,
    data
  );
  return res.data;
};
