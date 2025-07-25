import { createContext, useCallback, useState } from "react";
import getOrderAPI, {
  approveOrderAPI,
  getMyOrderAPI,
  realApproveAPI,
  trackingDeliveringAPI,
} from "../api/getOrderAPI";

const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
  const [allOrders, setAllOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [myOrders, setMyOrders] = useState([]);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState([]);
  const [deliveryLink, setDeliveryLink] = useState("");

  const handleTrackingDelivery = async (transaction) => {
    try {
      const res = await trackingDeliveringAPI(transaction);
      setDeliveryLink(res.link);
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

  const handleGetAllOrders = useCallback(async () => {
    try {
      const res = await getOrderAPI();
      setAllOrders(res.orders);
      return { success: true, status: 200 };
    } catch (error) {
      return {
        success: false,
        status: error.response?.status || 0,
      };
    }
  }, []);

  const handleRefreshSelectedOrder = async (orderId) => {
    try {
      const res = await getOrderAPI();
      setAllOrders(res.orders);
      const updated = res.orders.find((o) => o.orderId === orderId);
      if (updated) {
        setSelectedOrder(updated);
        localStorage.setItem("selectedOrder", JSON.stringify(updated));
        return { success: true, status: 200 };
      } else {
        return { success: false, status: 404 };
      }
    } catch (error) {
      return {
        success: false,
        status: error.response?.status || 0,
      };
    }
  };

  const handleGetMyOrders = async () => {
    try {
      const res = await getMyOrderAPI();
      setMyOrders(res.orders);
      return { success: true, status: 200 };
    } catch (error) {
      return {
        success: false,
        status: error.response?.status || 0,
      };
    }
  };

  const handleRejectOrder = async (orderId) => {
    try {
      await approveOrderAPI(orderId, "return_requested");

      setAllOrders((prev) =>
        prev.map((order) =>
          order.orderId === orderId
            ? { ...order, status: "return_requested" }
            : order
        )
      );

      setSelectedOrder((prev) =>
        prev?.orderId === orderId
          ? { ...prev, status: "return_requested" }
          : prev
      );

      return { success: true, status: 200 };
    } catch (error) {
      return {
        success: false,
        status: error.response?.status || 0,
      };
    }
  };

  const handleApprovedOrder = async (orderId) => {
    try {
      await realApproveAPI(orderId); // server updates to "delivered"

      setAllOrders((prev) =>
        prev.map((order) =>
          order.orderId === orderId ? { ...order, status: "delivered" } : order
        )
      );

      setSelectedOrder((prev) =>
        prev?.orderId === orderId ? { ...prev, status: "delivered" } : prev
      );

      return { success: true, status: 200 };
    } catch (error) {
      return {
        success: false,
        status: error.response?.status || 0,
      };
    }
  };

  const handleMarkOrderDone = async (orderId) => {
    try {
      await approveOrderAPI(orderId, "done");

      setAllOrders((prev) =>
        prev.map((order) =>
          order.orderId === orderId ? { ...order, status: "done" } : order
        )
      );

      setSelectedOrder((prev) =>
        prev?.orderId === orderId ? { ...prev, status: "done" } : prev
      );

      return { success: true, status: 200 };
    } catch (error) {
      return {
        success: false,
        status: error.response?.status || 0,
      };
    }
  };

  const value = {
    allOrders,
    handleGetAllOrders,
    handleRejectOrder,
    handleApprovedOrder,
    handleMarkOrderDone,
    selectedOrderId,
    setSelectedOrderId,
    selectedOrder,
    setSelectedOrder,
    myOrders,
    handleGetMyOrders,
    selectedOrderDetail,
    setSelectedOrderDetail,
    deliveryLink,
    handleTrackingDelivery,
    handleRefreshSelectedOrder,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

export default OrderContext;
