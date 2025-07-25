import axios from "./axiosInstance";

const getOrderAPI = async () => {
  const res = await axios.get("/orders");
  return res.data;
};

export default getOrderAPI;

export const approveOrderAPI = async (orderId, status) => {
  const res = await axios.put(`/orders/${orderId}`, { status: status });
  return res.data;
};

export const realApproveAPI = async (orderId) => {
  const res = await axios.post("/delivery/create-order-ghn-from-order", {
    orderId,
  });
  return res.data;
};

export const getMyOrderAPI = async () => {
  const res = await axios.get("/orders/my-orders");
  return res.data;
};

export const trackingDeliveringAPI = async (transaction) => {
  const res = await axios.post("/delivery/ghn-tracking-link", {
    transaction_no: transaction,
  });
  return res.data;
};
