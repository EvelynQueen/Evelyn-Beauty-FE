import { useEffect } from "react";
import useProfile from "../hook/useProfile";
import { toast } from "react-toastify";
import usePayment from "../hook/usePayment";

const ProfileSelected = () => {
  const {
    profile,
    profiles,
    selectedProfile,
    handleSelectedProfile,
    handleGetProfiles,
  } = useProfile();

  const { shippingFee, getShippingFee } = usePayment();

  const handleGetShippingFee = async (fullAddress) => {
    const res = await getShippingFee(fullAddress);
    if (!res.success) {
      switch (res.status) {
        case 403:
          toast.error("Session expired, please login again");
          break;
        case 0:
          toast.error("Something went wrong, please try again");
          break;
        default:
          toast.error("Something went wrong, please try again");
          break;
      }
    }
  };
  useEffect(() => {
    console.log(selectedProfile);
    if (selectedProfile.address) {
      handleGetShippingFee(selectedProfile.address);
      console.log("Shipping fee updated:", shippingFee);
    }
  }, [selectedProfile]);

  useEffect(() => {
    console.log(shippingFee);
  }, [selectedProfile, shippingFee]);
  const getProfiles = async () => {
    const res = await handleGetProfiles();
    if (!res.success) {
      switch (res.status) {
        case 0:
          toast.error("Network error, please try again");
          break;
        case 403:
          toast.error("Access denied, please log in");
          break;
        case 500:
          toast.error("Server error, please try again later");
          break;
        default:
          toast.error("Something went wrong, please try again");
      }
    }
  };
  useEffect(() => {
    getProfiles();
  }, [profile]);

  useEffect(() => {
    console.log(selectedProfile);
  }, [selectedProfile]);

  return (
    <div className="w-full flex flex-col items-start justify-start gap-4">
      {profiles.length > 0 ? (
        profiles.map((profile) => (
          <div
            className="w-full flex flex-col items-start justify-start gap-2"
            key={profile.profileId}
          >
            <div className="w-full flex flex-row items-center justify-between gap-4">
              {/* Profile information */}
              <div className="w-full">
                <p className="text-sm md:text-base font-semibold">
                  {profile.name}
                </p>
                <p className="text-sm text-gray-600">{profile.phone}</p>
                <p className="text-sm text-gray-600">{profile.address}</p>
              </div>

              {/* Selected checkbox */}
              <div className="basis-1/6 flex justify-center">
                <input
                  className="w-5 h-5"
                  type="radio"
                  name="selectedProfile"
                  checked={
                    selectedProfile
                      ? selectedProfile.profileId === profile.profileId
                      : false
                  }
                  onChange={() => {
                    handleSelectedProfile(profile);
                  }}
                />
              </div>
            </div>
            <hr className="w-full border-gray-300 my-2" />
          </div>
        ))
      ) : (
        <p className="text-sm md-text-base text-gray-500 caret-transparent">
          You don't have any shipping profile yet! Let's{" "}
          <a href="#create-profile" className="text-gray-700 font-semibold">
            Create one
          </a>
        </p>
      )}
    </div>
  );
};

export default ProfileSelected;
