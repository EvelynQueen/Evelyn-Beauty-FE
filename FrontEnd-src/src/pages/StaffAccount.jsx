import React, { useEffect } from "react";
import useStaff from "../hook/useStaff";
import { toast } from "react-toastify";

const StaffAccount = () => {
  const { allStaff, handleGetStaff } = useStaff();
  const handleGetAllStaff = async () => {
    const res = await handleGetStaff();
    if (res.success) {
      toast.success("All Staff was showed", { autoClose: 1000 });
    } else {
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

  useEffect(() => {
    handleGetAllStaff();
  }, []);

  return (
    <div className="w-full flex flex-col justify-start items-center p-10">
      {!allStaff || allStaff.length === 0 ? (
        <div>No Staff was hired!</div>
      ) : (
        <div className="w-full rounded-lg overflow-hidden border border-gray-400">
          <table className="table-auto w-full text-center border-collapse border border-gray-400">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Contact</th>
                <th className="border border-gray-300 px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {allStaff.map((staff, index) => (
                <tr key={staff.accountId || index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {staff.accountId}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {staff.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {staff.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button className="text-red-500 hover:underline">
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
