import React from "react";
import { useForm } from "react-hook-form";
import useStaff from "../hook/useStaff";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Heading from "../components/Heading";
import { FaUserEdit } from "react-icons/fa";

const StaffAdd = () => {
  const navigate = useNavigate();
  const { handleAddStaff } = useStaff();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password, role } = data;
    const res = await handleAddStaff(name, email, password, role);
    if (res.success) {
      toast.success("Staff account created successfully!");
      reset();
      navigate("/verify-staff-email", { state: { email } });
    } else {
      switch (res.status) {
        case 409:
          toast.error("Email already exists");
          break;
        case 400:
          toast.error("Invalid data, please check your inputs");
          break;
        case 403:
          toast.error("Session expired, please login again");
          break;
        case 0:
          toast.error("Something went wrong, please login again");
          break;
        default:
          toast.error("Something went wrong, please login again");
      }
    }
  };

  return (
    <div className="w-full flex flex-col justify-start items-center p-2">
      <div className="w-full">
        <Heading icons={FaUserEdit} title="Add new Staff" />
      </div>
      <div className="h-screen flex-1 flex flex-col justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full sm:w-sm md:w-md bg-white p-8 rounded shadow-md"
        >
          <h2 className="text-3xl font-bold text-center py-6">
            Add Staff Account
          </h2>

          {/* Name input */}
          <div className="flex flex-col gap-1 mb-4">
            <label htmlFor="name" className="text-sm font-medium">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Full Name"
              {...register("name", { required: "This field is required!" })}
              className="border p-2 rounded w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

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
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
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
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="border p-2 rounded w-full"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password input */}
          <div className="flex flex-col gap-1 mb-4">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "This field is required!",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              className="border p-2 rounded w-full"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Role input (radio) */}
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-medium">
              Role <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-row gap-6 mt-1">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="SF"
                  defaultChecked
                  {...register("role", { required: true })}
                />
                <span>Staff</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="OS"
                  {...register("role", { required: true })}
                />
                <span>Owner</span>
              </label>
            </div>
            {errors.role && (
              <p className="text-red-500 text-sm">Role is required</p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-black text-white p-2 w-full rounded-2xl mt-4 cursor-pointer hover:bg-gray-600 transition-colors duration-300"
          >
            {isSubmitting ? "Creating..." : "Create Staff Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StaffAdd;
