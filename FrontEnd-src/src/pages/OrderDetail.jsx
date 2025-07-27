import React, { useEffect, useState } from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Heading from "../components/Heading";
import useOrder from "../hook/useOrder";
import useProduct from "../hook/useProduct";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

const OrderDetail = () => {
  const { orderId } = useParams();
  const { selectedOrderDetail, handleTrackingDelivery, deliveryLink } =
    useOrder();
  const { currency } = useProduct();

  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    if (selectedOrderDetail && selectedOrderDetail.orderId === orderId) {
      setOrderData(selectedOrderDetail);
      localStorage.setItem(
        "selectedOrderDetail",
        JSON.stringify(selectedOrderDetail)
      );
    } else {
      const stored = localStorage.getItem("selectedOrderDetail");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.orderId === orderId) {
          setOrderData(parsed);
        }
      }
    }
  }, [selectedOrderDetail, orderId]);

  useEffect(() => {
    const transactionNo = orderData?.transactionNo;
    if (transactionNo) {
      (async () => {
        const res = await handleTrackingDelivery(transactionNo);
        if (!res.success) {
          toast.error("Something went wrong, please login again");
        }
      })();
    }
  }, [orderData]);

  if (!orderData) {
    return (
      <div className="px-4 py-6">
        <p className="text-center text-gray-500">Loading order details...</p>
      </div>
    );
  }

  const { date, status, details } = orderData;

  const totalAmount = Array.isArray(details)
    ? details.reduce((sum, item) => sum + item.total, 0)
    : 0;

  const renderStatus = (status) => {
    const base = "text-sm px-3 py-1 rounded-full font-semibold inline-block";
    switch (status) {
      case "cancel":
        return (
          <span className={`${base} text-red-700 bg-red-300`}>Cancel</span>
        );
      case "return_requested":
        return (
          <span className={`${base} text-orange-600 bg-orange-300`}>
            Declined
          </span>
        );
      case "done":
        return (
          <span className={`${base} text-green-700 bg-green-300`}>Done</span>
        );
      case "delivered":
        return (
          <span className={`${base} text-blue-700 bg-blue-300`}>
            Delivering
          </span>
        );
      case "in_transit":
        return (
          <span className={`${base} text-yellow-700 bg-yellow-300`}>
            Waiting
          </span>
        );
      default:
        return (
          <span className={`${base} text-gray-600 bg-gray-400`}>{status}</span>
        );
    }
  };

  return (
    <div className="w-full bg-white">
      <div className="w-full px-4 py-6 caret-transparent mb-20">
        <Heading icons={FaMoneyBillWave} title="Order Detail" />

        <div className="mt-4 flex justify-between items-start flex-wrap gap-2">
          <p className="text-sm md:text-base text-gray-600">
            <span className="font-semibold text-black">Order ID:</span>{" "}
            {orderData.orderId}
          </p>
          <div>{renderStatus(status)}</div>
        </div>

        <p className="text-sm md:text-base text-gray-600 mt-1">
          <span className="font-semibold text-black">Date:</span>{" "}
          {new Date(date).toLocaleString()}
        </p>

        <p className="text-sm md:text-base text-gray-600 mt-1">
          <span className="font-semibold text-black">Payment:</span>{" "}
          <span className="text-teal-500 font-semibold">PayOS</span>
        </p>

        <p className="text-sm md:text-base text-gray-600 mt-1">
          <span className="font-semibold text-black">Shipping:</span>{" "}
          <span className="text-orange-500 font-semibold">GiaoHangNhanh</span>
        </p>

        {/* Delivery ID */}
        <p className="text-sm md:text-base text-gray-600 mt-1 flex flex-row mb-5">
          <span className="font-semibold text-black">Delivery ID:</span>{" "}
          <span className="text-gray-800">
            {orderData.transactionNo ? (
              <div>
                {orderData.transactionNo}
                {deliveryLink && (
                  <button
                    onClick={() => window.open(deliveryLink, "_blank")}
                    className="ml-4 text-indigo-500 hover:text-indigo-700 hover:underline text-sm font-medium transition"
                  >
                    (Track)
                  </button>
                )}
              </div>
            ) : (
              <span className="italic text-gray-500">No Delivery</span>
            )}
          </span>
        </p>

        {/* Product List */}
        <div className="mt-6 border border-gray-400 rounded-md overflow-hidden">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-pink-200 text-gray-700 font-semibold">
              <tr>
                <th className="px-4 py-2 text-left border-b border-gray-400">
                  Product
                </th>
                <th className="px-4 py-2 text-center border-b border-gray-400">
                  Price
                </th>
                <th className="px-4 py-2 text-center border-b border-gray-400">
                  Quantity
                </th>
                <th className="px-4 py-2 text-right border-b border-gray-400">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {details.map((item, index) => (
                <tr key={index} className="hover:bg-blue-50">
                  <td className="px-4 py-2 border-b border-gray-100">
                    {item.productName}
                  </td>
                  <td className="px-4 py-2 text-center border-b border-gray-100">
                    {Number(item.price).toLocaleString()} {currency}
                  </td>
                  <td className="px-4 py-2 text-center border-b border-gray-100">
                    {item.quantity}
                  </td>
                  <td className="px-4 py-2 text-right border-b border-gray-100">
                    {Number(item.total).toLocaleString()} {currency}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Amount */}
        <div className="mt-4 text-right">
          <p className="text-xl font-bold text-green-700">
            Total: {totalAmount.toLocaleString()} {currency}
          </p>
        </div>

        {/* Support */}
        <p className="text-base text-gray-700 mt-6">
          <span className="text-red-500">*</span> Your order will be processed
          in 24 hours. If you have any problems, please contact{" "}
          <Link
            to="/support"
            className="text-sky-500 underline hover:text-sky-700 transition duration-300"
          >
            Support
          </Link>
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default OrderDetail;
