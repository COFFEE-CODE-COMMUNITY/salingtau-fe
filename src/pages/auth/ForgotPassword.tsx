import React, { useState, useEffect } from "react";
import InputEmail from "../../components/auth/InputEmail.tsx";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isCounting, setIsCounting] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return alert("Masukkan email terlebih dahulu.");

    // Simulasi request ke backend
    console.log("Request reset password untuk:", email);

    // Mulai countdown
    setIsCounting(true);
    setCountdown(60);
  };

  // Jalankan timer selama 1 menit
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
        <h2 className="text-2xl font-semibold text-center mb-6">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
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
              isCounting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isCounting ? `Kirim ulang dalam ${countdown}s` : "Kirim Link Reset"}
          </button>
        </form>
        <p className="text-sm text-center text-gray-500 mt-4">
          Kami akan mengirim link reset password ke email Anda.
        </p>
      </div>
    </div>
  );
}
