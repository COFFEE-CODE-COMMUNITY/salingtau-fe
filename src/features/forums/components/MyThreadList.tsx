import { Link } from 'react-router-dom'
import { MessageCircle, Edit2, Trash2 } from 'lucide-react'
import { FormatRelativeTime } from '../../../globals/components/FormatRelativeTime'
import { ThreadDto } from '../types/types'
import { useState } from 'react'

type Props = {
  thread: ThreadDto
  to?: (id: string) => string
  onDelete?: (threadId: string) => void
  onEdit?: (threadId: string) => void
}

const fallbackAvatar =
  'https://images.unsplash.com/photo-1528763380143-65b3ac89a3ff?q=80&auto=format&fit=crop&w=200&h=200'

const categoryStyle = (cat: string) => {
  const map: Record<string, { text: string; bg: string }> = {
    'Web Development': { text: 'text-blue-600', bg: 'bg-blue-100' },
    'AI & ML': { text: 'text-red-600', bg: 'bg-red-100' },
    Design: { text: 'text-yellow-600', bg: 'bg-yellow-100' },
    tech: { text: 'text-blue-600', bg: 'bg-blue-100' },
    general: { text: 'text-gray-600', bg: 'bg-gray-100' },
  }
  return map[cat] ?? { text: 'text-gray-700', bg: 'bg-gray-100' }
}

export default function MyThreadList({ thread, to, onDelete, onEdit }: Props) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  console.log(thread.user)

  const link = to ? to(thread.id) : `/forum/thread/${thread.id}`
  const cat = categoryStyle(thread.category)
  const avatarUrl = thread.user?.profilePicture?.url || fallbackAvatar

  const handleDelete = () => {
    if (onDelete) {
      onDelete(thread.id)
      setShowDeleteConfirm(false)
    }
  }

  const handleEdit = () => {
    if (onEdit) {
      onEdit(thread.id)
    }
  }

  return (
    <>
      <li className="p-5 hover:bg-gray-50 transition-colors">
        <div className="flex items-start space-x-4">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={avatarUrl}
            alt={thread.user.firstname}
            loading="lazy"
          />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <Link
                  to={link}
                  className="text-lg font-semibold text-gray-900 hover:text-blue-600"
                >
                  {thread.title}
                </Link>

                <div className="flex items-center space-x-2 mt-1">
                  <span
                    className={`text-xs font-semibold ${cat.text} ${cat.bg} px-2 py-1 rounded-full`}
                  >
                    {thread.category}
                  </span>
                  <p className="text-sm text-gray-500">
                    by {thread.user.firstname} • {FormatRelativeTime(thread.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-500">
                {/* Replies count */}
                <div className="flex items-center mr-2">
                  <MessageCircle className="w-4 h-4 mr-1.5" />
                  <span>{thread.repliesCount}</span>
                </div>

                {/* Edit button */}
                <button
                  onClick={handleEdit}
                  className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
                  title="Edit thread"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                {/* Delete button */}
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                  title="Delete thread"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </li>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Thread</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{thread.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}