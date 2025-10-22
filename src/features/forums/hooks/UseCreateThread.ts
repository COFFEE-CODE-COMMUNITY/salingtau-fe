import { useState } from "react"
import ForumService, { CreateThread } from "../../../services/ForumService"

export default function useCreateThread() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const createPost = async (form: CreateThread) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const data = await ForumService.createThread(form)
      setSuccess(true)
      return data
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Gagal membuat thread baru. Coba lagi nanti."
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }

  return { createPost, loading, error, success }
}
