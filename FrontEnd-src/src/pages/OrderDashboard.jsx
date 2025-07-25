import React, { useEffect, useState } from "react";
import useOrder from "../hook/useOrder";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import useProduct from "../hook/useProduct";

const OrderDashboard = () => {
  const { allOrders, handleGetAllOrders, setSelectedOrder } = useOrder();
  const { currency } = useProduct();

  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [orderIdFilter, setOrderIdFilter] = useState("");

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
      const matchOrderId = orderIdFilter
        ? order.orderId
            .toLowerCase()
            .includes(orderIdFilter.trim().toLowerCase())
        : true;

      const matchStatus = statusFilter ? order.status === statusFilter : true;
      const matchDate = dateFilter
        ? new Date(order.date).toLocaleDateString("vi-VN") === dateFilter
        : true;

      return matchOrderId && matchStatus && matchDate;
    });

    setFilteredOrders(filtered);
  }, [allOrders, orderIdFilter, statusFilter, dateFilter]);

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
    localStorage.setItem("selectedOrder", JSON.stringify(order));
  };

  return (
    <div className="w-full flex flex-col justify-start items-center p-10">
      {/* Filter Controls */}
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

          {/* Date Filter */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
            <label className="text-sm font-medium text-gray-700">
              📅 Date:
            </label>
            <input
              type="date"
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              onChange={(e) => {
                const selected = e.target.value;
                const vnFormat = selected
                  ? new Date(selected).toLocaleDateString("vi-VN")
                  : "";
                setDateFilter(vnFormat);
              }}
            />
          </div>

          {/* Status Filter */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
            <label className="text-sm font-medium text-gray-700">
              📦 Status:
            </label>
            <select
              className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="return_requested">Declined</option>
              <option value="cancel">Cancelled</option>
              <option value="in_transit">Waiting</option>
              <option value="delivered">Delivering</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      {filteredOrders.length === 0 ? (
        <div className="text-gray-500 text-lg font-medium italic">
          🚫 No Orders match your filter!
        </div>
      ) : (
        <div className="w-full rounded-xl overflow-hidden border border-gray-300 shadow-md caret-transparent">
          <table className="table-auto w-full text-center border-collapse">
            <thead className="bg-gradient-to-r from-green-100 to-green-200 text-gray-700 font-semibold text-sm uppercase tracking-wider">
              <tr>
                <th className="border border-gray-200 px-6 py-3">Order ID</th>
                <th className="border border-gray-200 px-6 py-3">
                  Shipping Info
                </th>
                <th className="border border-gray-200 px-6 py-3">
                  Payment Date
                </th>
                <th className="border border-gray-200 px-6 py-3">
                  Payment Time
                </th>
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
                    {order.deliveryId == null ? (
                      <span className="text-gray-500 italic">No shipping</span>
                    ) : (
                      order.deliveryId
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

                  <td className="border border-gray-200 px-6 py-4 text-green-700 font-semibold">
                    {Number(order.total_final).toLocaleString()} {currency}
                  </td>

                  <td className="border border-gray-200 px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          order.status === "return_requested" ||
                          order.status === "cancel"
                            ? "bg-red-100 text-red-700"
                            : order.status === "return_approved"
                            ? "bg-blue-100 text-blue-700"
                            : order.status === "in_transit"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "delivered"
                            ? "bg-sky-200 text-sky-800"
                            : order.status === "done"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                    >
                      {order.status === "return_requested" ||
                      order.status === "cancel"
                        ? "Declined"
                        : order.status === "delivered"
                        ? "Delivering"
                        : order.status === "in_transit"
                        ? "Waiting"
                        : order.status === "done"
                        ? "Done"
                        : order.status}
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
