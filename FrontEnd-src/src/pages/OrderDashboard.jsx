import React, { useEffect, useState } from "react";
import useOrder from "../hook/useOrder";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import useProduct from "../hook/useProduct";

const statusLabels = {
  refund: "Waiting for Refund",
  cancel: "Cancelled",
  in_transit: "In Transit",
  delivered: "Delivered",
  done: "Done",
};

const statusStyles = {
  refund: "bg-orange-100 text-orange-700",
  cancel: "bg-red-100 text-red-700",
  in_transit: "bg-yellow-100 text-yellow-800",
  delivered: "bg-sky-200 text-sky-800",
  done: "bg-green-100 text-green-700",
};

const OrderDashboard = () => {
  const { allOrders, handleGetAllOrders, setSelectedOrder } = useOrder();
  const { currency } = useProduct();

  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [orderIdFilter, setOrderIdFilter] = useState("");
  const [orderFrom, setOrderFrom] = useState("");
  const [orderTo, setOrderTo] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await handleGetAllOrders();
      if (!res.success) {
        switch (res.status) {
          case 403:
            toast.error("Session expired, please login again");
            break;
          case 404:
            toast.error("Orders not found!");
            break;
          default:
            toast.error("Something went wrong, please try again");
        }
      }
    };
    fetchOrders();
  }, [handleGetAllOrders]);

  useEffect(() => {
    const filtered = allOrders.filter((order) => {
      const orderDate = new Date(order.date);
      const fromDate = orderFrom ? new Date(orderFrom) : null;
      const toDate = orderTo ? new Date(orderTo) : null;

      const matchOrderId = orderIdFilter
        ? order.orderId
            .toLowerCase()
            .includes(orderIdFilter.trim().toLowerCase())
        : true;

      const matchStatus = statusFilter ? order.status === statusFilter : true;

      const matchFrom = fromDate ? orderDate >= fromDate : true;
      const matchTo = toDate ? orderDate <= toDate : true;

      return matchOrderId && matchStatus && matchFrom && matchTo;
    });

    setFilteredOrders(filtered);
  }, [allOrders, orderIdFilter, statusFilter, orderFrom, orderTo]);

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
    localStorage.setItem("selectedOrder", JSON.stringify(order));
  };

  const handleClearFilters = () => {
    setOrderIdFilter("");
    setStatusFilter("");
    setOrderFrom("");
    setOrderTo("");
  };

  return (
    <div className="w-full flex flex-col justify-start items-center p-10">
      {/* Filters */}
      <div className="w-full max-w-5xl bg-white shadow-sm border border-gray-200 rounded-lg px-6 py-4 mb-6">
        <div className="flex flex-col lg:flex-row flex-wrap items-center justify-between gap-4">
          {/* Order ID Filter */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
            <label className="text-sm font-medium text-gray-700">
              🆔 Order ID:
            </label>
            <input
              type="text"
              placeholder="Enter Order ID..."
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition w-full sm:w-60"
              value={orderIdFilter}
              onChange={(e) => setOrderIdFilter(e.target.value)}
            />
          </div>

          {/* From Date */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <label className="text-sm font-medium text-gray-700">
              📆 From:
            </label>
            <input
              type="date"
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              value={orderFrom}
              onChange={(e) => setOrderFrom(e.target.value)}
            />
          </div>

          {/* To Date */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <label className="text-sm font-medium text-gray-700">➡️ To:</label>
            <input
              type="date"
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              value={orderTo}
              onChange={(e) => setOrderTo(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <label className="text-sm font-medium text-gray-700">
              📦 Status:
            </label>
            <select
              className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="refund">Waiting for Refund</option>
              <option value="cancel">Cancelled</option>
              <option value="in_transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>

        {/* Clear Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleClearFilters}
            className="text-sm px-4 py-2 rounded-md border border-pink-300 bg-pink-50 hover:bg-pink-100 text-pink-700 font-medium transition"
          >
            🔄 Clear Filters
          </button>
        </div>
      </div>

      {/* Table */}
      {filteredOrders.length === 0 ? (
        <div className="text-gray-500 text-lg font-medium italic">
          🚫 No Orders match your filter!
        </div>
      ) : (
        <div className="w-full rounded-xl overflow-hidden border border-gray-300 shadow-md">
          <table className="table-auto w-full text-center border-collapse">
            <thead className="bg-gradient-to-r from-green-100 to-green-200 text-gray-700 font-semibold text-sm uppercase tracking-wider">
              <tr>
                <th className="border border-gray-200 px-6 py-3">Order ID</th>
                <th className="border border-gray-200 px-6 py-3">
                  Shipping Info
                </th>
                <th className="border border-gray-200 px-6 py-3">Date</th>
                <th className="border border-gray-200 px-6 py-3">Time</th>
                <th className="border border-gray-200 px-6 py-3">Total</th>
                <th className="border border-gray-200 px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {filteredOrders.map((order, index) => (
                <tr
                  key={order.orderId || index}
                  className={`cursor-pointer ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition duration-200`}
                >
                  <td className="border border-gray-200 px-6 py-4">
                    <Link
                      to={`/order-dashboard/${order.orderId}`}
                      onClick={() => handleSelectOrder(order)}
                      className="text-blue-700 hover:underline hover:font-bold transition"
                    >
                      {order.orderId}
                    </Link>
                  </td>
                  <td className="border border-gray-200 px-6 py-4">
                    {order.deliveryId ?? (
                      <span className="text-gray-500 italic">No shipping</span>
                    )}
                  </td>
                  <td className="border border-gray-200 px-6 py-4">
                    {new Date(order.date).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="border border-gray-200 px-6 py-4">
                    {new Date(order.date).toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </td>
                  <td className="border text-green-700 font-semibold border-gray-200 px-6 py-4">
                    {Number(order.total_final).toLocaleString()} {currency}
                  </td>
                  <td className="border border-gray-200 px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        statusStyles[order.status] ||
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {statusLabels[order.status] || order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderDashboard;
