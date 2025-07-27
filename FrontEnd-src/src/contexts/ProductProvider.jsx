import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { addProductAPI } from "../api/getStaffAPI";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const currency = "VND";
  const [products, setProducts] = useState([]);

  const handleAddProduct = async (product, images) => {
    try {
      const result = await addProductAPI(product, images);

      const newProducts = result.products || [result.product];
      setProducts((prev) => [...prev, ...newProducts]);

      toast.success("Product added successfully!");
      return { success: true, product: newProducts[0] };
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
