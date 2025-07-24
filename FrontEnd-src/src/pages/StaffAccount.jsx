import React, { useEffect } from "react";
import useStaff from "../hook/useStaff";
import { toast } from "react-toastify";
import { Link, useLocation } from "react-router-dom";

const StaffAccount = () => {
  const location = useLocation();
  const { allStaff, handleGetStaff, handleDeleteStaff } = useStaff();

  const handleGetAllStaff = async () => {
    const res = await handleGetStaff();
    if (!res.success) {
      switch (res.status) {
        case 403:
          toast.error("Session expired, please login again");
          break;
        case 0:
          toast.error("Something went wrong, please login again");
          break;
        default:
          toast.error("Something went wrong, please login again");
          break;
      }
    }
  };

  const handleDelete = async (accountId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this staff account?"
    );
    if (!confirmDelete) return;

    const res = await handleDeleteStaff(accountId);
    if (res.success) {
      toast.success("Staff deleted successfully!");
      handleGetAllStaff();
    } else {
      switch (res.status) {
        case 403:
          toast.error("Session expired, please login again");
          break;
        case 0:
          toast.error("Something went wrong, please login again");
          break;
        default:
          toast.error("Something went wrong, please try again");
          break;
      }
    }
  };

  useEffect(() => {
    handleGetAllStaff();
  }, [location]);

  return (
    <div className="w-full flex flex-col justify-start items-center p-10">
      {/* Add staff button */}
      <div className="w-full flex flex-row justify-start mb-6">
        <Link
          to="/staff-add"
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 transition font-semibold text-sm shadow"
        >
          + Add Staff
        </Link>
      </div>

      {/* Staff table */}
      {!allStaff || allStaff.length === 0 ? (
        <div className="text-gray-500 text-lg font-medium italic flex items-center gap-2">
          <span>🚫 No Staff was hired!</span>
        </div>
      ) : (
        <div className="w-full overflow-x-auto rounded-xl border border-gray-200 shadow-md">
          <table className="table-auto w-full text-center border-collapse bg-white">
            <thead className="bg-gradient-to-r from-sky-100 to-sky-200 text-gray-700 font-semibold text-sm uppercase tracking-wider">
              <tr>
                <th className="border border-gray-200 px-6 py-3">ID</th>
                <th className="border border-gray-200 px-6 py-3">Name</th>
                <th className="border border-gray-200 px-6 py-3">Contact</th>
                <th className="border border-gray-200 px-6 py-3">Role</th>
                <th className="border border-gray-200 px-6 py-3">Delete</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {allStaff.map((staff, index) => (
                <tr
                  key={staff.accountId || index}
                  className={
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-50 hover:bg-gray-100 transition duration-200"
                  }
                >
                  <td className="border border-gray-200 px-6 py-4">
                    {staff.accountId}
                  </td>
                  <td className="border border-gray-200 px-6 py-4 font-medium">
                    {staff.name}
                  </td>
                  <td className="border border-gray-200 px-6 py-4">
                    <a
                      href={
                        `https://mail.google.com/mail/?view=cm&fs=1` +
                        `&to=${staff.email}` +
                        `&su=${encodeURIComponent(
                          `Evelyn Beauty to ${staff.name}`
                        )}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:underline"
                    >
                      {staff.email}
                    </a>
                  </td>
                  <td className="border border-gray-200 px-6 py-4">
                    {staff.role === "OS" ? (
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                        Owner
                      </span>
                    ) : (
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        Staff
                      </span>
                    )}
                  </td>
                  <td className="border border-gray-200 px-6 py-4">
                    <button
                      className="text-red-600 hover:text-red-800 font-medium text-sm hover:underline transition"
                      onClick={() => handleDelete(staff.accountId)}
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

export default StaffAccount;
