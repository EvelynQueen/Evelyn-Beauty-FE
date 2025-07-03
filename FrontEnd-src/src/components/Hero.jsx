import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-200 bg-gradient-to-b from-[#9FCBF4] to-[#EAD8FC] w-full rounded-xl">
      {/* Hero left side */}
      <div className="w-full sm:w-1/2 flex flex-col justify-center items-start px-6 sm:px-10 py-10 sm:py-20">
        <div className="montserrat-regular text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold max-w-[90%] sm:max-w-[80%] lg:max-w-[600px] leading-snug mb-6">
          Discover The Secrets Of Beauty
        </div>
        <Link
          to="/shopping"
          className="bg-[#9CD5FF] text-white rounded-2xl px-5 py-3 sm:px-6 sm:py-3.5 md:px-8 md:py-4 text-base sm:text-lg md:text-xl font-medium shadow-md hover:bg-[#2196CF] transition duration-300 w-fit"
        >
          Shop now
        </Link>
      </div>

      {/* Hero right side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center">
        <img
          className="w-full h-auto object-contain max-h-[500px] sm:max-h-[600px] md:max-h-[700px] rounded-b-xl md:rounded-r-xl"
          src={assets.hero_home}
          alt="Hero_img"
        />
      </div>
    </div>
  );
};

export default Hero;
