import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";
import { MdAccountBox } from "react-icons/md";
import { FaHouseUser } from "react-icons/fa";
import useAuth from "../hook/useAuth";
import { IoLogOutOutline } from "react-icons/io5";

const OsSideBar = () => {
  const { logout } = useAuth();

  return (
    <div className="h-full bg-black sticky hidden sm:flex flex-col w-1/5 justify-between items-center gap-3 text-white">
      <div className="flex flex-col justify-start items-center">
        {/* Avatar */}
        <img
          src={assets.user}
          className="w-1/2 my-5 caret-transparent"
          tabIndex={-1}
          alt="Owner Avatar"
        />

        {/* Menu List */}
        <ul className="w-full px-4 flex flex-col gap-2 sm:text-sm md:text-base lg:text-xl">
          <li>
            <NavLink
              to="/owner-dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded ${
                  isActive
                    ? "bg-[#F4F4F4] text-black"
                    : " hover:bg-gray-700 transition-colors"
                }`
              }
            >
              <FaHouseUser /> <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/staff-modifier"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded ${
                  isActive
                    ? "bg-[#F4F4F4] text-black"
                    : " hover:bg-gray-700 transition-colors"
                }`
              }
            >
              <MdAccountBox /> <span>Staff Account</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/owner-dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded ${
                  isActive
                    ? "bg-[#F4F4F4] text-black"
                    : " hover:bg-gray-700 transition-colors"
                }`
              }
            >
              <FaHouseUser /> <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/account-modifier"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded ${
                  isActive
                    ? "bg-[#F4F4F4] text-black"
                    : " hover:bg-gray-700 transition-colors"
                }`
              }
            >
              <MdAccountBox /> <span>Staff Account</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Logout */}
      <div
        onClick={logout}
        className="flex justify-start items-center p-2 rounded hover:bg-gray-700 cursor-pointer mb-2"
      >
        Logout
        <IoLogOutOutline />
      </div>
    </div>
  );
};

export default OsSideBar;
