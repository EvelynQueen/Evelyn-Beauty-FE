import React from "react";
import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import useCart from "../hook/useCart";

const CartIcon = ({ className = "" }) => {
  const { cartCount, isLoading } = useCart();

  return (
    <Link
      to="/cart"
      className={`relative hover:scale-105 transition-all duration-300 ${className}`}
    >
      <CiShoppingCart className="text-2xl cursor-pointer" />
      {cartCount > 0 && (
        <span className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] flex items-center justify-center">
          {isLoading ? "..." : cartCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
