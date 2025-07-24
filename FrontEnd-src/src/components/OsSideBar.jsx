import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";
import useAuth from "../hook/useAuth";
import { IoLogOutOutline } from "react-icons/io5";
import { RiContactsBook2Line } from "react-icons/ri";
import { AiOutlineProduct } from "react-icons/ai";
import { LiaLuggageCartSolid } from "react-icons/lia";

const OsSideBar = () => {
  const { logout } = useAuth();

  return (
    <div className="h-full bg-gray-800 sticky hidden sm:flex flex-col w-1/5 justify-between items-center gap-3 text-white">
      <div className="flex flex-col justify-start items-center">
        {/* Avatar */}
        <img
          src={assets.user}
          className="w-1/2 my-5 caret-transparent"
          tabIndex={-1}
          alt="Owner Avatar"
        />

        {/* Menu List */}
        <ul className="w-full px-4 flex flex-col gap-2 text-sm sm:text-sm md:text-base">
          <li>
            <NavLink
              to="/all-orders"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded ${
                  isActive
                    ? "bg-white/20"
                    : " hover:bg-gray-700 transition-colors"
                }`
              }
            >
              <LiaLuggageCartSolid /> <span>Orders</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/staff-modifier"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded ${
                  isActive
                    ? "bg-white/20"
                    : " hover:bg-gray-700 transition-colors"
                }`
              }
            >
              <RiContactsBook2Line /> <span>Staff Account</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/product-modifier"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded ${
                  isActive
                    ? "bg-white/20"
                    : " hover:bg-gray-700 transition-colors"
                }`
              }
            >
              <AiOutlineProduct /> <span>Product</span>
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
