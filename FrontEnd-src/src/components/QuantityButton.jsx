// QuantityButton.jsx
import React from "react";
import { FaPlusSquare, FaMinusSquare } from "react-icons/fa";

const QuantityButton = ({ quantity, setQuantity }) => {
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex flex-row items-center justify-center gap-2">
        <FaMinusSquare
          onClick={handleDecrement}
          className="text-xl cursor-pointer text-gray-500 hover:text-black"
        />

        <p className="text-center text-base border border-gray-300 rounded px-4 py-1 min-w-[40px]">
          {quantity}
        </p>

        <FaPlusSquare
          onClick={handleIncrement}
          className="text-xl cursor-pointer text-gray-500 hover:text-black"
        />
      </div>
    </div>
  );
};

export default QuantityButton;
