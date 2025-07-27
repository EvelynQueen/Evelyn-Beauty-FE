import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Heading from "../components/Heading";
import { RiRefund2Fill } from "react-icons/ri";
import { refundOrderAPI } from "../api/getOrderAPI";
import { approveOrderAPI } from "../api/getOrderAPI";

const RefundsDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchRefund = async () => {
      try {
        const res = await refundOrderAPI();
        const foundOrder = res.data.find((o) => o.orderId === orderId);
        setOrder(foundOrder || null);
      } catch (err) {
        console.error("Error fetching refund detail:", err);
      }
    };
    fetchRefund();
  }, [orderId]);

  const handleStatusChange = async () => {
    const confirm = window.confirm("Confirm refund for this order?");
    if (!confirm) return;

    try {
      await approveOrderAPI(order.orderId, "cancel");
      setOrder({ ...order, status: "cancel" });
      alert("✅ Status updated successfully.");
    } catch (err) {
      console.error("Error updating status:", err);
      alert("❌ Failed to update status.");
    }
  };

  if (!order) {
    return (
      <div className="p-6">
        <Heading icons={RiRefund2Fill} title="Refunds Detail" />
        <p className="text-center text-gray-500 mt-6">❌ Order not found</p>
      </div>
    );
  }

  const { payment, details, total } = order;

  return (
    <div className="p-6">
      <Heading
        icons={RiRefund2Fill}
        title={`Refunds Detail - ${order.orderId}`}
      />

      {/* Status Action */}
      {order.status === "refund" && (
        <div className="mt-4">
          <button
            onClick={handleStatusChange}
            className="bg-orange-100 cursor-pointer text-orange-600 font-medium px-4 py-2 rounded-full hover:bg-orange-200 transition"
          >
            Waiting for refund
          </button>
        </div>
      )}

      {order.status === "cancel" && (
        <div className="mt-4">
          <span className="bg-red-100 text-red-600 font-medium px-4 py-2 rounded-full">
            Cancel
          </span>
        </div>
      )}

      {/* Bank Info */}
      <div className="bg-white shadow-md p-4 rounded-xl mt-4 border border-pink-100">
        <h3 className="text-lg font-semibold text-pink-700 mb-2">
          🔐 Bank Account Info
        </h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>
            <span className="font-medium">Account Bank ID:</span>{" "}
            {payment.accountBankId || (
              <span className="text-gray-400 italic">Not provided</span>
            )}
          </li>
          <li>
            <span className="font-medium">Account Name:</span>{" "}
            {payment.accountName || (
              <span className="text-gray-400 italic">Not provided</span>
            )}
          </li>
          <li>
            <span className="font-medium">Account Number:</span>{" "}
            {payment.accountNumber || (
              <span className="text-gray-400 italic">Not provided</span>
            )}
          </li>
        </ul>
      </div>

      {/* Order Details */}
      <div className="bg-white shadow-md p-4 rounded-xl mt-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-pink-700 mb-3">
          🧾 Order Items
        </h3>
        <table className="min-w-full table-auto border border-gray-200 rounded-lg">
          <thead className="bg-pink-100 text-pink-800">
            <tr>
              <th className="px-4 py-2 text-left text-sm">Product ID</th>
              <th className="px-4 py-2 text-left text-sm">Quantity</th>
              <th className="px-4 py-2 text-left text-sm">Price (VND)</th>
              <th className="px-4 py-2 text-left text-sm">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {details.map((item, idx) => (
              <tr key={idx} className="hover:bg-pink-50 transition">
                <td className="px-4 py-2 border-t">{item.productId}</td>
                <td className="px-4 py-2 border-t">{item.quantity}</td>
                <td className="px-4 py-2 border-t">
                  {parseInt(item.product.price).toLocaleString()}
                </td>
                <td className="px-4 py-2 border-t">
                  {(
                    item.quantity * parseInt(item.product.price)
                  ).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-right font-semibold mt-4 text-pink-700">
          Total: {total.toLocaleString()} VND
        </div>
      </div>
    </div>
  );
};

export default RefundsDetail;
