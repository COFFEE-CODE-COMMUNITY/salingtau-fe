import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { FormatRelativeTime } from '../../../globals/components/FormatRelativeTime'
import { ThreadDto } from '../types/types.ts'

type Props = {
  thread: ThreadDto
  to?: (id: string) => string
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

export default function ThreadList({ thread, to }: Props) {
  console.log(thread.user)
  const link = to ? to(thread.id) : `/forum/thread/${thread.id}`
  const cat = categoryStyle(thread.category)
  const avatarUrl = thread.user?.profilePicture?.url || fallbackAvatar

  return (
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
            <div>
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

            <div className="flex items-center space-x-4 text-sm text-gray-500 text-right">
              <div className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-1.5" />
                <span>{thread.repliesCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}