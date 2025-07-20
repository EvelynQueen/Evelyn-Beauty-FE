import { Children, createContext, useState } from "react";
import getStaffAPI, { addStaffAPI } from "../api/getStaffAPI";

export const StaffContext = createContext();
export const StaffProvider = ({ children }) => {
  const [allStaff, setAllStaff] = useState([]);
  const [registerStaff, setRegisterStaff] = useState({});

  const handleGetStaff = async () => {
    try {
      const res = await getStaffAPI();
      setAllStaff(res);
      return { success: true, status: 200 };
    } catch (error) {
      if (!error.response?.status) {
        return { success: false, status: 0 };
      } else {
        return {
          success: false,
          status: error.status,
        };
      }
    }
  };

  const handleAddStaff = async (name, email, password, role) => {
    const payload = { name, email, password, role };
    try {
      const res = await addStaffAPI(payload);
      setRegisterStaff(res);
      return { success: true, status: 200 };
    } catch (error) {
      if (!error.response?.status) {
        return { success: false, status: 0 };
      } else {
        return { success: false, status: error.response?.status };
      }
    }
  };

  const value = {
    allStaff,
    handleGetStaff,
    registerStaff,
    setRegisterStaff,
    handleAddStaff,
  };

  return (
    <StaffContext.Provider value={value}>{children}</StaffContext.Provider>
  );
};
