import { useEffect, useState } from "react";
import AuthService from "../../services/AuthService.ts";

export default function useAuthCheck() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await AuthService.checkAuth();

        console.log(res)

        setIsAuthenticated(res);
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { isAuthenticated, loading };
}
