import { useContext } from "react";
import SupportContext from "../contexts/SupportContext";

const useSupport = () => {
  const context = useContext(SupportContext);
  return context;
};

export default useSupport;
