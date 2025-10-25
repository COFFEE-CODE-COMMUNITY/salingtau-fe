import { useState } from "react";
import AuthService from "../../../services/AuthService.ts"

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const register = async (data: RegisterData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await AuthService.register(data);
      setSuccess(true);
      return response;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to register");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, success };
}
