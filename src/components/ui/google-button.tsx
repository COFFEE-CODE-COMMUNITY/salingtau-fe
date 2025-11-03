import { useState } from "react"
import api from "@/services/api"

interface GoogleButtonProps {
  label?: string
}

export function GoogleButton({ label = "Sign in" }: GoogleButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGoogleLogin = async () => {
    try {
      setLoading(true)
      setError(null)

      // OAuth2 Google request inline
      const res = await api.get("/auth/google?platform=WEB", {
        withCredentials: false,
        skipAuth: true
      })
      const response = res.data
      console.log(response)

      if (response?.url) {
        window.location.href = response.url
      } else {
        throw new Error("OAuth URL not found in response")
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to start Google login"

      setError(errorMessage)
      console.error("Google OAuth error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 border border-gray-300 p-3 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
      >
        <img
          src="/google-icon.png"
          alt="Google"
          className="w-5 h-5"
        />
        <span className="font-medium">
          {loading ? "Redirecting..." : `${label} with Google`}
        </span>
      </button>

      {error && (
        <p className="text-red-500 text-sm mt-2 text-center">
          {error}
        </p>
      )}
    </div>
  )
}