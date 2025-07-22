import { FaLocationDot } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";
import { RiUserLocationFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Heading from "../components/Heading";
import Footer from "../components/Footer";
import ProfileForm from "../components/ProfileForm";
import ProfileSelected from "../components/ProfileSelected";
import useProfile from "../hook/useProfile";
import { assets } from "../assets/assets";

const ShippingProfile = () => {
  const { selectedProfile } = useProfile();

  return (
    <div className="w-full px-4 py-6 caret-transparent">
      <Heading icons={FaLocationDot} title="Shipping Profile" />

      <div className="w-full flex flex-col items-center justify-center mb-10">
        {/* Form Section */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start gap-8 mt-8">
          {/* Add new profile */}
          <div className="w-full md:w-1/2 max-w-xl flex flex-col gap-4">
            <p className="flex items-center gap-2 text-base text-gray-800 mb-2">
              <IoIosAddCircle className="text-lg" />
              Add a new shipping profile
            </p>
            <ProfileForm />
          </div>

          {/* Existing profiles */}
          <div className="w-full md:w-1/2 max-w-xl flex flex-col gap-4">
            <p className="flex items-center gap-2 text-base text-gray-800 mb-2">
              <RiUserLocationFill className="text-lg" />
              Your existing shipping profiles
            </p>
            <ProfileSelected />
          </div>
        </div>

        {/* Navigation */}
        <div className="w-full flex justify-end mt-10">
          {selectedProfile.profileId ? (
            <Link
              to="/discount"
              className="bg-black text-white px-5 py-2 rounded-md text-base hover:scale-105 hover:bg-gray-800 transition-all duration-200"
            >
              Explore Discounts
            </Link>
          ) : (
            <p className="text-base text-gray-700">
              Please{" "}
              <span className="font-semibold text-black">
                select a shipping profile
              </span>{" "}
              to continue
            </p>
          )}
        </div>

        {/* Shipping & Payment logos side by side */}
        <div className="w-full flex flex-col items-center mt-12">
          <div className="flex flex-row items-center justify-center gap-8">
            {/* Shipping */}
            <div className="flex flex-col items-center gap-1">
              <span className="text-sm text-gray-500">Delivered by:</span>
              <img
                src={assets.Shipping}
                alt="Shipping Logo"
                className="h-8 opacity-80 hover:opacity-100 transition"
              />
            </div>

            {/* Payment */}
            <div className="flex flex-col items-center gap-1">
              <span className="text-sm text-gray-500">Payment by:</span>
              <img
                src={assets.VNPAY}
                alt="VNPAY Logo"
                className="h-8 opacity-80 hover:opacity-100 transition"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="w-full mt-16">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ShippingProfile;
