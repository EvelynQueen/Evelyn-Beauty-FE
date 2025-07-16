import { useContext } from "react";
import { PaymentContext } from "../contexts/PaymentContext";

const usePayment = () => {
  const context = useContext(PaymentContext);
  return context;
};

export default usePayment;
