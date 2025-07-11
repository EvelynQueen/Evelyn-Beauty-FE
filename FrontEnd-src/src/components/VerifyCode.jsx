import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const VerifyCode = ({
  tittle,
  action,
  successRedirect,
  errorRedirect,
  successMessage,
  email,
}) => {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const otp_inputs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!/^\d$/.test(value)) return;

    if (value && index < otp_inputs.current.length - 1) {
      otp_inputs.current[index + 1].focus();
    }

    const allInputs = otp_inputs.current.map((input) => input.value);
    const isComplete = allInputs.every((input) => input.length === 1);
    setActive(isComplete);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "backspace" && !e.target.value && index > 0) {
      otp_inputs.current[index - 1].focus();
    }

    if (
      e.key === "delete" &&
      !e.target.value &&
      index < otp_inputs.current.length - 1
    ) {
      otp_inputs.current[index + 1].focus();
    }

    setTimeout(() => {
      const allInputs = otp_inputs.current.map((input) => input.value);
      const isComplete = allInputs.every((input) => input.length === 1);
      setActive(isComplete);
    }, 0);
  };

  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    const otp = otp_inputs.current.map((input) => input.value).join("");
    if (!email) {
      toast.error("Missing email, please signup again");
      return navigate(errorRedirect);
    }
    if (otp.length === 6) {
      const res = await action({ email, otp });
      if (res.success) {
        navigate(successRedirect);
        toast.success(successMessage);
      } else {
        switch (res.status) {
          case 400:
            toast.error("Invalid OTP, please try again");
            break;
          case 410:
            toast.error("OTP expired, please try again");
            break;
          case 0:
            toast.error("Please try again");
            break;
          default:
            toast.error("Something went wrong, please try again");
        }
        navigate(errorRedirect);
      }
    } else {
      toast.error("Please enter the full 6-digit code.");
    }
  };

  return (
    <div className="flex flex-col justify-around items-center w-full">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-1 flex items-center justify-center gap-2">
        {tittle}
      </h2>
      {/* Image */}
      <img src={assets.verifyEmail} alt="verify email" className="w-1/3 mb-5" />
      {/* Text */}
      <p className="text-center text-sm text-gray-500 mb-5">
        We have sent a 6-digit code to your email. Please enter the code to
        verify your email.
      </p>
      {/* Array 6 input */}
      <div className="flex gap-2 mb-10">
        {Array.from({ length: 6 }).map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-center border border-gray-300 rounded-md mb-2"
            ref={(el) => (otp_inputs.current[index] = el)}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>

      {/* Button */}
      <button
        className={`text-white px-4 py-2 rounded-md hover:scale-105 transition-all duration-300 text-sm sm:text-base md:text-lg lg:text-xl ${
          active ? "bg-black cursor-pointer" : "bg-gray-300 cursor-not-allowed"
        }`}
        onClick={handleVerifySubmit}
      >
        Verify
      </button>
    </div>
  );
};

export default VerifyCode;
