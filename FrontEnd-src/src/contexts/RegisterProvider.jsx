import { createContext, useState } from "react";
import registerAPI, { verifyAPI } from "../api/registerAPI";

export const RegisterContext = createContext();

export const RegisterProvider = ({ children }) => {
  const [registerData, setRegisterData] = useState({});
  const [verifyData, setVerifyData] = useState({});

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
          status: error.status,
        };
      }
    }
  };

  const handleVerify = async (data) => {
    try {
      const res = await verifyAPI(data);
      setVerifyData(res);
      return { success: true, status: 200 };
    } catch (error) {
      if (!error.response) {
        return { success: false, status: 0 };
      } else {
        return {
          success: false,
          status: error.response.status,
        };
      }
    }
  };

  const value = {
    registerData,
    handleRegister,
    verifyData,
    handleVerify,
  };
  return (
    <RegisterContext.Provider value={value}>
      {children}
    </RegisterContext.Provider>
  );
};
