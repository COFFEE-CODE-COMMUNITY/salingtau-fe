import React, { useCallback, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { GoogleButton } from "@/components/ui/google-button.tsx"
import { TextField } from "@/components/ui/textfield"
import { PasswordField } from "@/components/ui/passwordfield"
import api, { setAccessToken } from "@/services/api"
import { getMe } from "@/services/getMe.ts"
import { useUser} from "@/utils/user-context.tsx"
import {useUserStore} from "@/utils/useActiveRoles.ts";
import {checkAuth} from "@/services/checkAuth.ts";

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
  const activeRole = useUserStore((state) => state.activeRole);

  useEffect(() => {
    if (user && user.id !== "fallback-user" && activeRole) {
      if (activeRole === "instructor") {
        navigate("/dashboard/instructor", { replace: true })
      } else if (activeRole === "student") {
        navigate("/dashboard/student", { replace: true })
      }
    }

    const init = async () => {
      const auth = await checkAuth()
      if (auth) {
        const me = await getMe()
        console.log(me)
        if (me) {
          saveUser(me)
          navigate("/dashboard/student", { replace: true })
        }
      }
    }

    init()
  }, [user, activeRole, navigate, saveUser])


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
        setAccessToken(response.data.accessToken)

        const me = await getMe()

        if (me) {
          saveUser(me)

        } else {
          setErrors({ email: ["Failed to fetch user data"] })
        }
      } else {
        setErrors(response.data.errors || { email: ["Login failed"] })
      }
    } catch (error: any) {
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
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center px-4">
      <div className="bg-white/95 backdrop-blur p-6 sm:p-8 rounded-xl w-full max-w-md text-center shadow-md">

        {/* Logo */}
        <div className="mb-6">
          <img src="/SalingTau.png" alt="Logo" className="w-16 sm:w-20 mx-auto" />
        </div>

        <form onSubmit={handleLogin} className="space-y-3">
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

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-xs sm:text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loadingBtn}
            className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4 text-base sm:text-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingBtn ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="my-4 text-gray-500 text-sm sm:text-base">or</div>
        <GoogleButton label="Login" />

        <p className="mt-6 text-gray-700 text-xs sm:text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}