// src/pages/OsOrder.jsx
import React, { useEffect } from "react";
import useOrder from "../hook/useOrder";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import useProduct from "../hook/useProduct";

const OsOrder = () => {
  const { allOrders, handleGetAllOrders, setSelectedOrder } = useOrder();
  const { currency } = useProduct();

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

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
    localStorage.setItem("selectedOrder", JSON.stringify(order));
  };

  return (
    <div className="w-full flex flex-col justify-start items-center p-10">
      {!allOrders || allOrders.length === 0 ? (
        <div className="text-gray-500 text-lg font-medium italic">
          🚫 No Orders here!
        </div>
      ) : (
        <div className="w-full rounded-xl overflow-hidden border border-gray-300 shadow-md">
          <table className="table-auto w-full text-center border-collapse">
            <thead className="bg-gradient-to-r from-green-100 to-sky-300 text-gray-700 font-semibold text-sm uppercase tracking-wider">
              <tr>
                <th className="border border-gray-200 px-6 py-3">Order ID</th>
                <th className="border border-gray-200 px-6 py-3">
                  Assigned Staff
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
              {allOrders.map((order, index) => (
                <tr
                  key={order.orderId || index}
                  className={`cursor-pointer ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition duration-200`}
                >
                  <td className="border border-gray-200 px-6 py-4">
                    <Link
                      to={`/all-orders/${order.orderId}`}
                      onClick={() => handleSelectOrder(order)}
                      className="text-blue-700 hover:underline hover:font-bold transition"
                    >
                      {order.orderId}
                    </Link>
                  </td>

                  <td className="border border-gray-200 px-6 py-4">
                    {order.accountId === "AC000" ? (
                      <span className="text-gray-500 italic">Waiting...</span>
                    ) : (
                      order.account.name
                    )}
                  </td>

                  <td className="border font-semibold border-gray-200 px-6 py-4">
                    {new Date(order.date).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="border border-gray-200 px-6 py-4">
                    {new Date(order.date).toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </td>
                  <td className="border font-semibold text-green-700 border-gray-200 px-6 py-4">
                    {Number(order.total_final).toLocaleString()} {currency}
                  </td>
                  <td className="border border-gray-200 px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === "return_requested" ||
                        order.status === "cancel"
                          ? "bg-red-100 text-red-700"
                          : order.status === "return_approved"
                          ? "bg-sky-100 text-sky-700"
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
                        : order.status === "return_approved"
                        ? "Packing & Delivering"
                        : order.status === "in_transit"
                        ? "Waiting"
                        : order.status === "delivered"
                        ? "Delivered"
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

export default OsOrder;
