import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import InputEmail from "../../components/auth/InputEmail.tsx";
import InputPassword from "../../components/auth/InputPassword.tsx";
import GoogleButton from "../../components/auth/GoogleButton.tsx";

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Need perfection
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (isLoggedIn) {
      navigate('/homepage')
    }
  }, [navigate])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem("isLoggedIn", "true");
    navigate("/homepage");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center">
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
        {/* Logo */}
        <div className="mb-6">
          <img src="/SalingTau.png" alt="Logo" className="w-20 mx-auto" />
        </div>

        <form onSubmit={handleLogin}>
          <InputEmail value={email} onChange={(e) => setEmail(e.target.value)} />
          <InputPassword value={password} onChange={(e) => setPassword(e.target.value)} />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-3 text-gray-700">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Lupa password
          </Link>
        </p>

        <div className="my-4 text-gray-500">atau</div>

        <GoogleButton
          label={"Login dengan Google"}
        />

        <p className="mt-6 text-gray-700">
          Belum punya akun?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
}