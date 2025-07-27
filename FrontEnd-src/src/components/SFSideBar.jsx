import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { RiBillLine, RiCustomerService2Line } from "react-icons/ri";

import useAuth from "../hook/useAuth";
import { IoLogOutOutline } from "react-icons/io5";

const SFSideBar = () => {
  const { logout } = useAuth();

  return (
    <div className="h-full bg-blue-950 sticky hidden sm:flex flex-col w-1/5 justify-between items-center gap-3 text-white">
      <div className="flex flex-col justify-start items-center">
        {/* Avatar */}
        <img
          src={assets.user}
          className="w-1/2 my-5 caret-transparent"
          tabIndex={-1}
          alt="Owner Avatar"
        />

        {/* Menu List */}
        <ul className="w-full px-4 flex flex-col gap-4 sm:text-sm md:text-base ">
          <li>
            <NavLink
              to="/order-dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded ${
                  isActive
                    ? "bg-white/20"
                    : " hover:bg-gray-700 transition-colors"
                }`
              }
            >
              <RiBillLine /> <span>Order</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/support-requests"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded ${
                  isActive
                    ? "bg-white/20"
                    : " hover:bg-gray-700 transition-colors"
                }`
              }
            >
              <RiCustomerService2Line /> <span>Supports</span>
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

export default SFSideBar;
