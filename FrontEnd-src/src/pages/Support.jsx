import { useContext } from "react";
import SupportForm from "../components/SupportForm";
import SupportContext from "../contexts/SupportContext";
import { IoIosArrowBack } from "react-icons/io";
import { RiCustomerServiceLine } from "react-icons/ri";

const Support = () => {
  const { supportList } = useContext(SupportContext);

  return (
    <div>
      <div className="w-full flex flex-col h-full mb-10">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="w-full flex flex-row justify-start items-center mb-5 caret-transparent cursor-pointer"
        >
          <IoIosArrowBack />
          <p className="text-sm sm:text-base md:text-xl ml-2">Back</p>
        </button>

        <hr className="w-full bg-gray-500 mb-5 caret-transparent" />

        {/* Title */}
        <div className="w-full flex flex-col items-start justify-center mb-10">
          <div className="w-full flex flex-row items-center justify-start gap-1 text-base md:text-xl caret-transparent">
            <RiCustomerServiceLine />
            <p>Customer Service</p>
          </div>
          <p className="text-gray-500">
            If you have any problems or need any help, please fill out the form
            and send it to us. We'll solve it within 24 hours.
          </p>
        </div>

        {/* Support Form */}
        <SupportForm />

        {/* Support List */}
        <div className="mt-10">
          <h3 className=" font-semibold mb-4">Your Support Requests</h3>
          {!supportList.length ? (
            <p className="text-gray-500 italic">No support requests found.</p>
          ) : (
            <ul className="space-y-4">
              {supportList.map((support) => (
                <li
                  key={support.supportId}
                  className="border p-4 rounded-md shadow-sm bg-white"
                >
                  <p>
                    <strong>Issue:</strong> {support.comment}
                  </p>
                  <p>
                    <strong>Sent At:</strong>{" "}
                    {new Date(support.dateCreate).toLocaleString()}
                  </p>
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
    </div>
  );
};

export default Support;
