import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import useRegister from "../hook/useRegister";
import { assets } from "../assets/assets";

const ForgotPassword = () => {
  const { handleForgotEmail } = useRegister();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({ mode: "onChange" });

  const onSubmit = async ({ email }) => {
    try {
      const res = await handleForgotEmail(email);
      if (res.success) {
        toast.success("Password reset email sent! Check your inbox.");
        // pass the email along so VerifyForgotPass can read it from location.state
        navigate("/verify-forgot-password", { state: { email } });
      } else {
        switch (res.status) {
          case 400:
            toast.error("Invalid email format!");
            break;
          case 0:
            toast.error("Something went wrong, please try again later.");
            break;
          default:
            toast.error("Something went wrong, please try again later.");
        }
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex h-full caret-transparent">
      {/* Left image (hidden on small screens) */}
      <img
        className="hidden lg:block lg:w-1/2 object-cover mr-10"
        src={assets.forgotPassword}
        alt="Forgot password visual"
      />

      {/* Right-side form */}
      <div className="h-screen flex-1 flex flex-col justify-around">
        {/* Logo */}
        <div className="w-1/3 pt-5">
          <Link to="/">
            <img src={assets.logo} alt="Logo" className="h-10 cursor-pointer" />
          </Link>
        </div>

        {/* Form */}
        <div className="flex-1 flex justify-center items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full sm:w-sm md:w-md"
          >
            <h2 className="text-3xl font-bold text-center py-10">
              Forgot Password
            </h2>

            {/* Email input */}
            <div className="flex flex-col gap-1 mb-4">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "This field is required!",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                className="border p-2 rounded w-full"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="bg-black text-white p-2 w-full rounded-2xl mt-4 hover:bg-gray-600 transition-colors duration-300"
            >
              {isSubmitting ? "Sending email..." : "Send Reset Link"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
