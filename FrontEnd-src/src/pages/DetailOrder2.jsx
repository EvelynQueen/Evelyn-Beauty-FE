// src/pages/DetailOrder2.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useProduct from "../hook/useProduct";
import ApprovedPopUp from "../components/ApprovedPopUp";
import { IoIosArrowBack } from "react-icons/io";
import { BsArchiveFill } from "react-icons/bs";

const DetailOrder2 = () => {
  const { orderId } = useParams();
  const { currency } = useProduct();
  const [openApproved, setOpenApproved] = useState(false);

  const stored = localStorage.getItem("selectedOrder");
  const selectedOrder = stored ? JSON.parse(stored) : null;

  const isApprovable = selectedOrder?.status === "in_transit";

  const renderStatus = (status) => {
    switch (status) {
      case "return_requested":
      case "cancel":
        return "Declined";
      case "return_approved":
        return "Approved";
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
      {/* Back button */}
      <button
        onClick={() => window.history.back()}
        className="w-full flex items-center mb-5 cursor-pointer"
      >
        <IoIosArrowBack />
        <p className="text-base ml-2">Back</p>
      </button>
      <hr className="w-full bg-gray-500 mb-5" />

      {/* Title */}
      <div className="w-full flex items-center mb-10 gap-1 text-base">
        <BsArchiveFill />
        <p>Order Detail</p>
      </div>

      {/* Status Section */}
      <div className="w-full max-w-5xl flex justify-end mb-5">
        {isApprovable ? (
          <button
            onClick={() => setOpenApproved(true)}
            className="text-yellow-800 bg-yellow-100 hover:bg-yellow-200 px-4 py-2 rounded-full font-semibold"
          >
            Waiting for Approve
          </button>
        ) : (
          <span
            className={`inline-block px-4 py-2 rounded-full font-semibold ${
              selectedOrder?.status === "done"
                ? "bg-green-100 text-green-700"
                : selectedOrder?.status === "return_requested" ||
                  selectedOrder?.status === "cancel"
                ? "bg-red-100 text-red-700"
                : "bg-blue-200 text-blue-600"
            }`}
          >
            {renderStatus(selectedOrder?.status)}
          </span>
        )}
      </div>

      <div className="w-full flex flex-row justify-between px-16 gap-8 mb-10">
        {/* General Information */}
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-sky-600 mb-2">
            General Information
          </h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="inline-block w-48 font-semibold text-black">
                Assigned Staff ID:
              </span>
              <span className="text-gray-800">
                {selectedOrder?.accountId === "AC000"
                  ? "Waiting for approved"
                  : selectedOrder?.accountId}
              </span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-48 font-semibold text-black">
                Assigned Staff:
              </span>
              <span className="text-gray-800">
                {selectedOrder?.accountId === "AC000"
                  ? "Waiting for approved"
                  : selectedOrder?.account?.name ?? "—"}
              </span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-48 font-semibold text-black">
                Total:
              </span>
              <span className="text-gray-800">
                {Number(selectedOrder?.total_final ?? 0).toLocaleString()}{" "}
                {currency}
              </span>
            </div>
            {/* status-specific block */}
            <div className="mt-4">
              {selectedOrder.status === "cancel" ? (
                <p className="text-red-600 italic">
                  Cancel Reason:{" "}
                  <span className="text-gray-800">
                    {selectedOrder?.details?.[0]?.comment ?? "No reason"}
                  </span>
                </p>
              ) : selectedOrder.status === "done" ? (
                selectedOrder?.details?.[0]?.rate != null ? (
                  <div className="flex flex-col gap-2">
                    <p className="font-semibold">
                      Rate: {selectedOrder.details[0].rate} ⭐
                    </p>
                    {selectedOrder.details[0].imageEvaluate ? (
                      <img
                        src={selectedOrder.details[0].imageEvaluate}
                        alt="Evaluation"
                        className="w-32 h-32 object-cover rounded"
                      />
                    ) : (
                      <p className="text-gray-500 italic">
                        Waiting for customer to upload evaluation image
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">
                    Waiting for customer to rate
                  </p>
                )
              ) : null}
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-sky-600 mb-2">
            Customer Information
          </h3>
          <div className="grid grid-cols-[150px_1fr] gap-x-4 gap-y-2">
            <div className="font-semibold">Name:</div>
            <div className="text-gray-800">
              {selectedOrder?.profile?.name ?? "—"}
            </div>

            <div className="font-semibold">Phone Number:</div>
            <div className="text-gray-800">
              {selectedOrder?.profile?.phone ?? "—"}
            </div>

            <div className="font-semibold">Address:</div>
            <div className="text-gray-800">
              {selectedOrder?.profile?.address ?? "—"}
            </div>
          </div>
        </div>
      </div>

      {/* Approve PopUp */}
      {openApproved && (
        <ApprovedPopUp
          orderId={orderId}
          onClose={() => setOpenApproved(false)}
        />
      )}

      {/* Products List */}
      <div className="w-full flex flex-col items-center bg-white text-black px-4">
        <div className="w-full max-w-5xl flex items-center gap-4 py-3 border-b border-gray-300 font-semibold text-base text-gray-700">
          <div className="flex-[1] text-center">Image</div>
          <div className="flex-[5] text-center">Product</div>
          <div className="flex-[1] text-center">Price</div>
          <div className="flex-[1] text-center">Quantity</div>
        </div>

        {selectedOrder?.details?.map((item) => (
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
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-base font-semibold text-gray-900">
                  {item.product?.name}
                </p>
                <p className="text-sm text-gray-700">
                  {item.classification_id.name}
                </p>
              </div>
              <div className="w-32 text-center text-base text-gray-800">
                {Number(item.product?.price).toLocaleString()} {currency}
              </div>
              <div className="w-24 text-center text-base text-green-600">
                {item.quantity}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailOrder2;
