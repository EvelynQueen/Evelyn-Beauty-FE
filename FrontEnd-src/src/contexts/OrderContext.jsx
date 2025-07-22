import { createContext, useState } from "react";
import Order from "../pages/Order";
import getOrderAPI, {
  approveOrderAPI,
  getMyOrderAPI,
} from "../api/getOrderAPI";

const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
  const [allOrders, setAllOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [myOrders, setMyOrders] = useState([]);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState([]);

  const handleApproveOrders = async (orderId, status) => {
    try {
      await approveOrderAPI(orderId, status);
      return { success: true, status: 200 };
    } catch (error) {
      if (!error.response?.status) {
        return { success: false, status: 0 };
      } else {
        return {
          success: false,
          status: error.response?.status,
        };
      }
    }
  };

  const handleGetAllOrders = async () => {
    try {
      const res = await getOrderAPI();
      setAllOrders(res.orders);
      return { success: true, status: 200 };
    } catch (error) {
      if (!error.response?.status) {
        return { success: false, status: 0 };
      } else {
        return {
          success: false,
          status: error.response?.status,
        };
      }
    }
  };

  const handleGetMyOrders = async () => {
    try {
      const res = await getMyOrderAPI();
      setMyOrders(res.orders);
      return { success: true, status: 200 };
    } catch (error) {
      if (!error.response?.status) {
        return { success: false, status: 0 };
      } else {
        return {
          success: false,
          status: error.response?.status,
        };
      }
    }
  };
  const value = {
    allOrders,
    handleGetAllOrders,
    handleApproveOrders,
    selectedOrderId,
    setSelectedOrderId,
    selectedOrder,
    setSelectedOrder,
    handleGetMyOrders,
    myOrders,
    selectedOrderDetail,
    setSelectedOrderDetail,
  };
  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

export default OrderContext;
