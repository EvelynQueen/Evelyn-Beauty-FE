import { createContext, useState } from "react";
import { getPromotionAPI } from "../api/PaymentAPI";
export const PaymentContext = createContext(null);
export const PaymentProvider = ({ children }) => {
  const [discount, setDiscount] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState({});
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const getDiscount = async (items) => {
    try {
      const res = await getPromotionAPI(items);
      setDiscount(res.promotionPrograms);
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

  const handleSelectDiscount = (discountId) => {
    const selected = discount.find((item) => item.programId === discountId);
    setSelectedDiscount(selected);
    console.log(selected);
  };

  const handleResetTotalAfterDiscount = (total, discountObj) => {
    console.log((total, discountObj));
    if (discountObj?.programId) {
      const discountAmount = total * discountObj.value;
      setTotalAfterDiscount(total - discountAmount);
      return discountAmount;
    }
    setTotalAfterDiscount(total);
    return total;
  };

  const value = {
    getDiscount,
    discount,
    handleSelectDiscount,
    selectedDiscount,
    totalAfterDiscount,
    setTotalAfterDiscount,
    setDiscount,
    setSelectedDiscount,
    handleResetTotalAfterDiscount,
  };

  return (
    <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
  );
};
