import { useContext } from "react";
import { ProductContext } from "../contexts/ProductProvider";

const useProduct = () => {
  const context = useContext(ProductContext);
  return context;
};
export default useProduct;
