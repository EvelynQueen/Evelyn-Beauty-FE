import { useContext, useState } from "react";
import SupportForm from "../components/SupportForm";
import SupportContext from "../contexts/SupportContext";
import { IoIosArrowBack } from "react-icons/io";
import { RiCustomerServiceLine } from "react-icons/ri";
import Footer from "../components/Footer";

const Support = () => {
  const { supportList } = useContext(SupportContext);

  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");
  const [filterComment, setFilterComment] = useState("");

  const isDateInRange = (date) => {
    const supportDate = new Date(date);
    const fromDate = filterDateFrom ? new Date(filterDateFrom) : null;
    const toDate = filterDateTo ? new Date(filterDateTo) : null;

    if (fromDate && supportDate < fromDate) return false;
    if (toDate && supportDate > toDate) return false;
    return true;
  };

  const filteredSupportList = supportList.filter((support) => {
    const isDateMatch = isDateInRange(support.dateCreate);
    const isCommentMatch = filterComment
      ? support.comment.toLowerCase().includes(filterComment.toLowerCase())
      : true;

    return isDateMatch && isCommentMatch;
  });

  return (
    <div className="w-full flex flex-col justify-center items-center bg-white">
      <div className="w-full flex flex-col h-full mb-20 px-4 py-6">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-lg text-black hover:text-gray-600 mb-5 transition"
        >
          <IoIosArrowBack />
          <p className="ml-2">Back</p>
        </button>

        <hr className="w-full bg-gray-300 mb-5" />

        {/* Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xl text-black">
            <RiCustomerServiceLine />
            <p className="font-semibold">Customer Service</p>
          </div>
          <p className="text-gray-600 mt-2">
            If you have any problems or need any help, please fill out the form
            and send it to us. We'll solve it within 24 hours.
          </p>
        </div>

        {/* Support Form */}
        <SupportForm />

        {/* Support List */}
        <div className="mt-8">
          <h3 className=" font-semibold mb-6 py-2 px-4 bg-[#F4F4F4] rounded-md shadow-sm text-black">
            Your Support Requests
          </h3>

          {/* Filter Inputs */}
          <div className="flex gap-6 mb-6">
            <div className="flex-1">
              <label
                htmlFor="filterDateFrom"
                className="text-sm font-semibold text-gray-700 mb-2 block"
              >
                Filter by Date (From)
              </label>
              <input
                id="filterDateFrom"
                type="date"
                value={filterDateFrom}
                onChange={(e) => setFilterDateFrom(e.target.value)}
                className="border p-2 rounded-md w-full border-gray-300"
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="filterDateTo"
                className="text-sm font-semibold text-gray-700 mb-2 block"
              >
                Filter by Date (To)
              </label>
              <input
                id="filterDateTo"
                type="date"
                value={filterDateTo}
                onChange={(e) => setFilterDateTo(e.target.value)}
                className="border p-2 rounded-md w-full border-gray-300"
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="filterComment"
                className="text-sm font-semibold text-gray-700 mb-2 block"
              >
                Filter by Comment
              </label>
              <input
                id="filterComment"
                type="text"
                placeholder="Search by comment"
                value={filterComment}
                onChange={(e) => setFilterComment(e.target.value)}
                className="border p-2 rounded-md w-full border-gray-300"
              />
            </div>
          </div>

          {/* Filtered Results */}
          {!filteredSupportList.length ? (
            <p className="text-gray-500 italic">No support requests found.</p>
          ) : (
            <ul className="space-y-4">
              {filteredSupportList.map((support) => (
                <li
                  key={support.supportId}
                  className="border p-4 rounded-md shadow-sm bg-white hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-center">
                    <p className="flex-1 text-gray-800">
                      <strong>Issue:</strong> {support.comment}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Sent At:</strong>{" "}
                      {new Date(support.dateCreate).toLocaleString()}
                    </p>
                  </div>
                  {support.resolve ? (
                    <p className="text-green-600">
                      <strong>Reply:</strong> {support.resolve}
                    </p>
                  ) : (
                    <p className="text-yellow-600 italic">
                      Awaiting support team response...
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Support;
