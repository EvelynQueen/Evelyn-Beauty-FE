import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { viewSupportDetail, resolveSupport } from "../api/supportAPI";

const SupportResolve = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [support, setSupport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resolveContent, setResolveContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await viewSupportDetail(id);
        setSupport(data);
      } catch {
        setError("Failed to fetch support detail!");
      }
      setLoading(false);
    };
    fetchDetail();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);
    try {
      await resolveSupport(id, resolveContent);
      setSuccess(true);
      setTimeout(() => navigate(-1), 1500);
    } catch {
      setError("Failed to resolve support!");
    }
    setSubmitting(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-4 text-green-900">
        Resolve Support Request
      </h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500 mb-4">{error}</div>
      ) : support ? (
        <>
          <div className="mb-6">
            <div>
              <b>Support ID:</b> {support.supportId || support.support_id}
            </div>
            <div>
              <b>Customer ID:</b>{" "}
              {support.accountIdCustomer ||
                support.account_id_customer?.id ||
                support.account_id_customer}
            </div>
            <div>
              <b>Request Content:</b> {support.comment}
            </div>
            <div>
              <b>Created At:</b>{" "}
              {support.dateCreate
                ? new Date(support.dateCreate).toLocaleString()
                : "N/A"}
            </div>
            <div>
              <b>Current Resolve:</b>{" "}
              {support.resolve || (
                <span className="italic text-gray-400">unprocessed</span>
              )}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="font-semibold">Resolve Content</label>
            <textarea
              className="border rounded p-2 min-h-[80px]"
              value={resolveContent}
              onChange={(e) => setResolveContent(e.target.value)}
              required
              placeholder="Enter your resolve content..."
            />
            <button
              type="submit"
              className="bg-green-700 text-white px-6 py-2 rounded font-bold hover:bg-green-800 disabled:opacity-60"
              disabled={submitting || !resolveContent.trim()}
            >
              {submitting ? "Submitting..." : "Submit Resolve"}
            </button>
            {success && (
              <div className="text-green-600 font-semibold">
                Resolved successfully! Redirecting...
              </div>
            )}
          </form>
        </>
      ) : null}
    </div>
  );
};

export default SupportResolve;
