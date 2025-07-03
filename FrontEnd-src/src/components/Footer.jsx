import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <hr className="bg-gray-400" />
      <div className="flex flex-col sm:grid grid-cols-[3fr_2fr] gap-14 my-10 mt-10 text-sm">
        <div>
          <div>
            <p className="text-xl font-medium mb-5">CONTACT US</p>
            <ul className="flex flex-col gap-1 text-gray-600">
              <li>Evelyn Beauty Co.</li>
              <li>Address: 7 Đ.D1, Long Thanh My Ward, Thu Duc city</li>
              <li>+84 398 495 105</li>
              <li>contact@EvelynBeauty.com</li>
            </ul>
          </div>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <NavLink to="/delivery">Delivery</NavLink>
            <NavLink to="/policy">Privacy Policy</NavLink>
          </ul>
        </div>
      </div>
      <div>
        <hr className="bg-gray-400" />
        <p className="py-5 text-sm text-center">
          Copyright 2024@ EvelynBeauty.com - All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
