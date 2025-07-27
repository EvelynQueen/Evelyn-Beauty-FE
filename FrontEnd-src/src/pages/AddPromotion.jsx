import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPromotionSF } from "../api/promotionProgramAPI";
import { usePromotions } from "../hook/usePromotions";
import { toast } from "react-toastify";

const AddPromotion = () => {
  const [form, setForm] = useState({
    name: "",
    condition1: "",
    condition2: "",
    startDate: "",
    endDate: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { refetch } = usePromotions();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name: form.name,
        condition1: form.condition1,
        condition2: form.condition2 || null,
        startDate: form.startDate,
        endDate: form.endDate,
      };
      console.log("Payload gửi lên:", payload);
      const { success } = await addPromotionSF(payload);

      if (success) {
        toast.success("Promotion created successfully!");
        await refetch();
        navigate("/promotions");
      } else {
        toast.error("Failed to create promotion.");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Error creating promotion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-green-700">
        Add New Promotion
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-4 flex flex-col gap-4"
      >
        <input
          name="name"
          placeholder="Promotion Name (e.g. 25% off orders)"
          className="border px-3 py-2 rounded"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="condition1"
          placeholder="Condition 1 (e.g., 1000000)"
          type="number"
          className="border px-3 py-2 rounded"
          value={form.condition1}
          onChange={handleChange}
          required
        />

        <input
          name="condition2"
          placeholder="Condition 2 (optional)"
          type="number"
          className="border px-3 py-2 rounded"
          value={form.condition2}
          onChange={handleChange}
        />

        <input
          name="startDate"
          type="date"
          className="border px-3 py-2 rounded"
          value={form.startDate}
          onChange={handleChange}
          required
        />

        <input
          name="endDate"
          type="date"
          className="border px-3 py-2 rounded"
          value={form.endDate}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          {loading ? "Creating..." : "Create Promotion"}
        </button>
      </form>
    </div>
  );
};

export default AddPromotion;
