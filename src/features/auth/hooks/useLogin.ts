import { useState } from "react"
import AuthService from "../../../services/AuthService"
import { setAccessToken } from "../../../services/api.ts";

export default function useLogin() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      const data = await AuthService.login({ email, password })
      if (!data || !data.accessToken) {
        throw { message: "Respons tidak valid dari server" }
      }

      setAccessToken(data.accessToken)
      return data
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Gagal login. Silakan periksa kembali email atau password Anda."

      setError(message)

      setTimeout(() => setError(null), 30000)

      throw { message }
    } finally {
      setLoading(false)
    }
  }

  return { login, loading, error }
}
