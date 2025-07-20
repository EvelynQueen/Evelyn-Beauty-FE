import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const PaymentSuccess = () => {
  return (
    <>
      <div className="hidden sm:flex w-full flex-row justify-between items-center border border-gray-300 rounded-xl p-4 gap-6 bg-white shadow-md caret-transparent">
        <div className="flex-[5] flex flex-col justify-center items-center space-y-4 text-center">
          <h3 className="font-semibold text-green-600 text-lg sm:text-2xl md:text-3xl lg:text-4xl">
            Your payment was successful!
          </h3>

          <p className="text-gray-500 text-sm sm:text-base lg:text-lg">
            Thank you for choosing Evelyn's Beauty. Our staff will soon process
            your order!
          </p>

          <Link
            to="/shopping"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:scale-105 hover:bg-green-500 transition duration-200"
          >
            Continue Shopping
          </Link>
        </div>

        <div className="flex-[6] flex justify-end">
          <img
            src={assets.paymentSuccessful}
            alt="success"
            className="max-w-full h-auto object-contain"
          />
        </div>
      </div>

      <div className="flex sm:hidden w-full flex-col justify-center items-center border border-gray-300 rounded-xl p-4 gap-4 bg-white shadow-md text-center">
        <h3 className="font-semibold text-green-600 text-xl">
          Your payment was successful!
        </h3>

        <p className="text-gray-500 text-sm">
          Thank you for choosing Evelyn's Beauty.
        </p>

        <Link
          to="/shopping"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:scale-105 hover:bg-green-500 transition duration-200"
        >
          Continue Shopping
        </Link>
      </div>
    </>
  );
};

export default PaymentSuccess;
