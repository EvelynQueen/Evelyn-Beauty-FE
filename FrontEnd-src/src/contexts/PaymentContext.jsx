import { createContext, useState } from "react";
import paymentAPI, { getPromotionAPI, getShippingAPI } from "../api/paymentAPI";
import useProfile from "../hook/useProfile";
import useCart from "../hook/useCart";

export const PaymentContext = createContext(null);

export const PaymentProvider = ({ children }) => {
  const { selectedCartItemsForDiscount } = useCart();
  const { selectedProfile } = useProfile();

  const [discount, setDiscount] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState(""); // "" or object
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [checkoutInfo, setCheckoutInfo] = useState({});

  // ✅ Safe: fallback to "" if not selected
  const handlePayOS = async () => {
    const payload = {
      profileId: selectedProfile?.profileId,
      promotionProgramId: selectedDiscount?.programId || "", // 🔐 fallback
      items: selectedCartItemsForDiscount.map((item) => ({
        productId: item.productId,
        classificationId: item.classificationId,
        quantity: item.quantity,
      })),
    };

    try {
      const res = await paymentAPI(payload);
      setCheckoutInfo(res);
      return { success: true, data: res, status: 200 };
    } catch (error) {
      return {
        success: false,
        status: error.response?.status || 0,
      };
    }
  };

  const getShippingFee = async (fullAddress) => {
    try {
      const res = await getShippingAPI(fullAddress);
      setShippingFee(res.data.total);
      return { success: true, status: 200 };
    } catch (error) {
      return {
        success: false,
        status: error.response?.status || 0,
      };
    }
  };

  const getDiscount = async (items) => {
    try {
      const res = await getPromotionAPI(items);
      setDiscount(res.promotionPrograms);
      return { success: true, status: 200 };
    } catch (error) {
      return {
        success: false,
        status: error.response?.status || 0,
      };
    }
  };

  const handleSelectDiscount = (programId) => {
    if (!programId) {
      setSelectedDiscount(""); // reset to empty if nothing selected
    } else {
      const selected = discount.find((item) => item.programId === programId);
      setSelectedDiscount(selected || "");
    }
  };

  const handleResetTotalAfterDiscount = (total, discountObj) => {
    if (typeof discountObj === "object" && discountObj !== null) {
      if (discountObj.value > 0) {
        const discountAmount = total * discountObj.value;
        setTotalAfterDiscount(total + shippingFee - discountAmount);
        return discountAmount;
      } else {
        setTotalAfterDiscount(total); // Free shipping or other logic here
        return 0;
      }
    } else {
      setTotalAfterDiscount(total + shippingFee);
      return 0;
    }
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
    shippingFee,
    getShippingFee,
    handlePayOS,
    checkoutInfo,
    setCheckoutInfo,
  };

  return (
    <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
  );
};
