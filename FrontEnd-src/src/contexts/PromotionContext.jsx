// src/contexts/PromotionContext.jsx
import { createContext, useEffect, useState } from "react";
import getAllPromotionSF from "../api/promotionProgramAPI";

export const PromotionContext = createContext();

export const PromotionProvider = ({ children }) => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPromotions = async () => {
    try {
      const res = await getAllPromotionSF();
      const promotionArray = res?.data?.promotionPrograms || [];
      setPromotions(promotionArray);
      setError(null);
    } catch (err) {
      console.error("Lỗi khi gọi promotion API:", err);
      setError("Không thể tải chương trình khuyến mãi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  const value = {
    promotions,
    loading,
    error,
    refetch: fetchPromotions,
  };

  return (
    <PromotionContext.Provider value={value}>
      {children}
    </PromotionContext.Provider>
  );
};
