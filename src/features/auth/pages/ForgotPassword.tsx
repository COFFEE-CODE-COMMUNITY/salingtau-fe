import React, { useState, useEffect } from "react";
import InputEmail from "../components/InputEmail.tsx";
import useForgotPassword from "../hooks/useForgotPassword.ts";
import AlertMessage from "../../../globals/components/AlertMessage.tsx";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { success, error, forgotPassword } = useForgotPassword();
  const [isCounting, setIsCounting] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [alert, setAlert] = useState<{ type: "success" | "error" | "info"; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setAlert({ type: "error", message: "Masukkan email terlebih dahulu." });
      return;
    }

    await forgotPassword(email);

    setIsCounting(true);
    setCountdown(60);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCounting && countdown > 0) {
      timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    } else if (countdown === 0) {
      setIsCounting(false);
    }
    return () => clearTimeout(timer);
  }, [isCounting, countdown]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        {/* Logo */}
        <div className="mb-6">
          <img src="/SalingTau.png" alt="Logo" className="w-20 mx-auto" />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-6">Lupa Password</h2>

        {alert && (
          <AlertMessage
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        {success && (
          <AlertMessage
            type="success"
            message="Email reset password sudah dikirim."
            onClose={() => setAlert(null)}
          />
        )}

        {error && (
          <AlertMessage
            type="error"
            message={error}
            onClose={() => setAlert(null)}
          />
        )}

        <form onSubmit={handleSubmit} className="mt-4">
          <InputEmail
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukkan Email"
            required
          />
          <button
            type="submit"
            disabled={isCounting}
            className={`w-full py-3 text-white font-medium rounded transition ${
              isCounting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isCounting ? `Kirim ulang dalam ${countdown}s` : "Kirim Link Reset"}
          </button>
        </form>
      </div>
    </div>
  );
}
