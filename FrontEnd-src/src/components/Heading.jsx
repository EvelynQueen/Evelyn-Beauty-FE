import { IoIosArrowBack } from "react-icons/io";

const Heading = ({ icons: Icon, title }) => {
  return (
    <div>
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
      <div className="w-full flex flex-row items-center justify-start mb-10 gap-1 text-base sm:text-base md:text-xl caret-transparent">
        <Icon />
        <p>{title}</p>
      </div>
    </div>
  );
};

export default Heading;
