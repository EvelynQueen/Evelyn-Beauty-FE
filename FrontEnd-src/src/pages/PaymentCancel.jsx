import { Link } from "react-router-dom";
import { assets } from "../assets/assets"; // Đảm bảo bạn có assets.paymentFailed
import Footer from "../components/Footer";

const PaymentUnsuccessful = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="hidden sm:flex w-full flex-row justify-between items-center border border-red-300 rounded-xl p-4 gap-6 bg-white shadow-md caret-transparent mb-30">
        <div className="flex-[5] flex flex-col justify-center items-center space-y-4 text-center">
          <h3 className="font-semibold text-red-600 text-lg sm:text-2xl md:text-3xl lg:text-4xl">
            Payment Failed
          </h3>

          <p className="text-gray-500 text-sm sm:text-base lg:text-lg">
            Oops! Something went wrong. Please try again or contact support.
          </p>

          <Link
            to="/cart"
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:scale-105 hover:bg-red-500 transition duration-200"
          >
            Back to Cart
          </Link>
        </div>

        <div className="flex-[3] flex justify-end">
          <img
            src={assets.paymentFailed}
            alt="failed"
            className="max-w-full h-auto object-contain"
          />
        </div>
      </div>

      <div className="flex sm:hidden w-full flex-col justify-center items-center border border-red-300 rounded-xl p-4 gap-4 bg-white shadow-md text-center">
        <h3 className="font-semibold text-red-600 text-xl">Payment Failed</h3>

        <p className="text-gray-500 text-sm">
          Oops! Something went wrong. Please try again.
        </p>

        <Link
          to="/cart"
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:scale-105 hover:bg-red-500 transition duration-200"
        >
          Back to Cart
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentUnsuccessful;
