import React, { useEffect, useState } from "react";
import useOrder from "../hook/useOrder";
import { toast } from "react-toastify";
import Heading from "../components/Heading";
import { FaMoneyBillWave } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Order = () => {
  const { myOrders, handleGetMyOrders, setSelectedOrderDetail } = useOrder();
  const navigate = useNavigate();

  const [filterFromDate, setFilterFromDate] = useState("");
  const [filterToDate, setFilterToDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterOrderId, setFilterOrderId] = useState("");
  const [filterMinAmount, setFilterMinAmount] = useState("");
  const [filterMaxAmount, setFilterMaxAmount] = useState("");

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

  const filteredOrders = myOrders.filter((order) => {
    const orderDate = new Date(order.date);
    const totalAmount = order.details.reduce(
      (sum, item) => sum + item.total,
      0
    );
    const isDateMatch =
      (!filterFromDate || orderDate >= new Date(filterFromDate)) &&
      (!filterToDate || orderDate <= new Date(filterToDate));
    const isStatusMatch = !filterStatus || order.status === filterStatus;
    const isOrderIdMatch =
      !filterOrderId ||
      order.orderId.toLowerCase().includes(filterOrderId.toLowerCase());
    const isAmountMatch =
      (!filterMinAmount || totalAmount >= filterMinAmount) &&
      (!filterMaxAmount || totalAmount <= filterMaxAmount);

    return isDateMatch && isStatusMatch && isOrderIdMatch && isAmountMatch;
  });

  return (
    <div className="w-full">
      <div className="w-full px-4 py-6 caret-transparent mb-20">
        <Heading icons={FaMoneyBillWave} title="List Orders" />

        {/* Filter Section */}
        <div className="mb-6 flex gap-4">
          <div>
            <label htmlFor="fromDate" className="text-sm">
              From Date
            </label>
            <input
              id="fromDate"
              type="date"
              value={filterFromDate}
              onChange={(e) => setFilterFromDate(e.target.value)}
              className="border p-2 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="toDate" className="text-sm">
              To Date
            </label>
            <input
              id="toDate"
              type="date"
              value={filterToDate}
              onChange={(e) => setFilterToDate(e.target.value)}
              className="border p-2 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="status" className="text-sm">
              Status
            </label>
            <select
              id="status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border p-2 rounded-md"
            >
              <option value="">All</option>
              <option value="cancel">Cancel</option>
              <option value="return_requested">Declined</option>
              <option value="done">Done</option>
              <option value="delivered">Delivering</option>
              <option value="in_transit">Waiting</option>
            </select>
          </div>
          <div>
            <label htmlFor="orderId" className="text-sm">
              Order ID
            </label>
            <input
              id="orderId"
              type="text"
              value={filterOrderId}
              onChange={(e) => setFilterOrderId(e.target.value)}
              className="border p-2 rounded-md"
              placeholder="Search by Order ID"
            />
          </div>
          <div>
            <label htmlFor="minAmount" className="text-sm">
              Min Total Amount
            </label>
            <input
              id="minAmount"
              type="number"
              value={filterMinAmount}
              onChange={(e) => setFilterMinAmount(e.target.value)}
              className="border p-2 rounded-md"
              placeholder="Min Amount"
            />
          </div>
          <div>
            <label htmlFor="maxAmount" className="text-sm">
              Max Total Amount
            </label>
            <input
              id="maxAmount"
              type="number"
              value={filterMaxAmount}
              onChange={(e) => setFilterMaxAmount(e.target.value)}
              className="border p-2 rounded-md"
              placeholder="Max Amount"
            />
          </div>
        </div>

        {filteredOrders && filteredOrders.length > 0 ? (
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
                {filteredOrders.map((order, index) => {
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
              className="border rounded-md border-black px-6 py-2 text-sm font-medium hover:bg-black hover:text-white transition-all duration-150"
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
