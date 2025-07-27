import { useEffect, useRef } from "react";
import { loginGoogleAPI } from "../api/authAPI";
import { toast } from "react-toastify";
import useAuth from "../hook/useAuth";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const GoogleLoginBtn = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && window.google) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });
      initialized.current = true;
    }
  }, []);

  const handleGoogleLogin = () => {
    window.google.accounts.id.prompt();
  };

  const handleCredentialResponse = async (response) => {
    try {
      const token = response.credential;
      const payload = { credential: token, action: "login" };
      const data = await loginGoogleAPI(payload);
      const { token: accessToken, account } = data;

      login(accessToken, account.role, account.accountId);

      if (account.role === "OS") {
        navigate("/all-orders");
      } else if (["SF", "AD"].includes(account.role)) {
        navigate("/order-dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Google login failed", error);
      toast.error("Google login failed. Please try again.");
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="caret-transparent bg-white text-gray-800 border border-gray-300 p-2 flex flex-row items-center justify-center gap-2 w-full rounded-2xl mt-4 cursor-pointer hover:bg-gray-200 transition-colors duration-300 shadow-sm"
    >
      <FcGoogle className="text-xl" />
      Login with Google
    </button>
  );
};

export default GoogleLoginBtn;
