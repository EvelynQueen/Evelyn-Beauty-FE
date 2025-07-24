import useOrder from "../hook/useOrder";
import { toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";

const ApprovedPopUp = ({ orderId, onClose }) => {
  const {
    handleRejectOrder,
    handleApprovedOrder,
    setSelectedOrderId,
    setSelectedOrder,
  } = useOrder();

  const rejectOrder = async (orderId) => {
    const res = await handleRejectOrder(orderId);
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
    } else {
      setSelectedOrder((prev) => ({
        ...prev,
        status: "return_approved",
      }));
      toast.success("Order Rejected!");
      onClose();
    }
  };
  const approveOrder = async (orderId) => {
    const res = await handleApprovedOrder(orderId);
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
    } else {
      setSelectedOrder((prev) => ({
        ...prev,
        status: "return_approved",
      }));
      toast.success("Order Approved!");
      onClose();
    }
  };

  const handleDecline = () => {
    rejectOrder(orderId);
    setSelectedOrderId(null);
  };

  const handleApprove = () => {
    approveOrder(orderId);
    setSelectedOrderId(null);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm caret-transparent">
      <div className="relative bg-pink-50 w-[500px] min-h-[250px] rounded-2xl shadow-2xl p-8 flex flex-col justify-around items-center gap-6">
        <div className="absolute top-4 right-4 z-10">
          <IoMdClose
            size={24}
            onClick={onClose}
            className="cursor-pointer text-gray-500 hover:text-gray-700 transition"
          />
        </div>

        <p className="text-base md:text-xl text-black text-center leading-relaxed">
          ❓ Are you sure you want to
          <span className="text-red-600 font-bold mx-1">Decline</span>
          or
          <span className="text-green-600 font-bold mx-1">Approve</span>
          this order?
        </p>
        <p className="text-base md:text-xl font-semibold text-red-900">
          {orderId}
        </p>

        <div className="flex w-full justify-evenly">
          <button
            onClick={handleDecline}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full text-sm font-medium shadow-md transition"
          >
            Decline
          </button>
          <button
            onClick={handleApprove}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full text-sm font-medium shadow-md transition"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApprovedPopUp;
