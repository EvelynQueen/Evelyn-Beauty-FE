import axios from "axios";

export const loginAPI = async (email, password) => {
  const res = await axios.post("http://localhost:3000/api/auth/login", {
    email,
    password,
  });
  return res.data;
};
