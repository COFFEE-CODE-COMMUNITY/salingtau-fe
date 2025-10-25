import { useState, useEffect, useCallback } from 'react'
import ForumService from '../../../services/ForumService.ts'
import { ThreadDto, ThreadPaginationMeta, SortOption } from '../types/types.ts'

interface UseThreadsOptions {
  page?: number
  limit?: number
  sort?: SortOption
  category?: string
  autoFetch?: boolean
}

export const useThreads = (options: UseThreadsOptions = {}) => {
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
  const [limit, setLimit] = useState(initialLimit)
  const [sort, setSort] = useState<SortOption>(initialSort)
  const [category, setCategory] = useState<string | undefined>(initialCategory)
  const [searchKey, setSearchKey] = useState<string>('')

  const fetchThreads = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      let result
      if (searchKey && searchKey.trim() !== '') {
        result = await ForumService.searchThreads(searchKey, page, limit, sort, category)
      } else {
        result = await ForumService.getAllThread(page, limit, sort, category)
      }

      setThreads(result.data)
      setMeta(result.meta)
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Failed to fetch threads'
      setError(errorMessage)
      console.error('Error fetching threads:', err)
    } finally {
      setLoading(false)
    }
  }, [page, limit, sort, category, searchKey])

  useEffect(() => {
    if (autoFetch) {
      fetchThreads()
    }
  }, [autoFetch, fetchThreads])

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handleSortChange = (newSort: SortOption) => {
    setSort(newSort)
    setPage(1) // Reset to first page
  }

  const handleCategoryChange = (newCategory: string | undefined) => {
    setCategory(newCategory)
    setPage(1)
  }

  const handleSearch = (query: string) => {
    setSearchKey(query)
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
    fetchThreads()
  }

  return {
    threads,
    meta,
    loading,
    error,
    page,
    limit,
    sort,
    category,
    searchKey,
    setPage: handlePageChange,
    setSort: handleSortChange,
    setCategory: handleCategoryChange,
    setSearch: handleSearch,
    nextPage,
    prevPage,
    refresh,
  }
}