import React, { createContext, useState } from "react";
import registerAPI, {
  verifyAPI,
  forgotPassAPI,
  resetPasswordAPI,
  verifyStaffAPI,
} from "../api/registerAPI";

export const RegisterContext = createContext();

export const RegisterProvider = ({ children }) => {
  const [registerData, setRegisterData] = useState({});
  const [verifyData, setVerifyData] = useState({});
  const [forgotEmail, setForgotEmail] = useState("");

  const handleRegister = async (data) => {
    try {
      const res = await registerAPI(data);
      setRegisterData(res);
      return { success: true, status: 200 };
    } catch (error) {
      return {
        success: false,
        status: error.response?.status || 0,
      };
    }
  };

  const handleVerify = async (data) => {
    try {
      const res = await verifyAPI(data);
      setVerifyData(res);
      return { success: true, status: 200 };
    } catch (error) {
      return {
        success: false,
        status: error.response?.status || 0,
      };
    }
  };
  const handleVerifyStaff = async (data) => {
    try {
      await verifyStaffAPI(data);
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
  const handleForgotEmail = async (email) => {
    try {
      await forgotPassAPI(email);
      setForgotEmail(email);
      return { success: true, status: 200 };
    } catch (error) {
      return {
        success: false,
        status: error.response?.status || 0,
      };
    }
  };

  const handleResetPassword = async ({ email, otp, newPassword }) => {
    try {
      await resetPasswordAPI({ email, otp, newPassword });
      return { success: true, status: 200 };
    } catch (error) {
      return {
        success: false,
        status: error.response?.status || 0,
      };
    }
  };

  return (
    <RegisterContext.Provider
      value={{
        registerData,
        handleRegister,
        verifyData,
        handleVerify,
        handleVerifyStaff,
        forgotEmail,
        handleForgotEmail,
        handleResetPassword,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};
