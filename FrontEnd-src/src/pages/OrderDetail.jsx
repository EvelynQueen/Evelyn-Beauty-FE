import React, { useEffect, useState } from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Heading from "../components/Heading";
import useOrder from "../hook/useOrder";
import useProduct from "../hook/useProduct";
import Footer from "../components/Footer";

const OrderDetail = () => {
  const { orderId } = useParams();
  const { selectedOrderDetail } = useOrder();
  const { currency } = useProduct();

  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    // Ưu tiên lấy từ context trước
    if (selectedOrderDetail && selectedOrderDetail.orderId === orderId) {
      setOrderData(selectedOrderDetail);
      localStorage.setItem(
        "selectedOrderDetail",
        JSON.stringify(selectedOrderDetail)
      );
    } else {
      // Nếu không có, thử lấy từ localStorage
      const stored = localStorage.getItem("selectedOrderDetail");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.orderId === orderId) {
          setOrderData(parsed);
        }
      }
    }
  }, [selectedOrderDetail, orderId]);

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
          <span className={`${base} text-red-700 bg-red-100`}>Cancel</span>
        );
      case "return_requested":
        return (
          <span className={`${base} text-orange-600 bg-orange-100`}>
            Declined
          </span>
        );
      case "done":
        return (
          <span className={`${base} text-green-700 bg-green-100`}>Done</span>
        );
      case "return_approved":
        return (
          <span className={`${base} text-blue-700 bg-blue-100`}>Approved</span>
        );
      case "in_transit":
        return (
          <span className={`${base} text-yellow-700 bg-yellow-100`}>
            Waiting
          </span>
        );
      default:
        return (
          <span className={`${base} text-gray-600 bg-gray-200`}>{status}</span>
        );
    }
  };

  return (
    <div className="w-full">
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
          <span className="text-red-500 font-semibold">VN</span>
          <span className="text-blue-700 font-semibold">PAY</span>
        </p>

        <p className="text-sm md:text-base text-gray-600 mt-1">
          <span className="font-semibold text-black">Shipping:</span>{" "}
          <span className="text-orange-600 font-semibold">GiaoHangNhanh</span>
        </p>

        {/* Danh sách sản phẩm */}
        <div className="mt-6 border border-gray-200 rounded-md overflow-hidden">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                <th className="px-4 py-2 text-left border-b border-gray-200">
                  Product
                </th>
                <th className="px-4 py-2 text-center border-b border-gray-200">
                  Price
                </th>
                <th className="px-4 py-2 text-center border-b border-gray-200">
                  Quantity
                </th>
                <th className="px-4 py-2 text-right border-b border-gray-200">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {details.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
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

        {/* Tổng tiền */}
        <div className="mt-4 text-right">
          <p className="text-xl font-bold text-green-700">
            Total: {totalAmount.toLocaleString()} {currency}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderDetail;
