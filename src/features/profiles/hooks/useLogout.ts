import { useState } from "react";
import AuthService from "../../../services/AuthService";
import { useNavigate } from "react-router-dom";

export default function useLogout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      await AuthService.logout();

      // Bersihkan local storage & session
      localStorage.removeItem("accessToken");
      sessionStorage.clear();

      setSuccess(true);

      // Redirect dan hilangkan history login
      await navigate("/login", { replace: true });
    } catch (err: any) {
      console.error("Logout failed:", err);
      setError(err.response?.data?.message || "Logout failed");
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading, error, success };
}
