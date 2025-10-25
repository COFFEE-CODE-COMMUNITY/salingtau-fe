import { useState } from "react";
import AuthService from "../../../services/AuthService";

export default function useOAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      const res = await AuthService.oauth2Google();
      if (res?.url) {
        // Redirect ke URL Google OAuth
        window.location.href = res.url;
      } else {
        throw new Error("URL OAuth tidak ditemukan");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Gagal memulai login dengan Google");
    } finally {
      setLoading(false);
    }
  };

  return { loginWithGoogle, loading, error };
}
