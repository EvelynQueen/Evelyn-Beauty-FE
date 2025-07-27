import React, { useEffect, useState } from "react";
import { refundOrderAPI } from "../api/getOrderAPI";
import { useNavigate } from "react-router-dom";

const statusMap = {
  refund: {
    label: "Waiting for refund",
    color: "bg-orange-100 text-orange-600",
  },
  cancel: {
    label: "Cancel",
    color: "bg-red-100 text-red-600",
  },
};

const AllRefund = () => {
  const [refunds, setRefunds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRefunds = async () => {
      try {
        const res = await refundOrderAPI();
        setRefunds(res.data || []);
      } catch (err) {
        console.error("Error fetching refund orders:", err);
      }
    };

    fetchRefunds();
  }, []);

  return (
    <div className="p-8 bg-white min-h-screen">
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
            {refunds.map((order) => {
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
            })}
            {refunds.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-6 text-center text-pink-600 border-t"
                >
                  💡 No orders waiting for refund
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
