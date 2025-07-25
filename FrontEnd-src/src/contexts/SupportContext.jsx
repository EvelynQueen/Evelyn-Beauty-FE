import { createContext, useState, useEffect } from "react";
import supportAPI, { getMySupports } from "../api/supportAPI";

const SupportContext = createContext(null);

export const SupportProvider = ({ children }) => {
  const [supportList, setSupportList] = useState([]);

  const handleAddSupport = async (comment) => {
    try {
      await supportAPI(comment);
      await fetchMySupports(); // Refresh after add
      return { success: true, status: 200 };
    } catch (error) {
      if (!error.response?.status) {
        return { success: false, status: 0 };
      } else {
        return {
          success: false,
          status: error.response.status,
        };
      }
    }
  };

  const fetchMySupports = async () => {
    try {
      const data = await getMySupports();
      setSupportList(data);
    } catch (error) {
      console.error("Failed to load support list:", error);
    }
  };

  useEffect(() => {
    fetchMySupports();
  }, []);

  const value = { handleAddSupport, supportList };

  return (
    <SupportContext.Provider value={value}>{children}</SupportContext.Provider>
  );
};

export default SupportContext;
