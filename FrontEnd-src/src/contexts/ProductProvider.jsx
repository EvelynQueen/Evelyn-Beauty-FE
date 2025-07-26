import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { addProductAPI, deleteProductAPI } from "../api/getStaffAPI";

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
  // 2. Thêm hàm handleDeleteProduct
  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProductAPI(productId);

      // SỬA DÒNG NÀY:
      // Thêm "product &&" để kiểm tra trước khi truy cập product.id
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product && product.id !== productId)
      );

      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error(error?.message || "Failed to delete product");
    }
  };

  const value = {
    currency,
    products,
    handleAddProduct,
    handleDeleteProduct,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export default ProductProvider;
