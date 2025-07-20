import { useContext } from "react";
import OrderContext from "../contexts/OrderContext";

const useOrder = () => {
  const context = useContext(OrderContext);
  return context;
};
export default useOrder;
