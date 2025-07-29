import React from "react";
import { useNavigate } from "react-router-dom";
import { usePromotions } from "../hook/usePromotions";
import { deletePromotionSF } from "../api/promotionProgramAPI";
import { toast } from "react-toastify";

const PromotionProgram = () => {
  const navigate = useNavigate();
  const { promotions, loading, error, refetch } = usePromotions();

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatValue = (val, type) => {
    if (val === null || val === undefined) return "-";
    if (type === "VND") {
      return `${Number(val).toLocaleString("vi-VN")} VND`;
    }
    return `${(val * 100).toFixed(0)}%`;
  };

  const handleDelete = async (programId) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc muốn xoá chương trình này?"
    );
    if (!confirmDelete) return;

    try {
      const res = await deletePromotionSF(programId);
      if (res && res.status === 200) {
        toast.success("Promotion deleted successfully!");
        refetch();
      } else {
        toast.error(res?.data?.message || "Delete failed!");
      }
    } catch (err) {
      toast.error("Server error while deleting.");
      console.error("Lỗi khi xoá promotion:", err);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Promotion Program List
        </h1>
        <button
          onClick={() => navigate("/add-promotion")}
          className="bg-black text-white px-5 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
        >
          + Add Promotion
        </button>
      </div>

      {loading ? (
        <p>Loading promotions...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header - Thay đổi thành grid-cols-10 */}
          <div className="hidden md:grid grid-cols-10 gap-4 px-6 py-3 bg-indigo-100 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">
            <div className="col-span-1">Program ID</div>
            <div className="col-span-2">Name</div>
            <div className="col-span-1">Condition 1</div>
            <div className="col-span-1">Condition 2</div> {/* THÊM CỘT MỚI */}
            <div className="col-span-1">Value</div>
            <div className="col-span-1">Start Date</div>
            <div className="col-span-1">End Date</div>
            <div className="col-span-1">Created By</div>
            <div className="col-span-1 text-center">Action</div>
          </div>

          {/* Body */}
          <div className="flex flex-col">
            {promotions.map((promo) =>
              promo.programId !== "PG000" ? (
                <div
                  key={promo.programId}
                  // Thay đổi thành grid-cols-10
                  className="grid grid-cols-1 md:grid-cols-10 gap-4 px-6 py-3 items-center border-t border-gray-200 hover:bg-gray-50 text-sm"
                >
                  <div className="md:col-span-1 font-semibold text-blue-600 hover:underline cursor-pointer truncate">
                    <span className="md:hidden font-bold mr-2 text-gray-600">
                      ID:
                    </span>
                    {promo.programId}
                  </div>
                  <div className="md:col-span-2 text-gray-900 font-medium truncate">
                    {promo.name}
                  </div>
                  <div className="md:col-span-1 text-gray-700">
                    {formatValue(promo.condition1, "VND")}
                  </div>
                  {/* THÊM DỮ LIỆU CHO CỘT MỚI */}
                  <div className="md:col-span-1 text-gray-700">
                    {promo.condition2 || "-"}
                  </div>
                  <div className="md:col-span-1 font-bold text-green-600">
                    {formatValue(promo.value, "PERCENT")}
                  </div>
                  <div className="md:col-span-1 text-gray-600">
                    {formatDate(promo.startDate)}
                  </div>
                  <div className="md:col-span-1 text-gray-600">
                    {formatDate(promo.endDate)}
                  </div>
                  <div className="md:col-span-1 text-gray-700 truncate">
                    {promo.accountId}
                  </div>
                  <div className="md:col-span-1 text-center">
                    <button
                      onClick={() => handleDelete(promo.programId)}
                      className="font-semibold text-red-500 hover:text-red-700 transition-colors hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PromotionProgram;
