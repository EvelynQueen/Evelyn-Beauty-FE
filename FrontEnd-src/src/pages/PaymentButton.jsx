import React from "react";
import useCart from "../hook/useCart";
import usePayment from "../hook/usePayment";
import { toast } from "react-toastify";

const PaymentButton = () => {
  const { selectedItems } = useCart();
  const { handlePayOS } = usePayment();

  const handleOnClick = async () => {
    const confirm = window.confirm("Are you sure you want to pay ?");
    if (!confirm) return;

    try {
      const res = await handlePayOS(selectedItems);
      if (!res.success) {
        switch (res.status) {
          case 0:
            toast.error("Network error. Please try again later.");
            break;
          case 400:
            toast.error("Bad request. Please check your input.");
            break;
          case 404:
            toast.error("Resource not found. Please try again.");
            break;
          case 403:
            toast.error("Session expired. Please log in again.");
            break;
          case 500:
            toast.error("Server error. Please try again later.");
            break;
          default:
            toast.error("An unexpected error occurred. Please try again.");
            break;
        }
      } else {
        window.open(res.data.checkoutUrl, "_blank");
      }
    } catch (error) {
      console.error("Exception in handleOnClick:", error);
      toast.error("Something wrong happen ! Please wait!");
    }
  };

  return (
    <button
      onClick={handleOnClick}
      className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-700 transition"
    >
      Payment
    </button>
  );
};

export default PaymentButton;
