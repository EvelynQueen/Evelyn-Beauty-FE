import { useContext } from "react";
import { RegisterContext } from "../contexts/RegisterProvider";

const useRegister = () => {
  const context = useContext(RegisterContext);
  return context;
};

export default useRegister;
