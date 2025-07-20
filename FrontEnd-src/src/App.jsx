import {
  matchPath,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Shopping from "./pages/Shopping";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Delivery from "./pages/Delivery";
import Policy from "./pages/Policy";
import Order from "./pages/Order";
import Profile from "./pages/Profile";
import useAuth from "./hook/useAuth";
import OwnerDashboard from "./pages/OwnerDashboard";
import Product from "./pages/Product";
import StaffDashboard from "./pages/StaffDashboard";
import SignUp from "./pages/SignUp";
import VerifyEmail from "./pages/VerifyEmail";
import OsSideBar from "./components/OsSideBar";
import StaffAccount from "./pages/StaffAccount";
import Discount from "./pages/Discount";
import ShippingProfile from "./pages/ShippingProfile";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import SFSideBar from "./components/SFSideBar";
import OrderDashboard from "./pages/OrderDashboard";
import ProductModifier from "./pages/ProductModifier";
import SupportRequests from "./pages/SupportRequests";
import Support from "./pages/Support";
import DetailOrder from "./components/DetailOrder";
// Redirect non-CU users to their dashboard
const RedirectIfRole = ({ children }) => {
  const { role, token } = useAuth();
  // Only redirect if user is logged in and has a role
  if (token && role === "OS") return <Navigate to="/owner-dashboard" replace />;
  if (token && role === "SF") return <Navigate to="/staff-dashboard" replace />;
  return children;
};

// Public routes that should redirect non-CU users
const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/shopping", element: <Shopping /> },
  { path: "/products/:productId", element: <Product /> },
  { path: "/about", element: <AboutUs /> },
  { path: "/delivery", element: <Delivery /> },
  { path: "/policy", element: <Policy /> },
];

// Setup protected route for role and token
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, role } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};
// Protected routes
const protectedRoutes = [
  { path: "/profile", element: <Profile />, roles: ["CU"], token: true },
  { path: "/order", element: <Order />, roles: ["CU"], token: true },
  { path: "/cart", element: <Cart />, roles: ["CU"], token: true },
  { path: "/discount", element: <Discount />, roles: ["CU"], token: true },
  { path: "/support", element: <Support />, roles: ["CU"], token: true },
  {
    path: "/payment/success",
    element: <PaymentSuccess />,
    roles: ["CU"],
    token: true,
  },
  {
    path: "/payment/cancel",
    element: <PaymentCancel />,
    roles: ["CU"],
    token: true,
  },
  {
    path: "/shipping-information",
    element: <ShippingProfile />,
    roles: ["CU"],
    token: true,
  },

  {
    path: "/owner-dashboard",
    element: <OwnerDashboard />,
    roles: ["OS"],
    token: true,
  },
  {
    path: "/staff-modifier",
    element: <StaffAccount />,
    roles: ["OS"],
    token: true,
  },
  {
    path: "/staff-dashboard",
    element: <StaffDashboard />,
    roles: ["SF"],
    token: true,
  },
  {
    path: "/order-dashboard",
    element: <OrderDashboard />,
    roles: ["SF"],
    token: true,
  },
  {
    path: "/product-modifier",
    element: <ProductModifier />,
    roles: ["SF"],
    token: true,
  },
  {
    path: "/support-requests",
    element: <SupportRequests />,
    roles: ["SF"],
    token: true,
  },
  {
    path: "/order/:orderId",
    element: <DetailOrder />,
    roles: ["SF"],
    token: true,
  },
];

// routes that hide navbar
const hiddenNavBarRoutes = ["/login", "/signup", "/verify-email"];

// routes that show side bar
const ownerRoutes = ["/owner-dashboard", "/staff-modifier"];
const staffRoutes = [
  "/staff-dashboard",
  "/order-dashboard",
  "/product-modifier",
  "/support-requests",
  "/order/:orderId",
];

const App = () => {
  const { role, token } = useAuth();
  const location = useLocation();
  const hideNavBar = hiddenNavBarRoutes.includes(location.pathname);
  const isOS =
    token && role === "OS" && ownerRoutes.includes(location.pathname);
  const isSF =
    token &&
    role === "SF" &&
    staffRoutes.some((path) =>
      matchPath({ path, end: false }, location.pathname)
    );

  if (isOS) {
    return (
      <div className="flex h-screen w-full justify-between">
        <OsSideBar />
        <div className="flex-1 overflow-y-auto p-4">
          <Routes>
            {protectedRoutes.map(({ path, element, roles }) => (
              <Route
                key={path}
                path={path}
                element={
                  <ProtectedRoute allowedRoles={roles}>
                    {element}
                  </ProtectedRoute>
                }
              />
            ))}
          </Routes>
          <ToastContainer />
        </div>
      </div>
    );
  } else if (isSF) {
    return (
      <div className="flex h-screen w-full justify-between">
        <SFSideBar />
        <div className="flex-1 overflow-y-auto p-4">
          <Routes>
            {protectedRoutes.map(({ path, element, roles }) => (
              <Route
                key={path}
                path={path}
                element={
                  <ProtectedRoute allowedRoles={roles}>
                    {element}
                  </ProtectedRoute>
                }
              />
            ))}
          </Routes>
          <ToastContainer />
        </div>
      </div>
    );
  } else {
    return (
      <div className="h-screen px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        {!hideNavBar && (!token || !role || role === "CU") && <NavBar />}

        <Routes>
          {/* Public routes with role redirection */}
          {publicRoutes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={<RedirectIfRole>{element}</RedirectIfRole>}
            />
          ))}

          {/* Login route */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify-email" element={<VerifyEmail />} />

          {/* Protected routes */}
          {protectedRoutes.map(({ path, element, roles }) => (
            <Route
              key={path}
              path={path}
              element={
                <ProtectedRoute allowedRoles={roles}>{element}</ProtectedRoute>
              }
            />
          ))}
        </Routes>

        {/* Toast notifications */}
        <ToastContainer />
      </div>
    );
  }
};

export default App;
