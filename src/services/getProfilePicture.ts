// src/hooks/useProfilePicture.ts
import { useState, useEffect } from "react"
import api from "@/services/api"

export function useProfilePicture(userId?: string) {
  const [url, setUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    const currentUrl: string | null = null

    const fetchPicture = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await api.get(
          `/files/users/${userId}/profile-picture-original.png`,
          {
            responseType: "blob",
            withCredentials: true,
          }
        )

        setUrl(res.data)
      } catch (err) {
        console.error("❌ Failed to load profile picture:", err)
        setError("Gagal memuat foto profil")
      } finally {
        setLoading(false)
      }
    }

    fetchPicture()

    return () => {
      if (currentUrl) URL.revokeObjectURL(currentUrl)
    }
  }, [userId])

  return { url, loading, error }
}
