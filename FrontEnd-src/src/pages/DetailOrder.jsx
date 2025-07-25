import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProduct from "../hook/useProduct";
import useOrder from "../hook/useOrder";
import ApprovedPopUp from "../components/ApprovedPopUp";
import { IoIosArrowBack } from "react-icons/io";
import { BsArchiveFill } from "react-icons/bs";
import { toast } from "react-toastify";

const DetailOrder = () => {
  const { orderId } = useParams();
  const { currency } = useProduct();
  const {
    selectedOrder,
    setSelectedOrder,
    handleTrackingDelivery,
    deliveryLink,
    handleMarkOrderDone,
  } = useOrder();

  const [openApproved, setOpenApproved] = useState(false);

  // Khôi phục selectedOrder nếu reload
  useEffect(() => {
    if (!selectedOrder) {
      const savedOrder = localStorage.getItem("selectedOrder");
      if (savedOrder) {
        setSelectedOrder(JSON.parse(savedOrder));
      }
    }
  }, [selectedOrder, setSelectedOrder]);

  // Gọi tracking nếu có transaction_no
  useEffect(() => {
    const transactionNo = selectedOrder?.delivery?.transaction_no;
    if (transactionNo) {
      (async () => {
        const res = await handleTrackingDelivery(transactionNo);
        if (!res.success) {
          toast.error("Something went wrong, please login again");
        }
      })();
    }
  }, [selectedOrder]);

  if (!selectedOrder) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-gray-500 italic text-lg">
        Loading order details...
      </div>
    );
  }

  const isApprovable = selectedOrder.status === "in_transit";

  const renderStatus = (status) => {
    switch (status) {
      case "return_requested":
      case "cancel":
        return "Declined";
      case "return_approved":
        return "Approved";
      case "delivered":
        return "Delivered";
      case "in_transit":
        return "Waiting for Approve";
      case "done":
        return "Done";
      default:
        return status;
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center px-4 py-2">
      <button
        onClick={() => window.history.back()}
        className="w-full flex items-center mb-5 cursor-pointer"
      >
        <IoIosArrowBack />
        <p className="text-base ml-2">Back</p>
      </button>
      <hr className="w-full bg-gray-500 mb-5" />

      <div className="w-full flex items-center mb-10 gap-1 text-base">
        <BsArchiveFill />
        <p>Order Detail</p>
      </div>

      {/* Status + Action */}
      <div className="w-full max-w-5xl flex justify-end mb-5">
        {isApprovable ? (
          <button
            onClick={() => setOpenApproved(true)}
            className="text-yellow-800 bg-yellow-100 hover:bg-yellow-200 px-4 py-2 rounded-full font-semibold"
          >
            Waiting for Approve
          </button>
        ) : selectedOrder.status === "delivered" ? (
          <button
            onClick={async () => {
              const confirm = window.confirm(
                "Are you sure this order is Done?"
              );
              if (confirm) {
                const res = await handleMarkOrderDone(orderId);
                if (res.success) {
                  toast.success("Order marked as done");
                } else {
                  toast.error("Failed to mark as done");
                }
              }
            }}
            className="bg-sky-100 text-sky-800 px-4 py-2 rounded-full font-semibold hover:bg-sky-200 transition"
          >
            Delivered (Click to Mark as Done)
          </button>
        ) : (
          <span
            className={`inline-block px-4 py-2 rounded-full font-semibold ${
              selectedOrder.status === "done"
                ? "bg-green-100 text-green-700"
                : selectedOrder.status === "return_requested" ||
                  selectedOrder.status === "cancel"
                ? "bg-red-100 text-red-700"
                : "bg-blue-200 text-blue-600"
            }`}
          >
            {renderStatus(selectedOrder.status)}
          </span>
        )}
      </div>

      {/* General + Customer Info */}
      <div className="w-full flex flex-row justify-between px-16 gap-8 mb-10">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-sky-600 mb-2">
            General Information
          </h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="inline-block w-48 font-semibold text-black">
                Assigned Staff:
              </span>
              <span className="text-gray-800">
                {selectedOrder.accountId === "AC000"
                  ? "Waiting for approval"
                  : selectedOrder.account?.name ?? "—"}
              </span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-48 font-semibold text-black">
                Delivery ID:
              </span>
              <span className="text-gray-800">
                {selectedOrder.deliveryId ? (
                  <>
                    {selectedOrder.deliveryId}
                    {deliveryLink && (
                      <button
                        onClick={() => window.open(deliveryLink, "_blank")}
                        className="ml-4 text-blue-600 hover:underline cursor-pointer text-sm font-medium"
                      >
                        (Track)
                      </button>
                    )}
                  </>
                ) : (
                  <span className="italic text-gray-500">No Delivery</span>
                )}
              </span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-48 font-semibold text-black">
                Total Before Discount:
              </span>
              <span className="text-gray-800">
                {Number(selectedOrder.total_before).toLocaleString()} {currency}
              </span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-48 font-semibold text-black">
                Discount:
              </span>
              <span className="text-gray-800">
                {Number(selectedOrder.discount).toLocaleString()} {currency}
              </span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-48 font-semibold text-black">
                Final Total:
              </span>
              <span className="text-gray-800">
                {Number(selectedOrder.total_final).toLocaleString()} {currency}
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-lg text-sky-600 mb-2">
            Customer Information
          </h3>
          <div className="grid grid-cols-[150px_1fr] gap-x-4 gap-y-2">
            <div className="font-semibold">Name:</div>
            <div>{selectedOrder.profile?.name ?? "—"}</div>

            <div className="font-semibold">Phone:</div>
            <div>{selectedOrder.profile?.phone ?? "—"}</div>

            <div className="font-semibold">Address:</div>
            <div>{selectedOrder.profile?.address ?? "—"}</div>
          </div>
        </div>
      </div>

      {openApproved && (
        <ApprovedPopUp
          orderId={orderId}
          onClose={() => setOpenApproved(false)}
        />
      )}

      {/* Product List */}
      <div className="w-full flex flex-col items-center bg-white text-black px-4">
        <div className="w-full max-w-5xl flex items-center gap-4 py-3 border-b border-gray-300 font-semibold text-base text-gray-700">
          <div className="flex-[1] text-center">Image</div>
          <div className="flex-[5] text-center">Product</div>
          <div className="flex-[1] text-center">Price</div>
          <div className="flex-[1] text-center">Quantity</div>
        </div>

        {selectedOrder.details?.map((item) => (
          <div
            key={item.orderDetailId}
            className="w-full max-w-5xl rounded-lg bg-gray-50 border border-gray-200 p-4 mt-4 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-24 h-24">
                <img
                  src={item.product?.image_1}
                  alt={item.product?.name}
                  className="w-full h-full object-cover border border-gray-300 rounded"
                />
              </div>
              <div className="flex-1">
                <p className="text-base font-semibold">{item.product?.name}</p>
                <p className="text-sm text-gray-700">
                  {item.classification_id.name}
                </p>
              </div>
              <div className="w-32 text-center">
                {Number(item.product?.price).toLocaleString()} {currency}
              </div>
              <div className="w-24 text-center text-green-600">
                {item.quantity}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailOrder;
