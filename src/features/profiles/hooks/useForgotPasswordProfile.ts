import { useState } from "react"
import UserService from "../../../services/UserService.ts"

export default function useForgotPasswordProfile() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  const sendResetLink = async (email: string) => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)

      if (!email) throw new Error("Email wajib diisi.")

      const res = await UserService.forgotPasswordProfile({ email })

      if (res?.message?.includes("sent") || res?.status === 200) {
        setSuccess(true)
        return {
          success: true,
          message: "Link reset password telah dikirim ke email Anda.",
        }
      } else {
        const msg = res?.message || "Gagal mengirim link reset password."
        setError(msg)
        return { success: false, message: msg }
      }
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Terjadi kesalahan pada server."
      setError(msg)
      return { success: false, message: msg }
    } finally {
      setLoading(false)
    }
  }

  return { sendResetLink, loading, error, success }
}
