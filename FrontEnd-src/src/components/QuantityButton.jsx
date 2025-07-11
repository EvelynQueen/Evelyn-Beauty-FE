import React, { useState } from "react";
import { FaPlusSquare, FaMinusSquare } from "react-icons/fa";

const QuantityButton = ({ quantity, setQuantity }) => {
  const [alert, setAlert] = useState("");

  const handleIncrement = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
      setAlert("");
    } else {
      setAlert("Quantity cannot be more than 10");
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setAlert("");
    } else {
      setAlert("Quantity cannot be less than 1");
    }
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex flex-row items-center justify-center gap-2">
        <FaMinusSquare
          onClick={handleDecrement}
          className={`text-xl ${
            quantity > 1
              ? "text-black hover:scale-110 transition-all duration-300 cursor-pointer"
              : "text-gray-400 cursor-pointer"
          }`}
        />

        <p className="text-center text-base border border-gray-300 rounded px-4 py-1 min-w-[40px]">
          {quantity}
        </p>

        <FaPlusSquare
          onClick={handleIncrement}
          className={`text-xl ${
            quantity < 10
              ? "text-black hover:scale-110 transition-all duration-300 cursor-pointer"
              : "text-gray-400 cursor-pointer"
          }`}
        />
      </div>
      {alert && <p className="text-red-500">{alert}</p>}
    </div>
  );
};

export default QuantityButton;
