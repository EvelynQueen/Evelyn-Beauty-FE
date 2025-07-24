import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useRegister from "../hook/useRegister";
import { assets } from "../assets/assets";
import { MdAlternateEmail } from "react-icons/md";

export default function VerifyForgotPass() {
  const { handleResetPassword } = useRegister();
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const [apiError, setApiError] = useState("");

  // Redirect if no email provided
  useEffect(() => {
    if (!email) navigate("/forgot-password", { replace: true });
  }, [email, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async ({ otp, password }) => {
    setApiError("");
    try {
      const { success, status } = await handleResetPassword({
        email,
        otp,
        newPassword: password,
      });
      if (success) {
        navigate("/login", {
          state: { message: "Password reset! Please log in." },
        });
      } else {
        setApiError(`Reset failed (status ${status}). Try again.`);
      }
    } catch (err) {
      console.error(err);
      setApiError("Unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex h-full">
      <img
        className="hidden lg:block lg:w-1/2 object-cover"
        src={assets.forgotPassword}
        alt="Verify visual"
      />
      <div className="h-screen flex-1 flex flex-col">
        <div className="w-1/2 py-5">
          <Link to="/">
            <img src={assets.logo} alt="Logo" className="h-10 cursor-pointer" />
          </Link>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full sm:max-w-sm md:max-w-md space-y-4"
          >
            <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
              Verify & Reset <MdAlternateEmail className="text-3xl" />
            </h2>

            <label htmlFor="otp">OTP</label>
            <input
              id="otp"
              {...register("otp", {
                required: "OTP is required",
                pattern: {
                  value: /^\d{6}$/,
                  message: "Enter the 6-digit code",
                },
              })}
              type="text"
              placeholder="Enter OTP"
              className="w-full p-2 font-mono text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
            {errors.otp && <p className="text-red-500">{errors.otp.message}</p>}

            <label htmlFor="password">New Password</label>
            <input
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Must be at least 8 characters",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,
                  message:
                    "Must at least 8 characters, include uppercase, lowercase, number, and special character",
                },
              })}
              type="password"
              placeholder="New password"
              className="w-full p-2 font-mono text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}

            {apiError && <p className="text-red-500">{apiError}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 rounded-lg bg-black text-white disabled:bg-gray-600"
            >
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
