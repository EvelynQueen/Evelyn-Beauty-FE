import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAuth from "../hook/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { loginAPI } from "../api/authAPI";
import { assets } from "../assets/assets";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import GoogleLoginBtn from "../components/GoogleLoginBtn";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loginError, setLoginError] = useState("");

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    const wasRedirected = sessionStorage.getItem("sessionExpired");
    if (wasRedirected) {
      toast.warning("Your session has expired. Please log in again.", {
        position: "top-right",
        autoClose: 3000,
      });
      sessionStorage.removeItem("sessionExpired");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const res = await loginAPI(email, password);
      const accessToken = res.token;
      const userRole = res.account.role;
      const accountId = res.account.accountId;
      login(accessToken, userRole, accountId);

      if (userRole === "OS") {
        navigate("/owner-dashboard", { replace: true });
      } else if (userRole === "SF" || userRole === "AD") {
        navigate("/staff-dashboard", { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (error) {
      const status = error?.response?.status;
      if (status === 404 || status === 400 || status === 401) {
        setLoginError("Incorrect email or password");
      } else {
        toast.error("Can't connect to server, please retry!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <div className="flex h-full">
      {/* Left side image */}
      <img
        className="hidden lg:block lg:w-1/2 object-cover caret-transparent mr-10"
        src={assets.loginImg}
        alt="login visual"
      />

      {/* Right side form */}
      <div className="h-screen flex-1 flex flex-col justify-around">
        {/* Logo on top left */}
        <div className="w-1/3 pt-5">
          <Link to="/">
            <img
              src={assets.logo}
              alt="Logo"
              className="h-10 cursor-pointer caret-transparent"
            />
          </Link>
        </div>
        {/* Form in the center */}
        <div className="flex-1 flex justify-center items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full sm:w-sm md:w-md"
          >
            <h2 className="text-3xl font-bold text-center py-10">Login</h2>

            {/* Email input */}
            <div className="flex flex-col gap-1 mb-4">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                type="email"
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
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                {...register("password", {
                  required: "This field is required!",
                })}
                className="border p-2 rounded w-full"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Error & Button */}
            {loginError && (
              <p className="text-red-500 text-sm text-center mb-4">
                {loginError}
              </p>
            )}
            <button
              type="submit"
              className="bg-black text-white p-2 w-full rounded-2xl mt-4 cursor-pointer hover:bg-gray-600 transition-colors duration-300"
            >
              {isSubmitting ? "Logging in..." : "Log In"}
            </button>

            <div className="w-full mt-4">
              <GoogleLoginBtn />
            </div>
          </form>
        </div>
        <div className="w-full flex flex-col justify-end items-center gap-2">
          <p className="text-sm sm:text-base md:text-lg text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 font-semibold">
              Sign up
            </Link>
          </p>
          <Link to="/forgot-password" className="text-gray-800 mb-5 underline">
            Forgot Password ?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
