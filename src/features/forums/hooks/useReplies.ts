import { useState, useEffect, useCallback } from 'react'
import ForumService from '../../../services/ForumService'
import { ReplyDto, ReplyPaginationMeta } from '../types/types'

interface UseRepliesOptions {
  threadId: string | undefined
  page?: number
  limit?: number
  sort?: string
  autoFetch?: boolean
}

export const useReplies = (options: UseRepliesOptions) => {
  const {
    threadId,
    page: initialPage = 1,
    limit: initialLimit = 10,
    sort: initialSort = 'oldest',
    autoFetch = true,
  } = options

  const [replies, setReplies] = useState<ReplyDto[]>([])
  const [meta, setMeta] = useState<ReplyPaginationMeta | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [page, setPage] = useState(initialPage)
  const [limit] = useState(initialLimit)
  const [sort, setSort] = useState(initialSort)

  const fetchReplies = useCallback(async () => {
    if (!threadId) return

    try {
      setLoading(true)
      setError(null)

      const result = await ForumService.getRepliesByThread(threadId, page, limit, sort)

      setReplies(result.data)
      setMeta(result.meta)
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Failed to fetch replies'
      setError(errorMessage)
      console.error('Error fetching replies:', err)
    } finally {
      setLoading(false)
    }
  }, [threadId, page, limit, sort])

  useEffect(() => {
    if (autoFetch) {
      fetchReplies()
    }
  }, [autoFetch, fetchReplies])

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const nextPage = () => {
    if (meta?.hasNextPage) {
      setPage((prev) => prev + 1)
    }
  }

  const prevPage = () => {
    if (meta?.hasPreviousPage) {
      setPage((prev) => prev - 1)
    }
  }

  const refresh = () => {
    fetchReplies()
  }

  return {
    replies,
    meta,
    loading,
    error,
    page,
    sort,
    setPage: handlePageChange,
    setSort,
    nextPage,
    prevPage,
    refresh,
  }
}