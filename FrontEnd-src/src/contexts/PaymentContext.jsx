import { createContext, useState } from "react";
import paymentAPI, { getPromotionAPI, getShippingAPI } from "../api/paymentAPI";
import useProfile from "../hook/useProfile";
import useCart from "../hook/useCart";
export const PaymentContext = createContext(null);
export const PaymentProvider = ({ children }) => {
  const { selectedCartItemsForDiscount } = useCart();
  const [discount, setDiscount] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState({});
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const { selectedProfile } = useProfile();
  const [checkoutInfo, setCheckoutInfo] = useState({});

  const handlePayOS = async () => {
    // Log dữ liệu chuẩn bị gửi lên
    const payload = {
      profileId: selectedProfile.profileId,
      promotionProgramId: selectedDiscount.programId,
      items: selectedCartItemsForDiscount.map((item) => ({
        productId: item.productId,
        classificationId: item.classificationId,
        quantity: item.quantity,
      })),
    };
    console.log("Payload gửi lên BE:", payload);

    try {
      const res = await paymentAPI(payload);
      setCheckoutInfo(res);
      console.log(res);
      return { success: true, data: res, status: 200 };
    } catch (error) {
      if (!error.response?.status) {
        return { success: false, status: 0 };
      }
      return { success: false, status: error.response?.status };
    }
  };

  const getShippingFee = async (fullAddress) => {
    try {
      const res = await getShippingAPI(fullAddress);
      setShippingFee(res.data.total);
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
    if (discountObj?.programId && discountObj.value > 0) {
      const discountAmount = total * discountObj.value;
      setTotalAfterDiscount(total + shippingFee - discountAmount);
      return discountAmount;
    } else if (discountObj?.programId && discountObj.value == 0) {
      setTotalAfterDiscount(total + shippingFee - shippingFee);
      console.log(total + shippingFee - shippingFee);
      return shippingFee;
    } else {
      setTotalAfterDiscount(total + shippingFee);
      console.log(total);
      return total;
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
