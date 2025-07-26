import { useContext } from "react";
import { PromotionContext } from "../contexts/PromotionContext";

export const usePromotions = () => {
  return useContext(PromotionContext);
};
