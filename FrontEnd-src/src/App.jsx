import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
// Redirect non-CU users to their dashboard
const RedirectIfRole = ({ children }) => {
  const { role, token } = useAuth();
  // Only redirect if user is logged in and has a role
  if (token && role === "OS") return <Navigate to="/owner-dashboard" replace />;
  if (token && role === "SF") return <Navigate to="/staff-dashboard" replace />;
  return children;
};

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

// Public routes that should redirect non-CU users
const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/shopping", element: <Shopping /> },
  { path: "/products/:productId", element: <Product /> },
  { path: "/about", element: <AboutUs /> },
  { path: "/delivery", element: <Delivery /> },
  { path: "/policy", element: <Policy /> },
];

// Protected routes
const protectedRoutes = [
  { path: "/profile", element: <Profile />, roles: ["CU"], token: true },
  { path: "/order", element: <Order />, roles: ["CU"], token: true },
  { path: "/cart", element: <Cart />, roles: ["CU"], token: true },
  {
    path: "/owner-dashboard",
    element: <OwnerDashboard />,
    roles: ["OS"],
    token: true,
  },
  {
    path: "/staff-dashboard",
    element: <StaffDashboard />,
    roles: ["SF"],
    token: true,
  },
];

const App = () => {
  const { role, token } = useAuth();
  const location = useLocation();
  const hiddenNavBarRoutes = ["/login", "/signup", "/verify-email"];
  const hideNavBar = hiddenNavBarRoutes.includes(location.pathname);

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
};

export default App;
