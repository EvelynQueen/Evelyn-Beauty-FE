import { createContext } from "react";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const currency = "VND";

  const value = {
    currency,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export default ProductProvider;
