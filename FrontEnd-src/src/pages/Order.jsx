import React, { useEffect } from "react";
import useOrder from "../hook/useOrder";
import { toast } from "react-toastify";
import Heading from "../components/Heading";
import { FaMoneyBillWave } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Order = () => {
  const { myOrders, handleGetMyOrders, setSelectedOrderDetail } = useOrder();
  const navigate = useNavigate();

  const getMyOrder = async () => {
    const res = await handleGetMyOrders();
    if (!res.success) {
      switch (res.status) {
        case 403:
          toast.error("Session expired, please login again");
          break;
        case 0:
          toast.error("Something went wrong, please login again");
          break;
        default:
          toast.error("Something went wrong, please login again");
          break;
      }
    }
  };

  useEffect(() => {
    getMyOrder();
  }, []);

  const renderStatus = (status) => {
    const base = "text-xs px-3 py-1 rounded-full font-semibold inline-block";

    switch (status) {
      case "cancel":
        return (
          <span className={`${base} text-red-700 bg-red-100`}>Cancel</span>
        );
      case "return_requested":
        return (
          <span className={`${base} text-orange-700 bg-orange-200`}>
            Declined
          </span>
        );
      case "done":
        return (
          <span className={`${base} text-green-700 bg-green-100`}>Done</span>
        );
      case "delivered":
        return (
          <span className={`${base} text-blue-700 bg-blue-100`}>
            Delivering
          </span>
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
        <Heading icons={FaMoneyBillWave} title="List Orders" />

        {myOrders && myOrders.length > 0 ? (
          <div className="mt-6 overflow-x-auto border-gray-300">
            <table className="w-full text-sm border border-gray-300 border-collapse table-fixed rounded-md overflow-hidden ">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Order ID
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Date
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Total Items
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-right">
                    Total Amount
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {myOrders.map((order, index) => {
                  const totalAmount = order.details.reduce(
                    (sum, item) => sum + item.total,
                    0
                  );
                  const totalQuantity = order.details.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                  );
                  const rowBg = index % 2 === 0 ? "bg-white" : "bg-gray-50";

                  return (
                    <tr
                      key={order.orderId}
                      className={`${rowBg} bg-white hover:bg-gray-100 cursor-pointer`}
                      onClick={() => {
                        setSelectedOrderDetail(order);
                        navigate(`/orders/${order.orderId}`);
                      }}
                    >
                      <td className="border border-gray-300 px-4 py-2 text-sky-800 font-semibold">
                        {order.orderId}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-500">
                        {new Date(order.date).toLocaleString()}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-gray-500">
                        {totalQuantity}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-right text-red-800 font-medium">
                        {totalAmount.toLocaleString()}₫
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {renderStatus(order.status)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center mt-12 flex flex-col items-center">
            <p className="text-lg font-medium mb-4">You have no orders yet</p>
            <Link
              to="/cart"
              className="border border-black px-6 py-2 text-sm font-medium hover:underline"
            >
              Go Shopping
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Order;
