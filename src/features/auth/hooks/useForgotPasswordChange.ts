import { useState } from "react"
import AuthService from "../../../services/AuthService.ts"

export function useForgotPasswordChange() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const submitChange = async (data: { password: string; confirmPassword: string }) => {
    try {
      setLoading(true)
      setError(null)

      // Ambil token dari URL query params
      const params = new URLSearchParams(window.location.search)
      const token = params.get("token")

      if (!token) {
        throw new Error("Token tidak ditemukan di URL")
      }

      const response = await AuthService.forgotPasswordChange({
        token,
        password: data.password,
        confirmPassword: data.confirmPassword,
        logoutAll: true,
      })

      setSuccess(true)
      return response
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Terjadi kesalahan")
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { submitChange, loading, error, success }
}
