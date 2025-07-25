import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { addProductAPI } from "../api/getStaffAPI";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const currency = "VND";
  const [products, setProducts] = useState([]);

  const handleAddProduct = async (products, images) => {
    try {
      const result = await addProductAPI(products, images);
      setProducts((prev) => [...prev, result.product]);
      toast.success("Product added successfully!");
      return { success: true, product: result.product };
    } catch (error) {
      toast.error(error?.message || "Failed to add product");
      return { success: false };
    }
  };

  const value = {
    currency,
    products,
    handleAddProduct,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export default ProductProvider;
