import {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("accessToken"));
  const [role, setRole] = useState(() => localStorage.getItem("userRole"));
  const [accountId, setAccountId] = useState(() =>
    localStorage.getItem("accountId")
  );

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("accountId");
    setAccountId("");
    setToken("");
    setRole("");
  }, []);

  // Setup axios interceptors for automatic logout on token expiry
  useEffect(() => {
    try {
      // Clear any existing interceptors first
      axios.interceptors.request.clear();
      axios.interceptors.response.clear();

      // Request interceptor to add token to headers
      const requestInterceptor = axios.interceptors.request.use(
        (config) => {
          try {
            const token = localStorage.getItem("accessToken");
            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            }
          } catch {
            // Silent error handling
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );

      // Response interceptor to handle 401 errors
      const responseInterceptor = axios.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          if (error.response?.status === 401) {
            // Set flag for login page to show toast
            sessionStorage.setItem("sessionExpired", "true");

            // Token expired or invalid - logout user
            logout();

            // Redirect to login page after a short delay
            setTimeout(() => {
              window.location.href = "/login";
            }, 1000);
          }
          return Promise.reject(error);
        }
      );

      // Cleanup interceptors on unmount
      return () => {
        try {
          axios.interceptors.request.eject(requestInterceptor);
          axios.interceptors.response.eject(responseInterceptor);
        } catch {
          // Silent cleanup error
        }
      };
    } catch {
      // Silent setup error
    }
  }, [logout]);

  useEffect(() => {
    const checkTokenExpiry = () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        try {
          const decoded = jwtDecode(accessToken);
          const now = Date.now() / 1000;
          if (decoded.exp && decoded.exp < now) {
            // Set flag for login page to show toast
            sessionStorage.setItem("sessionExpired", "true");

            // Show notification to user (always show)
            toast.warning("Your session has expired. Please log in again.", {
              position: "top-right",
              autoClose: 2000,
            });

            logout();
            window.location.href = "/login";
          }
        } catch (err) {
          console.error("Lỗi decode token:", err);
          logout();
        }
      }
    };

    const interval = setInterval(checkTokenExpiry, 5000); // Kiểm tra mỗi 5 giây
    return () => clearInterval(interval); // Clear khi unmount
  }, [logout]);

  useEffect(() => {
    const syncAuth = () => {
      setToken(localStorage.getItem("accessToken"));
      setRole(localStorage.getItem("userRole"));
      setAccountId(localStorage.getItem("accountId"));
    };
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  const login = (accessToken, userRole, accountId) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("userRole", userRole);
    localStorage.setItem("accountId", accountId);
    setToken(accessToken);
    setRole(userRole);
    setAccountId(accountId);
  };

  const value = useMemo(
    () => ({ token, role, accountId, login, logout }),
    [token, role, accountId, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
