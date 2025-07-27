import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllSupportRequests } from "../components/SupportRequestforSF";

const SupportRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [requestFrom, setRequestFrom] = useState("");
  const [requestTo, setRequestTo] = useState("");
  const [resolveFrom, setResolveFrom] = useState("");
  const [resolveTo, setResolveTo] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [commentKeyword, setCommentKeyword] = useState("");

  const [filteredSupports, setFilteredSupports] = useState([]);

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

  useEffect(() => {
    const filterData = () => {
      const filtered = requests.filter((req) => {
        const reqDate = req.dateCreate?.slice(0, 10);
        const resDate = req.dateResolve?.slice(0, 10);

        const matchRequestFrom =
          !requestFrom || (reqDate && reqDate >= requestFrom);
        const matchRequestTo = !requestTo || (reqDate && reqDate <= requestTo);
        const matchResolveFrom =
          !resolveFrom || (resDate && resDate >= resolveFrom);
        const matchResolveTo = !resolveTo || (resDate && resDate <= resolveTo);
        const matchStatus =
          statusFilter === "all"
            ? true
            : statusFilter === "processed"
            ? req.dateResolve
            : !req.dateResolve;
        const matchComment =
          !commentKeyword ||
          (req.comment &&
            req.comment.toLowerCase().includes(commentKeyword.toLowerCase()));

        return (
          matchRequestFrom &&
          matchRequestTo &&
          matchResolveFrom &&
          matchResolveTo &&
          matchStatus &&
          matchComment
        );
      });
      setFilteredSupports(filtered);
    };

    filterData();
  }, [
    requests,
    requestFrom,
    requestTo,
    resolveFrom,
    resolveTo,
    statusFilter,
    commentKeyword,
  ]);

  const clearFilters = () => {
    setRequestFrom("");
    setRequestTo("");
    setResolveFrom("");
    setResolveTo("");
    setStatusFilter("all");
    setCommentKeyword("");
  };

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

  const formatDate = (val) => {
    if (!val) return "N/A";
    try {
      const d = new Date(val);
      return isNaN(d.getTime()) ? val : d.toLocaleString();
    } catch {
      return val;
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfdfd] text-gray-800 px-6 py-10 font-sans">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-center text-teal-600 tracking-wide">
          Support Requests
        </h2>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-white p-4 rounded-xl shadow border border-gray-200">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Request From</label>
            <input
              type="date"
              className="px-3 py-1.5 border rounded-lg text-sm"
              value={requestFrom}
              onChange={(e) => setRequestFrom(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Request To</label>
            <input
              type="date"
              className="px-3 py-1.5 border rounded-lg text-sm"
              value={requestTo}
              onChange={(e) => setRequestTo(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Resolve From</label>
            <input
              type="date"
              className="px-3 py-1.5 border rounded-lg text-sm"
              value={resolveFrom}
              onChange={(e) => setResolveFrom(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Resolve To</label>
            <input
              type="date"
              className="px-3 py-1.5 border rounded-lg text-sm"
              value={resolveTo}
              onChange={(e) => setResolveTo(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Status</label>
            <select
              className="px-3 py-1.5 border rounded-lg text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="processed">Processed</option>
              <option value="unprocessed">Unprocessed</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Search Comment</label>
            <input
              type="text"
              className="px-3 py-1.5 border rounded-lg text-sm"
              placeholder="e.g. sensor, watering..."
              value={commentKeyword}
              onChange={(e) => setCommentKeyword(e.target.value)}
            />
          </div>
          <div className="md:col-span-3 flex justify-end items-end">
            <button
              className="mt-2 px-4 py-2 bg-pink-100 text-pink-700 rounded-md border hover:bg-pink-200 transition text-sm"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl bg-white shadow-md border border-gray-200">
          {loading ? (
            <div className="p-10 text-center text-gray-500 text-lg">
              Loading...
            </div>
          ) : error ? (
            <div className="p-10 text-center text-red-500">{error}</div>
          ) : (
            <table className="w-full text-sm text-gray-800 min-w-[1100px]">
              <thead className="bg-teal-50 text-teal-700 text-xs font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-4 text-left">Support ID</th>
                  <th className="px-5 py-4 text-left">Customer</th>
                  <th className="px-5 py-4 text-left">Staff</th>
                  <th className="px-5 py-4 text-left">Created</th>
                  <th className="px-5 py-4 text-left">Request</th>
                  <th className="px-5 py-4 text-left">Resolved</th>
                  <th className="px-5 py-4 text-left">Resolution</th>
                </tr>
              </thead>
              <tbody>
                {filteredSupports.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center p-6 text-gray-400">
                      No matching support requests.
                    </td>
                  </tr>
                ) : (
                  filteredSupports.map((req, idx) => (
                    <tr
                      key={req.supportId || idx}
                      className="border-t border-gray-100 hover:bg-pink-50 transition duration-150"
                    >
                      <td className="px-5 py-3 text-blue-600 underline font-medium">
                        <Link to={`/support-resolve/${req.supportId}`}>
                          {getCode(req.supportId)}
                        </Link>
                      </td>
                      <td className="px-5 py-3">
                        {getCode(req.accountIdCustomer)}
                      </td>
                      <td className="px-5 py-3">
                        {req.accountIdStaff ? (
                          getCode(req.accountIdStaff)
                        ) : (
                          <span className="italic text-gray-400">
                            unprocessed
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3">
                        {formatDate(req.dateCreate)}
                      </td>
                      <td className="px-5 py-3 text-sky-600 font-semibold">
                        {req.comment || (
                          <span className="italic text-gray-400">N/A</span>
                        )}
                      </td>
                      <td className="px-5 py-3">
                        {req.dateResolve ? (
                          formatDate(req.dateResolve)
                        ) : (
                          <span className="italic text-gray-400">
                            unprocessed
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3">
                        {req.resolve || (
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
    </div>
  );
};

export default SupportRequests;
