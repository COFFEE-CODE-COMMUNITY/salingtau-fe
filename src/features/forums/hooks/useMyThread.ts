import { useState, useEffect, useCallback } from 'react'
import ForumService from '../../../services/ForumService'
import { ThreadDto, ThreadPaginationMeta, SortOption } from '../types/types'

interface UseMyThreadsOptions {
  page?: number
  limit?: number
  sort?: SortOption
  category?: string
  autoFetch?: boolean
}

export const useMyThreads = (options: UseMyThreadsOptions = {}) => {
  const {
    page: initialPage = 1,
    limit: initialLimit = 10,
    sort: initialSort = 'latest',
    category: initialCategory,
    autoFetch = true,
  } = options

  const [threads, setThreads] = useState<ThreadDto[]>([])
  const [meta, setMeta] = useState<ThreadPaginationMeta | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [page, setPage] = useState(initialPage)
  const [limit] = useState(initialLimit)
  const [sort, setSort] = useState<SortOption>(initialSort)
  const [category, setCategory] = useState<string | undefined>(initialCategory)

  const fetchMyThreads = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const result = await ForumService.getAllThreadByUserId(page, limit, sort, category)

      setThreads(result.data)
      setMeta(result.meta)
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Failed to fetch your threads'
      setError(errorMessage)
      console.error('Error fetching my threads:', err)
    } finally {
      setLoading(false)
    }
  }, [page, limit, sort, category])

  useEffect(() => {
    if (autoFetch) {
      fetchMyThreads()
    }
  }, [autoFetch, fetchMyThreads])

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handleSortChange = (newSort: SortOption) => {
    setSort(newSort)
    setPage(1)
  }

  const handleCategoryChange = (newCategory: string | undefined) => {
    setCategory(newCategory)
    setPage(1)
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
    fetchMyThreads()
  }

  return {
    threads,
    meta,
    loading,
    error,
    page,
    sort,
    category,
    setPage: handlePageChange,
    setSort: handleSortChange,
    setCategory: handleCategoryChange,
    nextPage,
    prevPage,
    refresh,
  }
}