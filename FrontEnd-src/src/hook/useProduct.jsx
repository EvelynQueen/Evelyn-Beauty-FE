import { useContext } from "react";
import { ProductContext } from "../contexts/ProductProvider";

const useProduct = () => useContext(ProductContext);
export default useProduct;
