import { useState } from 'react'
import ForumService, { CreateReply } from '../../../services/ForumService'

export const useCreateReply = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const createReply = async (threadId: string, data: CreateReply) => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)

      const result = await ForumService.createReply(threadId, data)

      setSuccess(true)
      return result
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Failed to create reply'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setLoading(false)
    setError(null)
    setSuccess(false)
  }

  return {
    createReply,
    loading,
    error,
    success,
    reset,
  }
}