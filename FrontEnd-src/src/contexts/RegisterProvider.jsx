import { createContext, useState } from "react";
import registerAPI from "../api/registerAPI";

export const RegisterContext = createContext();

export const RegisterProvider = ({ children }) => {
  const [registerData, setRegisterData] = useState({});

  const handleRegister = async (data) => {
    try {
      const res = await registerAPI(data);
      setRegisterData(res);
      return { success: true, status: 200 };
    } catch (error) {
      if (!error.response) {
        return { success: false, status: 0 };
      } else {
        return {
          success: false,
          status: error.response.status,
          message: error.response.data?.message || "Registration failed",
        };
      }
    }
  };

  const value = {
    registerData,
    handleRegister,
  };
  return (
    <RegisterContext.Provider value={value}>
      {children}
    </RegisterContext.Provider>
  );
};
