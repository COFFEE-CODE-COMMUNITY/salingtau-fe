import { useState } from 'react'
import ForumService from '../../../services/ForumService'

export const useDeleteThread = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const deleteThread = async (threadId: string) => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)

      await ForumService.deleteThread(threadId)

      setSuccess(true)
      return true
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Failed to delete thread'
      setError(errorMessage)
      console.error('Error deleting thread:', err)
      return false
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
    deleteThread,
    loading,
    error,
    success,
    reset,
  }
}