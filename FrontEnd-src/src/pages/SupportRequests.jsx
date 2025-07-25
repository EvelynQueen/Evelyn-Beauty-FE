import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllSupportRequests } from "../components/SupportRequestforSF";

const SupportRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const res = await getAllSupportRequests();
      if (res.success) {
        setRequests(res.data);
      } else {
        setError("Failed to fetch support requests!");
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // Helper: get code, fallback if not exist
  const getCode = (val, fallback = "N/A") => {
    if (!val) return fallback;
    if (typeof val === "string") return val;
    if (typeof val === "object") {
      if (val.id) return val.id;
      if (val.code) return val.code;
      return fallback;
    }
    return String(val);
  };

  // Helper: format date
  const formatDate = (val) => {
    if (!val) return "N/A";
    try {
      const d = new Date(val);
      if (isNaN(d.getTime())) return val;
      return d.toLocaleString();
    } catch {
      return val;
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-green-900">
        Support Request List
      </h2>
      <div className="overflow-x-auto rounded-2xl shadow-lg bg-white">
        {loading ? (
          <div className="p-8 text-center text-lg">Loading...</div>
        ) : error ? (
          <div className="text-red-500 p-8 text-center">{error}</div>
        ) : (
          <table className="w-full min-w-[1100px]">
            <thead>
              <tr className="bg-green-100 text-green-900 font-bold text-base">
                <th className="py-3 px-4 text-center">Support ID</th>
                <th className="py-3 px-4 text-center">Customer ID</th>
                <th className="py-3 px-4 text-center">Staff ID</th>
                <th className="py-3 px-4 text-center">Created At</th>
                <th className="py-3 px-4 text-center">Request Content</th>
                <th className="py-3 px-4 text-center">Resolved At</th>
                <th className="py-3 px-4 text-center">Resolve Content</th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center p-6 text-gray-500">
                    No support requests found.
                  </td>
                </tr>
              ) : (
                requests.map((req, idx) => (
                  <tr
                    key={req.supportId || idx}
                    className="hover:bg-gray-50 border-b last:border-b-0 transition"
                  >
                    <td className="py-2 px-4 text-center font-semibold text-blue-700 underline cursor-pointer">
                      {req.supportId ? (
                        <Link to={`/support-resolve/${req.supportId}`}>
                          {getCode(req.supportId)}
                        </Link>
                      ) : (
                        <span className="italic text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="py-2 px-4 text-center">
                      {getCode(req.accountIdCustomer)}
                    </td>
                    <td className="py-2 px-4 text-center">
                      {req.accountIdStaff ? (
                        getCode(req.accountIdStaff)
                      ) : (
                        <span className="italic text-gray-400">
                          unprocessed
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-4 text-center">
                      {formatDate(req.dateCreate)}
                    </td>
                    <td className="py-2 px-4">
                      {req.comment ? (
                        req.comment
                      ) : (
                        <span className="italic text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="py-2 px-4 text-center">
                      {req.dateResolve ? (
                        formatDate(req.dateResolve)
                      ) : (
                        <span className="italic text-gray-400">
                          unprocessed
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-4">
                      {req.resolve ? (
                        req.resolve
                      ) : (
                        <span className="italic text-gray-400">
                          unprocessed
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SupportRequests;
