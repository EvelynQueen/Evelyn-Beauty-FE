import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/AuthProvider.jsx";
import ProductProvider from "./contexts/ProductProvider.jsx";
import CartProvider from "./contexts/CartContext.jsx";
import { RegisterProvider } from "./contexts/RegisterProvider.jsx";
import { StaffProvider } from "./contexts/StaffContext.jsx";
import { PaymentProvider } from "./contexts/PaymentContext.jsx";
import { LocationProvider } from "./contexts/LocationContext.jsx";
import { ProfileProvider } from "./contexts/ProflieContext.jsx"; // ✅ Chú ý: có lỗi chính tả "ProflieContext" ở đây
import { OrderProvider } from "./contexts/OrderContext.jsx";
import { SupportProvider } from "./contexts/SupportContext.jsx";
// 1. Thêm import
import { PromotionProvider } from "./contexts/PromotionContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <RegisterProvider>
        <ProductProvider>
          {/* 2. Thêm Provider ở đây */}
          <PromotionProvider>
            <CartProvider>
              <StaffProvider>
                <LocationProvider>
                  <ProfileProvider>
                    <PaymentProvider>
                      <OrderProvider>
                        <SupportProvider>
                          <App />
                        </SupportProvider>
                      </OrderProvider>
                    </PaymentProvider>
                  </ProfileProvider>
                </LocationProvider>
              </StaffProvider>
            </CartProvider>
          </PromotionProvider>
        </ProductProvider>
      </RegisterProvider>
    </AuthProvider>
  </BrowserRouter>
);
