import React, { useCallback, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { GoogleButton } from "@/components/ui/google-button.tsx"
import { TextField } from "@/components/ui/textfield"
import { PasswordField } from "@/components/ui/passwordfield"
import api, { setAccessToken } from "@/services/api"
import { checkAuth } from "@/services/checkAuth.ts";

interface LoginBody {
  email: string
  password: string
}

type LoginErrors = {
  [K in keyof LoginBody]?: string[]
}

export default function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [data, setData] = useState<LoginBody>({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<LoginErrors>({})

  // Check if already logged in
  useEffect(() => {
    (async function() {
      const isLogin = await checkAuth()
      if (isLogin) navigate("/homepage")
    })()
  }, [navigate])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setData({ ...data, [e.target.name]: e.target.value })
      setErrors({ ...errors, [e.target.name]: "" })
    },
    [data, errors]
  )

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)

    await api
      .post("/auth/login", data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response.data)
        if (response.status === 200 && response.data.accessToken) {
          setAccessToken(response.data.accessToken)
          setSuccess(true)

          // Redirect after short delay
          setTimeout(() => {
            navigate("/homepage")
          }, 500)
        } else {
          setErrors(response.data.errors || {})
        }

        setLoading(false)
      })
      .catch((error) => {
        console.error("Login error:", error)

        // Handle validation errors
        if (error.response?.data?.errors) {
          setErrors(error.response.data.errors)
        } else {
          // Handle general errors
          setErrors({
            email: [error.response?.data?.message || "Login failed. Please try again."],
          })
        }

        setLoading(false)
      })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center">
      <div className="bg-white bg-opacity-90 p-8 rounded-lg w-full max-w-sm text-center">
        {/* Logo */}
        <div className="mb-6">
          <img src="/SalingTau.png" alt="Logo" className="w-20 mx-auto" />
        </div>

        <form onSubmit={handleLogin}>
          <TextField
            type="email"
            placeholder="Email"
            error={!!errors.email}
            helperText={errors.email && errors.email[0]}
            name="email"
            value={data.email}
            onChange={handleChange}
          />

          <PasswordField
            placeholder="Password"
            error={!!errors.password}
            helperText={errors.password && errors.password[0]}
            name="password"
            value={data.password}
            onChange={handleChange}
          />

          {/* Forgot Password Link */}
          <div className="text-right mt-2">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Tombol Login */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 mt-4 rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Login..." : "Login"}
          </button>

          {success && (
            <p className="text-green-500 text-sm mt-3 bg-green-50 p-2 rounded">
              Login success! Redirecting...
            </p>
          )}
        </form>

        {/* OR */}
        <div className="my-4 text-gray-500">or</div>

        {/* Tombol Google */}
        <GoogleButton label="Login" />

        {/* Register Link */}
        <p className="mt-6 text-gray-700">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}