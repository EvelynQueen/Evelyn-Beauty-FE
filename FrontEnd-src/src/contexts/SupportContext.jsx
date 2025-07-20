import { createContext } from "react";
import supportAPI from "../api/supportAPI";

const SupportContext = createContext(null);
export const SupportProvider = ({ children }) => {
  const handleAddSupport = async (comment) => {
    try {
      await supportAPI(comment);
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
  const value = { handleAddSupport };
  return (
    <SupportContext.Provider value={value}>{children}</SupportContext.Provider>
  );
};
export default SupportContext;
