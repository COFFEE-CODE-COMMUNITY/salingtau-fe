import React, { useCallback, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { TextField } from "@/components/ui/textfield"
import api from "@/services/api"

interface ForgotPasswordBody {
  email: string
}

type ForgotPasswordErrors = {
  [K in keyof ForgotPasswordBody]?: string[]
}

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [data, setData] = useState<ForgotPasswordBody>({
    email: "",
  })
  const [errors, setErrors] = useState<ForgotPasswordErrors>({})
  const [isCounting, setIsCounting] = useState(false)
  const [countdown, setCountdown] = useState(60)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setData({ ...data, [e.target.name]: e.target.value })
      setErrors({ ...errors, [e.target.name]: "" })
    },
    [data, errors]
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)

    await api
      .post("/auth/password-reset", data)
      .then((response) => {
        console.log(response.data)
        if (response.status === 200) {
          setSuccess(true)
          setIsCounting(true)
          setCountdown(60)
        } else {
          setErrors(response.data.errors || {})
        }

        setLoading(false)
      })
      .catch((error) => {
        console.error("Forgot password error:", error)

        if (error.response?.data?.errors) {
          setErrors(error.response.data.errors)
        } else {
          setErrors({
            email: [
              error.response?.data?.message ||
              "Failed to send password reset email.",
            ],
          })
        }

        setLoading(false)
      })
  }

  useEffect(() => {
    let timer: number | undefined;
    if (isCounting && countdown > 0) {
      timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000)
    } else if (countdown === 0) {
      setIsCounting(false)
      setSuccess(false)
    }
    return () => clearTimeout(timer)
  }, [isCounting, countdown])

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center">
      <div className="bg-white bg-opacity-90 p-8 rounded-lg w-full max-w-sm text-center">
        {/* Logo */}
        <div className="mb-6">
          <img src="/SalingTau.png" alt="Logo" className="w-20 mx-auto" />
        </div>

        <h2 className="text-2xl font-semibold mb-2">Forgot Password</h2>
        <p className="text-gray-600 text-sm mb-6">
          Enter your email to receive a password reset link
        </p>

        <form onSubmit={handleSubmit}>
          <TextField
            type="email"
            placeholder="Email"
            error={!!errors.email}
            helperText={errors.email && errors.email[0]}
            name="email"
            value={data.email}
            onChange={handleChange}
            disabled={isCounting}
          />

          {/* Tombol Submit */}
          <button
            type="submit"
            disabled={loading || isCounting}
            className="w-full bg-blue-600 text-white p-3 mt-4 rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCounting
              ? `Please wait ${countdown}s`
              : loading
                ? "Sending..."
                : "Send Reset Link"}
          </button>

          {success && (
            <p className="text-green-500 text-sm mt-3 bg-green-50 p-2 rounded">
              Password reset email sent! Check your inbox.
            </p>
          )}
        </form>

        {/* Back to Login */}
        <p className="mt-6 text-gray-700 text-sm">
          Remember your password?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  )
}