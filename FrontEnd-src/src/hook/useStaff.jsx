import { useContext } from "react";
import { StaffContext } from "../contexts/StaffContext";

const useStaff = () => {
  const context = useContext(StaffContext);
  return context;
};

export default useStaff;
