import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useRegister from "../hook/useRegister";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
const Singup = () => {
  const { handleRegister } = useRegister();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await handleRegister(data);
    if (res.success) {
      toast.success(
        "Registration successful! Please check your email to verify your account."
      );
      navigate("/verify-email", { replace: true });
    } else {
      switch (res.status) {
        case 409:
          toast.error("Email already exists");
          break;
        case 400:
          toast.error(res.message || "Invalid data, please check your inputs");
          break;
        case 0:
          toast.error("Network error, please try again");
          break;
        default:
          toast.error(res.message || "Something went wrong, please try again");
      }
    }
  };

  return (
    <div className="flex h-full">
      {/* left side image */}
      <img
        className="hidden lg:block lg:w-1/2 object-cover"
        src={assets.signup}
        alt="signup visual"
      />

      {/* Right side form */}
      <div className="h-screen flex-1 flex flex-col">
        {/* Logo on top left */}
        <div className="w-1/3 py-5">
          <Link to="/">
            <img src={assets.logo} alt="Logo" className="h-16 cursor-pointer" />
          </Link>
        </div>
        {/* Form in the center */}
        <div className="flex-1 flex justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full sm:w-sm md:w-md"
          >
            <h2 className="text-3xl font-bold text-center py-10">Sign Up</h2>

            {/* Email input */}
            <div className="flex flex-col gap-1 mb-4">
              <label htmlFor="email" className="text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                autoComplete="email"
                placeholder="Enter Email"
                {...register("email", {
                  required: "This field is required!",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                className="border p-2 rounded w-full"
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm">
                  {formErrors.email.message}
                </p>
              )}
            </div>

            {/* Password input */}
            <div className="flex flex-col gap-1 mb-4">
              <label htmlFor="password" className="text-sm font-medium">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                {...register("password", {
                  required: "This field is required!",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,
                    message:
                      "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character",
                  },
                })}
                className="border p-2 rounded w-full"
              />
              {formErrors.password && (
                <p className="text-red-500 text-sm">
                  {formErrors.password.message}
                </p>
              )}
            </div>

            {/* Name input */}
            <div className="flex flex-col gap-1 mb-4">
              <label htmlFor="name" className="text-sm font-medium">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Full Name"
                {...register("name", {
                  required: "This field is required!",
                })}
                className="border p-2 rounded w-full"
              />
              {formErrors.name && (
                <p className="text-red-500 text-sm">
                  {formErrors.name.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-black text-white p-2 w-full rounded-2xl mt-4 cursor-pointer hover:bg-gray-600 transition-colors duration-300"
            >
              {isSubmitting ? "Creating account..." : "Sign Up"}
            </button>
          </form>
        </div>
        <Link to="/login">
          <p className="text-sm sm:text-base md:text-lg text-center mb-5">
            Already have an account?{" "}
            <span className="text-blue-500 font-semibold">Login</span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Singup;
