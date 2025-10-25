import React, { useEffect, useState } from "react"
import UserService, { UserProfile } from "../../../services/UserService"

export function useEditProfile() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await UserService.getMe()
        setUser(data)
      } catch (err) {
        setError("Failed to load profile data.")
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  // 🔹 Handler untuk ubah value form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUser(prev => (prev ? { ...prev, [name]: value } : prev))
  }

  // 🔹 Submit perubahan profil
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setSaving(true)
    setMessage(null)

    try {
      const updated = await UserService.updateMe(user)
      setUser(updated)
      setMessage("✅ Profile updated successfully!")
    } catch (err) {
      console.error(err)
      setMessage("❌ Failed to update profile. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  return {
    user,
    loading,
    error,
    saving,
    message,
    handleChange,
    handleSubmit,
  }
}
