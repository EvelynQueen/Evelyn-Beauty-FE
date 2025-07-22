import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { CiUser, CiMenuBurger } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";
import useAuth from "../hook/useAuth";
import CartIcon from "./CartIcon";
import { AiTwotoneCustomerService } from "react-icons/ai";

const NavBar = () => {
  const { logout, role, token } = useAuth();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const handleLogout = () => {
    toast.info("Logout Successful", {
      position: "top-right",
      autoClose: 2000,
    });
    logout();
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center py-5 font-medium">
      {/* Navbar for >sm screen */}
      <NavLink to="/" className="logo_img">
        <img className="w-60 sm:w-50" src={assets.logo} alt="" />
      </NavLink>
      <ul
        className="hidden sm:flex gap-5 text-base
       text-gray-800"
      >
        <NavLink
          to="/"
          className="flex flex-col items-center gap-1 hover:font-bold hover:scale-105 transition-all duration-300"
        >
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-800 hidden" />
        </NavLink>
        <NavLink
          to="/about"
          className="flex flex-col items-center gap-1 hover:font-bold hover:scale-105 transition-all duration-300"
        >
          <p>ABOUT US</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-800 hidden" />
        </NavLink>
        <NavLink
          to="/shopping"
          className="flex flex-col items-center gap-1 hover:font-bold hover:scale-105 transition-all duration-300"
        >
          <p>SHOPPING</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-800 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-5">
        <div className="group relative">
          {token ? (
            <div>
              <CiUser className="text-2xl cursor-pointer"></CiUser>
              <div className="group-hover:block hover:scale-105 transition-all duration-300 hidden absolute dropdown-menu right-0 pt-4 z-[60]">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                  <Link
                    to={"/profile"}
                    className="cursor-pointer hover:text-black"
                  >
                    My profile
                  </Link>
                  <Link
                    to={"/orders"}
                    className="cursor-pointer hover:text-black"
                  >
                    Order
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="cursor-pointer hover:text-black text-left bg-transparent border-none p-0"
                  >
                    Logout
                  </button>
                </div>
              </div>
              <hr className="w-full border-none h-[1.5px] bg-none block" />
            </div>
          ) : (
            <NavLink
              to="/login"
              className="flex flex-col items-center gap-1 hover:scale-105 hover:font-bold transition-all duration-300 border-1 border-black rounded-sm px-2 pt-1 pb-[1.5px] text-sm md:text-base"
            >
              <p>LOGIN/SIGNUP</p>
            </NavLink>
          )}
        </div>
        {token && <CartIcon />}
        {token && (
          <Link to="/support" className="text-xl cursor-pointer">
            <AiTwotoneCustomerService />
          </Link>
        )}
      </div>

      {/* Navbar for <=sm screen */}
      <CiMenuBurger
        onClick={() => setVisible(!visible)}
        className="text-2xl cursor-pointer sm:hidden"
      ></CiMenuBurger>
      {/* Size bar menu for sm screen */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden z-50 bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(!visible)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <IoIosArrowBack className="text-2xl"></IoIosArrowBack>
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(!visible)}
            className="py-2 pl-6 shadow-sm"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setVisible(!visible)}
            className="py-2 pl-6 shadow-sm"
            to="/about"
          >
            About Us
          </NavLink>
          <NavLink
            onClick={() => setVisible(!visible)}
            className="py-2 pl-6 shadow-sm"
            to="/shopping"
          >
            Shopping
          </NavLink>
          <NavLink
            onClick={() => setVisible(!visible)}
            className="py-2 pl-6 shadow-sm"
            to="/support"
          >
            Support
          </NavLink>
          {role && (
            <button
              onClick={() => {
                setVisible(!visible);
                handleLogout();
              }}
              className="py-2 pl-6 shadow-sm text-left bg-transparent border-none w-full"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
