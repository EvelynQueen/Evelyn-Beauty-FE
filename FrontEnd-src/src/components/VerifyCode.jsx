// src/components/VerifyCode.jsx
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const VerifyCode = ({
  tittle,
  action, // now expects ({ email, otp }) => { success, status }
  successRedirect,
  errorRedirect,
  successMessage,
  email,
}) => {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const otpInputs = useRef([]);

  // Enable submit only when all 6 digits are entered
  const checkActive = () => {
    const otp = otpInputs.current.map((input) => input.value).join("");
    setActive(otp.length === 6);
  };

  const handleChange = (e, idx) => {
    const val = e.target.value;
    if (!/^\d$/.test(val)) return;
    otpInputs.current[idx].value = val;
    if (idx < otpInputs.current.length - 1) {
      otpInputs.current[idx + 1].focus();
    }
    checkActive();
  };

  const handleKeyDown = (e, idx) => {
    if ((e.key === "Backspace" || e.key === "Delete") && !e.target.value) {
      if (e.key === "Backspace" && idx > 0) {
        otpInputs.current[idx - 1].focus();
      }
      if (e.key === "Delete" && idx < otpInputs.current.length - 1) {
        otpInputs.current[idx + 1].focus();
      }
    }
    setTimeout(checkActive, 0);
  };

  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    const otp = otpInputs.current.map((i) => i.value).join("");
    if (!email) {
      toast.error("Missing email, please start over");
      return navigate(errorRedirect);
    }
    if (!active) {
      return toast.error("Enter the full 6‑digit code.");
    }

    const res = await action({ email, otp });
    if (res.success) {
      toast.success(successMessage);
      navigate(successRedirect);
    } else {
      switch (res.status) {
        case 400:
          toast.error("Invalid OTP, please try again");
          break;
        case 410:
          toast.error("OTP expired, request a new one");
          break;
        default:
          toast.error("Something went wrong, please try again");
      }
      navigate(errorRedirect);
    }
  };

  return (
    <form
      onSubmit={handleVerifySubmit}
      className="flex flex-col justify-center items-center w-full space-y-6"
    >
      {/* Title */}
      <h2 className="text-3xl font-bold text-center flex items-center gap-2">
        {tittle}
      </h2>

      {/* Illustration */}
      <img src={assets.verifyEmail} alt="verify email" className="w-1/3 mb-4" />

      {/* Instruction */}
      <p className="text-center text-sm text-gray-500 mb-4">
        Enter the 6‑digit code sent to your email.
      </p>

      {/* OTP Inputs */}
      <div className="flex gap-2 mb-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <input
            key={idx}
            type="text"
            maxLength="1"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-center border border-gray-300 rounded-md"
            ref={(el) => (otpInputs.current[idx] = el)}
            onChange={(e) => handleChange(e, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
          />
        ))}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!active}
        className={`w-full max-w-xs py-2 rounded-md text-white transition-all duration-300 ${
          active
            ? "bg-black hover:scale-105 cursor-pointer"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        Verify
      </button>
    </form>
  );
};

export default VerifyCode;
