import React, { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import { PasswordField } from "@/components/ui/passwordfield"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import api from "@/services/api"

interface ChangePasswordBody {
  password: string
  confirmPassword: string
}

type ChangePasswordErrors = {
  [K in keyof ChangePasswordBody]?: string[]
}

export default function ChangePassword() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [data, setData] = useState<ChangePasswordBody>({
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<ChangePasswordErrors>({})

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setData({ ...data, [e.target.name]: e.target.value })
      setErrors({ ...errors, [e.target.name]: "" })
      setErrorMessage("") // Clear alert message
    },
    [data, errors]
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Client-side validation
    if (data.password !== data.confirmPassword) {
      setErrors({
        confirmPassword: ["Passwords do not match."],
      })
      return
    }

    if (data.password.length < 6) {
      setErrors({
        password: ["Password must be at least 6 characters."],
      })
      return
    }

    // Get token from URL
    const params = new URLSearchParams(window.location.search)
    const token = params.get("token")?.toString()

    if (!token) {
      setErrors({
        confirmPassword: [], password: ["Token are expired"],
      })
      return
    }

    setLoading(true)
    setErrorMessage("")

    await api
      .post(`/auth/password-reset/change?token=${token}`, {
        password: data.password,
        confirmPassword: data.confirmPassword,
        logoutAll: true,
      })
      .then((response) => {
        if (response.status === 200) {
          setSuccess(true)

          // Redirect after short delay
          setTimeout(() => {
            navigate("/login")
          }, 2000)
        } else {
          setErrors(response.data.errors || {})
        }

        setLoading(false)
      })
      .catch((error) => {
        const message = error.response?.data?.message || "Failed to reset password. Please try again."
        setErrorMessage(message)

        if (error.response?.data?.errors) {
          setErrors(error.response.data.errors)
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

        <h2 className="text-2xl font-semibold mb-2">Change Password</h2>
        <p className="text-gray-600 text-sm mb-6">
          Enter your new password below
        </p>

        {errorMessage && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <PasswordField
            placeholder="New password"
            error={!!errors.password}
            helperText={errors.password && errors.password[0]}
            name="password"
            value={data.password}
            onChange={handleChange}
            disabled={loading}
          />

          <PasswordField
            placeholder="Confirm password"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword && errors.confirmPassword[0]}
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={handleChange}
            disabled={loading}
          />

          {/* Tombol Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 mt-4 rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Changing..." : "Change Password"}
          </button>

          {success && (
            <p className="text-green-500 text-sm mt-3 bg-green-50 p-2 rounded">
              Password changed successfully! Redirecting to login...
            </p>
          )}
        </form>
      </div>
    </div>
  )
}