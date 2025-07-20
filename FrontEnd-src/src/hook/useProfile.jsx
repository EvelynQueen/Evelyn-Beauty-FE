import { useContext } from "react";
import ProfileContext from "../contexts/ProflieContext";
const useProfile = () => {
  const context = useContext(ProfileContext);
  return context;
};

export default useProfile;
