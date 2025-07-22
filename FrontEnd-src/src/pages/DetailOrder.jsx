import { useParams } from "react-router-dom";
import useOrder from "../hook/useOrder";
import { IoIosArrowBack } from "react-icons/io";
import { BsArchiveFill } from "react-icons/bs";
import useProduct from "../hook/useProduct";
import ApprovedPopUp from "../components/ApprovedPopUp";
import { useState } from "react";

const DetailOrder = () => {
  const { orderId } = useParams();
  const { currency } = useProduct();
  const { selectedOrder } = useOrder();
  const [openApproved, setOpenApproved] = useState(false);

  const isApprovable = selectedOrder?.status === "in_transit";

  // status mapping
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
        className="w-full flex flex-row justify-start items-center mb-5 caret-transparent cursor-pointer"
      >
        <IoIosArrowBack />
        <p className="text-sm md:text-base ml-2">Back</p>
      </button>
      <hr className="w-full bg-gray-500 mb-5 caret-transparent" />

      {/* Title */}
      <div className="w-full flex flex-row items-center justify-start mb-10 gap-1 text-base md:text-base caret-transparent">
        <BsArchiveFill />
        <p>Order Detail</p>
      </div>

      {/* Status Section */}
      <div className="w-full max-w-5xl flex justify-end mb-5">
        {isApprovable ? (
          <button
            onClick={() => setOpenApproved(true)}
            className="text-yellow-800 bg-yellow-100 hover:bg-yellow-200 transition px-4 py-2 rounded-full text-sm font-semibold"
          >
            Waiting for Approve
          </button>
        ) : (
          <span
            className={`inline-block px-4 py-2 rounded-full text-sm font-semibold
              ${
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

      {/* Approve PopUp */}
      {openApproved && (
        <ApprovedPopUp
          orderId={orderId}
          onClose={() => setOpenApproved(false)}
        />
      )}

      {/* Product Table */}
      <div className="w-full flex flex-col items-center bg-white text-black px-4">
        <div className="w-full max-w-5xl flex flex-row items-center gap-4 py-3 border-b border-gray-300 font-semibold text-base text-gray-700">
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
                <p className="text-sm text-gray-500">
                  Category: {item.classificationId}
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

export default DetailOrder;
