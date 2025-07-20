import { IoIosArrowBack } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";
import ProfileForm from "../components/ProfileForm";
import ProfileSelected from "../components/ProfileSelected";
import { RiUserLocationFill } from "react-icons/ri";
import useProfile from "../hook/useProfile";

const ShippingProfile = () => {
  const { selectedProfile } = useProfile();
  return (
    <div className="w-full flex flex-col items-center justify-center mb-10">
      {/* Back to previous page */}
      <button
        onClick={() => window.history.back()}
        className="w-full flex flex-row justify-start items-center mb-5 caret-transparent cursor-pointer"
      >
        <IoIosArrowBack />
        <p className="text-sm sm:text-base md:text-xl ml-2">Back</p>
      </button>
      <hr className="w-full bg-gray-500 mb-5 caret-transparent" />

      {/* Title */}
      <div className="w-full flex flex-row items-center justify-start mb-10 gap-1 text-base sm:text-base md:text-xl caret-transparent">
        <FaLocationDot />
        <p>Shipping Profile</p>
      </div>

      {/* Shipping profile form */}
      <div className="w-full flex flex-row items-start justify-between gap-4 mb-10">
        <div className="w-4/9 flex flex-col items-start justify-start gap-4 mb-10">
          <p className="flex flex-row justify-start items-center text-sm sm:text-base md:text-lg text-gray-800 mb-2">
            <IoIosAddCircle /> Add a new shipping profile
          </p>
          <ProfileForm />
        </div>
        <div className="w-4/9 flex flex-col items-start justify-start gap-4">
          <p className="flex flex-row justify-start items-center text-sm sm:text-base md:text-lg text-gray-800 mb-2">
            <RiUserLocationFill />
            Your existing shipping profiles
          </p>
          <ProfileSelected />
        </div>
      </div>
      {/* Navigation button */}
      <div className="w-full flex flex-row justify-end items-center mb-20">
        {selectedProfile.profileId ? (
          <Link
            to="/discount"
            className="bg-black text-white px-4 py-2 text-sm sm:text-base md:text-lg rounded-md hover:scale-105 hover:bg-gray-800 transition-all duration-200"
          >
            Explore Discounts
          </Link>
        ) : (
          <p className="text-sm sm:text-base md:text-lg text-gray-700">
            Please{" "}
            <span className="font-semibold text-black">
              select a shipping profile
            </span>{" "}
            to continue
          </p>
        )}
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ShippingProfile;
