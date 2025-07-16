import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const ShippingProfile = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center mb-10">
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
        <FaLocationDot />
        <p>Shipping Profile</p>
      </div>

      {/* Shipping profile form */}

      <div className="w-full flex flex-row justify-end items-center mb-20">
        <Link
          to="/discount"
          className="bg-black text-white px-4 py-2 text-sm sm:text-base md:text-lg rounded-md hover:scale-105 hover:bg-gray-800 transition-all duration-200"
        >
          Explore Discounts
        </Link>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ShippingProfile;
