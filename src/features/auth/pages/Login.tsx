import { Link, useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react"
import InputEmail from "../components/InputEmail.tsx"
import InputPassword from "../components/InputPassword.tsx"
import GoogleButton from "../components/GoogleButton.tsx"
import useLogin from "../hooks/useLogin.ts"
import AlertMessage from "../../../globals/components/AlertMessage.tsx"
import AuthService from "../../../services/AuthService.ts";

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, loading, error } = useLogin()
  const [alert, setAlert] = useState<{ type: "success" | "error" | "info"; message: string } | null>(null)

  // redirect kalau sudah login
  useEffect(() => {
    (async function() {
      const isLogin = await AuthService.checkAuth()

      if (isLogin) navigate("/homepage")
    })()
  }, [navigate])

  // tampilkan alert kalau ada error dari hooks
  useEffect(() => {
    if (error) {
      setAlert({ type: "error", message: error || "Terjadi kesalahan saat login" })
    }
  }, [error])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const token = await login(email, password)
      localStorage.setItem("access_token", token)
      navigate("/homepage")
    } catch (err: any) {
      // Jika service lempar error (misal throw error di useLogin)
      setAlert({ type: "error", message: err.message || "Login gagal" })
    }
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
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Memproses..." : "Login"}
          </button>

          {/* tampilkan alert kalau ada error */}
          {alert && (
            <AlertMessage
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          )}
        </form>

        <p className="mt-3 text-gray-700">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Lupa password
          </Link>
        </p>

        <div className="my-4 text-gray-500">atau</div>

        <GoogleButton label={"Login"} />

        <p className="mt-6 text-gray-700">
          Belum punya akun?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  )
}
