import { createContext, useState } from "react";
import getProfileAPI, { addProfileAPI } from "../api/getProfileAPI";

const ProfileContext = createContext(null);
export const ProfileProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profile, setProfile] = useState({});
  const [selectedProfile, setSelectedProfile] = useState({});
  const [profiles, setProfiles] = useState([]);
  const [fullAddress, setFullAddress] = useState("");

  const handleSetFullAddress = (address, ward, district, province) => {
    setFullAddress(address + ", " + ward + ", " + district + ", " + province);
  };

  const handleUpdateProfile = async (profile) => {
    try {
      await addProfileAPI(profile);
      setProfile(profile);
      return { success: true, status: 200 };
    } catch (error) {
      if (!error.response?.status) {
        return { success: false, status: 0 };
      } else {
        return { success: false, status: error.response?.status };
      }
    }
  };

  const handleGetProfiles = async () => {
    try {
      const res = await getProfileAPI();
      setProfiles(res.profiles);
      return { success: true, status: 200 };
    } catch (error) {
      if (!error.response?.status) {
        return { success: false, status: 0 };
      } else {
        return { success: false, status: error.response?.status };
      }
    }
  };

  const handleSelectedProfile = (profile) => {
    setSelectedProfile(profile);
  };
  const value = {
    name,
    setName,
    phoneNumber,
    setPhoneNumber,
    profile,
    setProfile,
    handleUpdateProfile,
    profiles,
    setProfiles,
    handleGetProfiles,
    selectedProfile,
    handleSelectedProfile,
    fullAddress,
    setFullAddress,
    handleSetFullAddress,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export default ProfileContext;
