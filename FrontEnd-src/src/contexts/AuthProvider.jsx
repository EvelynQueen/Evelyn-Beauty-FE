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

  useEffect(() => {
    try {
      axios.interceptors.request.clear();
      axios.interceptors.response.clear();

      const requestInterceptor = axios.interceptors.request.use(
        (config) => {
          try {
            const token = localStorage.getItem("accessToken");
            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            }
          } catch (error) {
            console.error("Error adding token to headers:", error);
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );

      // Response interceptor to handle auth errors
      const responseInterceptor = axios.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          const status = error.response?.status;

          switch (status) {
            case 401:
              sessionStorage.setItem("sessionExpired", "true");
              logout();
              setTimeout(() => {
                window.location.href = "/login";
              }, 1000);
              break;
            case 403:
              toast.error("You don't have permission to access this resource", {
                position: "top-right",
                autoClose: 3000,
              });
              break;
            case 500:
              toast.error("Server error. Please try again later.", {
                position: "top-right",
                autoClose: 3000,
              });
              break;
            case 503:
              // Service unavailable
              toast.error(
                "Service temporarily unavailable. Please try again later.",
                {
                  position: "top-right",
                  autoClose: 3000,
                }
              );
              break;
            default:
              // Other errors - let components handle them
              break;
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
            sessionStorage.setItem("sessionExpired", "true");

            toast.warning("Your session has expired. Please log in again.", {
              position: "top-right",
              autoClose: 2000,
            });

            logout();
            window.location.href = "/login";
          }
        } catch (err) {
          console.error("Error decode token:", err);
          logout();
        }
      }
    };

    const interval = setInterval(checkTokenExpiry, 30000); // Check every 30 seconds instead of 5
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

  const login = useCallback(
    (accessToken, userRole, accountId) => {
      try {
        // Validate token before storing
        const decoded = jwtDecode(accessToken);
        const now = Date.now() / 1000;
        if (decoded.exp && decoded.exp < now) {
          throw new Error("Token is already expired");
        }

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userRole", userRole);
        localStorage.setItem("accountId", accountId);
        setToken(accessToken);
        setRole(userRole);
        setAccountId(accountId);
      } catch (error) {
        console.error("Error during login:", error);
        logout();
        throw error;
      }
    },
    [logout]
  );

  const isAuthenticated = useMemo(() => {
    return !!token && !!role && !!accountId;
  }, [token, role, accountId]);

  const value = useMemo(
    () => ({ token, role, accountId, login, logout, isAuthenticated }),
    [token, role, accountId, login, logout, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
