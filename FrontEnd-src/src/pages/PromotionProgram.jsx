// src/pages/PromotionProgram.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { usePromotions } from "../hook/usePromotions";

const PromotionProgram = () => {
  const navigate = useNavigate();
  const { promotions, loading, error, refetch } = usePromotions();

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString();
  };

  const formatValue = (val) => {
    return val !== undefined && val !== null
      ? `${(val * 100).toFixed(0)}%`
      : "-";
  };

  return (
    <div className="p-4">
      <button
        onClick={() => navigate("/add-promotion")}
        className="bg-black text-white px-4 py-2 rounded mb-4"
      >
        + Add Promotion
      </button>

      <h2 className="text-2xl font-semibold text-green-700 mb-4">
        Promotion Program List
      </h2>

      {loading ? (
        <p>Loading promotions...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full text-sm table-auto border-collapse rounded-lg overflow-hidden">
            <thead className="bg-green-100 text-left text-sm">
              <tr>
                <th className="p-2 border">Program ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Condition 1</th>
                <th className="p-2 border">Condition 2</th>
                <th className="p-2 border">Value</th>
                <th className="p-2 border">Start Date</th>
                <th className="p-2 border">End Date</th>
                <th className="p-2 border">Created By</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {promotions.map((promo) => (
                <tr key={promo.programId} className="hover:bg-gray-100">
                  <td className="p-2 border">{promo.programId}</td>
                  <td className="p-2 border">{promo.name}</td>
                  <td className="p-2 border">
                    {promo.condition1
                      ? Number(promo.condition1).toLocaleString()
                      : "-"}
                  </td>
                  <td className="p-2 border">
                    {promo.condition2 ? promo.condition2 : "-"}
                  </td>
                  <td className="p-2 border">{formatValue(promo.value)}</td>
                  <td className="p-2 border">{formatDate(promo.startDate)}</td>
                  <td className="p-2 border">{formatDate(promo.endDate)}</td>
                  <td className="p-2 border">{promo.accountId}</td>
                  <td className="p-2 border text-red-600 cursor-pointer">
                    <button
                      onClick={() =>
                        handleDeletePromotion(promo.programId, refetch)
                      }
                    >
                      Delete
                    </button>
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

export default PromotionProgram;
