import { useEffect, useState } from "react";
import AuthService from "../../services/AuthService.ts";

export default function useAuthCheck() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Selalu coba refresh token, meskipun localStorage kosong
        const res = await AuthService.refreshToken();

        // Simpan accessToken ke localStorage agar route lain bisa pakai
        if (res?.data?.accessToken) {
          localStorage.setItem("accessToken", res.data.accessToken);
        }

        setIsAuthenticated(true);
      } catch (err) {
        // Gagal refresh, berarti tidak login
        localStorage.removeItem("accessToken");
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { isAuthenticated, loading };
}
