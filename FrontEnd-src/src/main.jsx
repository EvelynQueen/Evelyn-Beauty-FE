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
import { ProfileProvider } from "./contexts/ProflieContext.jsx";
import { OrderProvider } from "./contexts/OrderContext.jsx";
import { SupportProvider } from "./contexts/SupportContext.jsx";
import { PromotionProvider } from "./contexts/PromotionContext.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <RegisterProvider>
        <ProductProvider>
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
