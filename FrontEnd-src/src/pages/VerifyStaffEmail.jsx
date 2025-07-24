import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import VerifyCode from "../components/VerifyCode";
import useRegister from "../hook/useRegister";
import { assets } from "../assets/assets";
import { MdAlternateEmail } from "react-icons/md";

const VerifyStaffEmail = () => {
  const { handleVerifyStaff } = useRegister();
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/staff-add");
    }
  }, [email, navigate]);

  if (!email) return null;

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
        <div className="w-1/2 py-5">
          <Link to="/">
            <img src={assets.logo} alt="Logo" className="h-10 cursor-pointer" />
          </Link>
        </div>
        {/* Verify code in the center */}
        <div className="flex-1 flex justify-center items-center">
          <div className="w-full sm:w-sm md:w-md">
            <VerifyCode
              tittle={
                <span className="flex items-center justify-center gap-2 text-3xl font-bold">
                  Verify staff email <MdAlternateEmail className="text-3xl" />
                </span>
              }
              action={handleVerifyStaff}
              successRedirect="/staff-modifier"
              errorRedirect="/staff-add"
              successMessage="Staff email verified successfully!"
              email={email}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyStaffEmail;
