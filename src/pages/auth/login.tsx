import React, { useCallback, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { GoogleButton } from "@/components/ui/google-button.tsx"
import { TextField } from "@/components/ui/textfield"
import { PasswordField } from "@/components/ui/passwordfield"
import api, { setAccessToken } from "@/services/api"
import { getMe } from "@/services/getMe.ts"
import {UserRole, useUser} from "@/utils/user-context.tsx"

interface LoginBody {
  email: string
  password: string
}

type LoginErrors = {
  [K in keyof LoginBody]?: string[]
}

export default function Login() {
  const navigate = useNavigate()
  const { saveUser, user } = useUser()
  const [loadingBtn, setLoadingBtn] = useState(false)
  const [data, setData] = useState<LoginBody>({ email: "", password: "" })
  const [errors, setErrors] = useState<LoginErrors>({})

  useEffect(() => {
    console.log("Use effect login dipanggil")
    if (user && user.id !== "fallback-user") {
      const userRoles = Array.isArray(user.roles) ? user.roles : []

      if (userRoles.includes(UserRole.ADMIN)) {
        navigate("/dashboard/admin", { replace: true })
      } else if (userRoles.includes(UserRole.INSTRUCTOR)) {
        navigate("/dashboard/instructor", { replace: true })
      } else if (userRoles.includes(UserRole.STUDENT)) {
        navigate("/dashboard/student", { replace: true })
      }
    }
  }, [user, navigate])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setData({ ...data, [e.target.name]: e.target.value })
      setErrors({ ...errors, [e.target.name]: undefined })
    },
    [data, errors],
  )

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoadingBtn(true)
    setErrors({})

    try {
      const response = await api.post("/auth/login", data, {
        withCredentials: true,
        skipAuth: true,
        headers: { "Content-Type": "application/json" },
      })

      if (response.status === 200 && response.data.accessToken) {
        // ✅ Set access token di runtime variable
        setAccessToken(response.data.accessToken)
        console.log("🔑 Token set:", response.data.accessToken.substring(0, 20) + "...")

        // ✅ Fetch user data
        const me = await getMe()

        if (me) {
          // ✅ Save user ke context (TIDAK ke localStorage)
          saveUser(me)

          console.log("✅ Login successful, user saved to context")
          console.log(me)
        } else {
          setErrors({ email: ["Failed to fetch user data"] })
        }
      } else {
        setErrors(response.data.errors || { email: ["Login failed"] })
      }
    } catch (error: any) {
      console.error("❌ Login error:", error)
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors)
      } else {
        setErrors({
          email: [error.response?.data?.message || "Login failed. Please try again."],
        })
      }
    } finally {
      setLoadingBtn(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center">
      <div className="bg-white bg-opacity-90 p-8 rounded-lg w-full max-w-sm text-center">
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

          <div className="text-right mt-2">
            <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loadingBtn}
            className="w-full bg-blue-600 text-white p-3 mt-4 rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingBtn ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="my-4 text-gray-500">or</div>
        <GoogleButton label="Login" />

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