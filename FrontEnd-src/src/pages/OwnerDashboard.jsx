import React from "react";
import { RiAdminFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const OwnerDashboard = () => {
  return (
    <div className="flex flex-row w-full h-full">
      {/* Manage block left */}
      <div className="w-1/5 bg-[#001D51] h-full flex flex-col items-center justify-start gap-5 sticky top-0">
        {/* OS incon */}
        <div className="w-1/2 aspect-square border border-white rounded-full flex items-center justify-center mt-5">
          <RiAdminFill className="sm:text-4xl md:text-5xl lg:text-6xl text-white" />
        </div>

        {/* Menu */}
        <div className="w-full flex flex-col items-center justify-center mt-5 text-white sm:text-sm md:text-base">
          <Link className="w-full flex justify-center items-center py-3">
            Staff Management
          </Link>
          <Link className="w-full flex justify-center items-center py-3">
            Staff Management
          </Link>
          <Link className="w-full flex justify-center items-center py-3">
            Staff Management
          </Link>
          <Link className="w-full flex justify-center items-center py-3">
            Staff Management
          </Link>
          <Link className="w-full flex justify-center items-center py-3">
            Staff Management
          </Link>
        </div>
      </div>
      {/* Information block right */}
      <div></div>
    </div>
  );
};

export default OwnerDashboard;
