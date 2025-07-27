import React, { useEffect, useState } from "react";
import { refundOrderAPI } from "../api/getOrderAPI";
import { useNavigate } from "react-router-dom";

const statusMap = {
  refund: {
    label: "Waiting for refund",
    color: "bg-orange-100 text-orange-600",
  },
  cancel: {
    label: "Cancelled",
    color: "bg-red-100 text-red-600",
  },
};

const AllRefund = () => {
  const [refunds, setRefunds] = useState([]);
  const [filteredRefunds, setFilteredRefunds] = useState([]);
  const [orderIdFilter, setOrderIdFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRefunds = async () => {
      try {
        const res = await refundOrderAPI();
        const data = res.data || [];
        setRefunds(data);
        setFilteredRefunds(data);
      } catch (err) {
        console.error("Error fetching refund orders:", err);
      }
    };

    fetchRefunds();
  }, []);

  useEffect(() => {
    const filtered = refunds.filter((order) => {
      const orderDate = new Date(order.date);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;

      const matchOrderId = orderIdFilter
        ? order.orderId.toLowerCase().includes(orderIdFilter.toLowerCase())
        : true;

      const matchFrom = from ? orderDate >= from : true;
      const matchTo = to ? orderDate <= to : true;

      return matchOrderId && matchFrom && matchTo;
    });

    setFilteredRefunds(filtered);
  }, [orderIdFilter, fromDate, toDate, refunds]);

  return (
    <div className="p-8 bg-white min-h-screen">
      {/* Filter Controls */}
      <div className="mb-6 flex flex-col lg:flex-row flex-wrap items-center gap-4">
        {/* Order ID */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <label className="text-sm font-medium text-gray-700">
            🆔 Order ID:
          </label>
          <input
            type="text"
            placeholder="Enter Order ID..."
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 transition"
            value={orderIdFilter}
            onChange={(e) => setOrderIdFilter(e.target.value)}
          />
        </div>

        {/* From Date */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <label className="text-sm font-medium text-gray-700">📆 From:</label>
          <input
            type="date"
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 transition"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        {/* To Date */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <label className="text-sm font-medium text-gray-700">➡️ To:</label>
          <input
            type="date"
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 transition"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
      </div>

      {/* Refunds Table */}
      <div className="overflow-x-auto shadow-md rounded-xl bg-white">
        <table className="min-w-full table-auto rounded-xl">
          <thead className="bg-pink-100 text-pink-800">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Payment Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Total
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRefunds.length > 0 ? (
              filteredRefunds.map((order) => {
                const statusInfo = statusMap[order.status] || {
                  label: order.status,
                  color: "bg-gray-100 text-gray-600",
                };
                const paymentDate = new Date(order.date).toLocaleString();

                return (
                  <tr
                    key={order.orderId}
                    onClick={() => navigate(`/refunds/${order.orderId}`)}
                    className="hover:bg-pink-50 transition cursor-pointer"
                  >
                    <td className="px-6 py-4 border-t">{order.orderId}</td>
                    <td className="px-6 py-4 border-t">{paymentDate}</td>
                    <td className="px-6 py-4 border-t">
                      {order.total.toLocaleString()} VND
                    </td>
                    <td className="px-6 py-4 border-t">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}
                      >
                        {statusInfo.label}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-6 text-center text-pink-600 border-t"
                >
                  💡 No orders match your filter
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRefund;
