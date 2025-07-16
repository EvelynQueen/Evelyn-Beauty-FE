import { Children, createContext, useState } from "react";
import { getStaffAPI } from "../api/getStaffAPI";

export const StaffContext = createContext();
export const StaffProvider = ({ children }) => {
  const [allStaff, setAllStaff] = useState([]);
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

  const value = {
    allStaff,
    handleGetStaff,
  };

  return (
    <StaffContext.Provider value={value}>{children}</StaffContext.Provider>
  );
};
