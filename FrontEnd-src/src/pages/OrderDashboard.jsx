import { useEffect } from "react";
import useOrder from "../hook/useOrder";
import { toast } from "react-toastify";
import ApprovedPopUp from "../components/ApprovedPopUp";

const OrderDashboard = () => {
  const { allOrders, handleGetAllOrders, selectedOrderId, setSelectedOrderId } =
    useOrder();
  const getAllOrder = async () => {
    const res = await handleGetAllOrders();
    console.log(allOrders);

    if (!res.success) {
      switch (res.status) {
        case 403:
          toast.error("Session expired, please login again");
          break;
        case 404:
          toast.error("Orders not found !");
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
    getAllOrder();
  }, [allOrders]);

  return (
    <div className="w-full flex flex-col justify-start items-center p-10">
      {!allOrders || allOrders.length === 0 ? (
        <div className="text-gray-500 text-lg font-medium italic">
          🚫 No Orders here!
        </div>
      ) : (
        <div className="w-full rounded-xl overflow-hidden border border-gray-300 shadow-md caret-transparent">
          {selectedOrderId !== null && (
            <ApprovedPopUp
              orderId={selectedOrderId}
              onClose={() => setSelectedOrderId(null)}
            />
          )}

          <table className="table-auto w-full text-center border-collapse">
            <thead className="bg-gradient-to-r from-green-100 to-green-200 text-gray-700 font-semibold text-sm uppercase tracking-wider">
              <tr>
                <th className="border border-gray-200 px-6 py-3">Order ID</th>
                <th className="border border-gray-200 px-6 py-3">Account ID</th>
                <th className="border border-gray-200 px-6 py-3">
                  Shipping Info
                </th>
                <th className="border border-gray-200 px-6 py-3">
                  Payment Date
                </th>
                <th className="border border-gray-200 px-6 py-3">Status </th>
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
                    {order.orderId}
                  </td>
                  <td className="border border-gray-200 px-6 py-4">
                    {order.accountId}
                  </td>
                  <td className="border border-gray-200 px-6 py-4">
                    {order.deliveryId}
                  </td>
                  <td className="border border-gray-200 px-6 py-4">
                    {new Date(order.date).toLocaleDateString("vi-VN")}
                  </td>
                  <td
                    className="border border-gray-200 px-6 py-4"
                    onClick={() => {
                      if (order.status === "in_transit") {
                        setSelectedOrderId(order.orderId);
                      } else {
                        toast.info(
                          "Only orders that are 'waiting' can be modified."
                        );
                      }
                    }}
                  >
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold
      ${
        order.status === "return_requested" || order.status === "cancel"
          ? "bg-red-100 text-red-700"
          : order.status === "return_approved"
          ? "bg-blue-100 text-blue-700"
          : order.status === "in_transit"
          ? "bg-yellow-100 text-yellow-800"
          : order.status === "done"
          ? "bg-green-100 text-green-700"
          : "bg-gray-100 text-gray-700"
      }`}
                    >
                      {order.status === "return_requested" ||
                      order.status === "cancel"
                        ? "Decline"
                        : order.status === "return_approved"
                        ? "In Progress"
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
