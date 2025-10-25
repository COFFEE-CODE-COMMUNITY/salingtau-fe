import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ThreadPaginationMeta } from '../types/types'

type Props = {
  meta: ThreadPaginationMeta
  onPageChange: (page: number) => void
}

export function Pagination({ meta, onPageChange }: Props) {
  const { page, totalPages, hasPreviousPage, hasNextPage } = meta

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={!hasPreviousPage}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={!hasNextPage}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing page <span className="font-medium">{page}</span> of{' '}
            <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={!hasPreviousPage}
            className="relative inline-flex items-center px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={!hasNextPage}
            className="relative inline-flex items-center px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}