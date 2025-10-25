import { useState, useEffect, useCallback } from 'react'
import ForumService from '../../../services/ForumService'
import { ThreadDetailDto } from '../types/types'

export const useThreadDetail = (threadId: string | undefined, autoFetch: boolean = true) => {
  const [thread, setThread] = useState<ThreadDetailDto | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchThread = useCallback(async () => {
    if (!threadId) return

    try {
      setLoading(true)
      setError(null)

      const result = await ForumService.getThreadById(threadId)
      setThread(result)
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Failed to fetch thread'
      setError(errorMessage)
      console.error('Error fetching thread:', err)
    } finally {
      setLoading(false)
    }
  }, [threadId])

  useEffect(() => {
    if (autoFetch) {
      fetchThread()
    }
  }, [autoFetch, fetchThread])

  const refresh = () => {
    fetchThread()
  }

  return {
    thread,
    loading,
    error,
    refresh,
  }
}