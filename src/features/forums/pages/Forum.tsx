import { Link } from 'react-router-dom'
import {Plus, Search, User} from 'lucide-react'
import { useState, useCallback } from 'react'
import ThreadList from '../components/ThreadList'
import { ThreadSkeleton } from '../components/ThreadSkeleton'
import { EmptyState } from '../components/EmptyState'
import { Pagination } from '../components/Pagination'
import { useThreads } from '../hooks/useThread'
import { SortOption } from '../types/types'

export default function Forum() {
  const [searchInput, setSearchInput] = useState('')
  const { threads, meta, loading, error, setSort, setSearch, setPage } = useThreads({
    page: 1,
    limit: 10,
    sort: 'latest',
  })

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      setSearch(searchInput)
    },
    [searchInput, setSearch]
  )

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value as SortOption)
  }

  return (
    <>
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-10">
        <div className="h-16 flex items-center justify-between px-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Community Forum</h2>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative w-full sm:w-64 mx-auto mr-4">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search Topic..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </form>

          <div className="flex items-center space-x-4">
            <Link
              to="/forum/myThread"
              className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <User className="w-4 h-4 mr-2" />
              My Post
            </Link>
            <Link
              to="/forum/create"
              className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Post
            </Link>
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">Sort by:</span>
            <select
              onChange={handleSortChange}
              className="text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition p-2"
            >
              <option value="latest">Latest</option>
              <option value="popular">Popular</option>
            </select>
          </div>

          {/* Result count */}
          {meta && !loading && (
            <div className="text-sm text-gray-600">
              Showing {threads.length} of {meta.total} threads
            </div>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Thread List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 5 }).map((_, i) => <ThreadSkeleton key={i} />)
            ) : threads.length === 0 ? (
              // Empty state
              <EmptyState
                message={searchInput ? 'No threads found' : 'No threads yet'}
                description={
                  searchInput
                    ? 'Try searching with different keywords'
                    : 'Be the first to create a thread!'
                }
              />
            ) : (
              // Thread items
              threads.map((thread) => <ThreadList key={thread.id} thread={thread} />)
            )}
          </ul>

          {/* Pagination */}
          {meta && threads.length > 0 && <Pagination meta={meta} onPageChange={setPage} />}
        </div>
      </div>
    </>
  )
}