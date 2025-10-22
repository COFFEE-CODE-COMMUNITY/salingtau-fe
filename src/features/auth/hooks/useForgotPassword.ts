import { useState } from "react";
import AuthService from "../../../services/AuthService.ts";

interface ForgotPasswordState {
  success: boolean;
  error: string | null;
}

export default function useForgotPassword() {
  const [state, setState] = useState<ForgotPasswordState>({
    success: false,
    error: null,
  });

  const forgotPassword = async (email: string) => {
    try {
      setState({ success: false, error: null });
      const res = await AuthService.forgotPassword({ email });

      setState({ success: true, error: null });
      return res;
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Gagal mengirim email reset password";
      setState({ success: false, error: message });
    }
  };

  return {
    ...state,
    forgotPassword,
  };
}
