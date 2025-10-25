import { Link, useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import MyThreadList from '../components/MyThreadList'
import { ThreadSkeleton } from '../components/ThreadSkeleton'
import { EmptyState } from '../components/EmptyState'
import { Pagination } from '../components/Pagination'
import { useMyThreads } from '../hooks/useMyThread'
import { useDeleteThread } from '../hooks/useDeleteThread'
import { SortOption } from '../types/types'
import { useState, useEffect } from 'react'

export default function MyForum() {
  const navigate = useNavigate()
  const { threads, meta, loading, error, setSort, setPage, refresh } = useMyThreads({
    page: 1,
    limit: 10,
    sort: 'latest',
  })

  const { deleteThread, loading: deleteLoading, error: deleteError } = useDeleteThread()

  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value as SortOption)
  }

  const handleEdit = (threadId: string) => {
    navigate(`/forum/edit/${threadId}`)
  }

  const handleDelete = async (threadId: string) => {
    const success = await deleteThread(threadId)
    if (success) {
      setSuccessMessage('Thread deleted successfully')
      refresh() // Refresh the list after deletion

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    }
  }

  // Clear delete error after 5 seconds
  useEffect(() => {
    if (deleteError) {
      const timer = setTimeout(() => {
        // You might want to add a reset function to useDeleteThread
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [deleteError])

  return (
    <>
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-10">
        <div className="h-16 flex items-center justify-between px-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">My Threads</h2>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/forum"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Back to Forum
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
        {/* Sort Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">Sort by:</span>
            <select
              onChange={handleSortChange}
              disabled={loading || deleteLoading}
              className="text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition p-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="latest">Latest</option>
              <option value="popular">Popular</option>
            </select>
          </div>

          {meta && !loading && (
            <div className="text-sm text-gray-600">
              {threads.length} of {meta.total} threads
            </div>
          )}
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
            {successMessage}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Delete Error */}
        {deleteError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {deleteError}
          </div>
        )}

        {/* Thread List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => <ThreadSkeleton key={i} />)
            ) : threads.length === 0 ? (
              <EmptyState
                message="You haven't created any threads yet"
                description="Start a discussion by creating your first thread!"
              />
            ) : (
              threads.map((thread) => (
                <MyThreadList
                  key={thread.id}
                  thread={thread}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            )}
          </ul>

          {meta && threads.length > 0 && <Pagination meta={meta} onPageChange={setPage} />}
        </div>

        {/* Loading Overlay when deleting */}
        {deleteLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="text-gray-700">Deleting thread...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}