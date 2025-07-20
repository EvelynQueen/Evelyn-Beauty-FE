import SupportForm from "../components/SupportForm";
import { IoIosArrowBack } from "react-icons/io";
import { RiCustomerServiceLine } from "react-icons/ri";

const Support = () => {
  return (
    <div>
      <div className="w-full flex flex-col h-full mb-10">
        {/* Back to previous page */}
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

        <SupportForm></SupportForm>
      </div>
    </div>
  );
};

export default Support;
