import { FormatRelativeTime } from '../../../globals/components/FormatRelativeTime'
import { ReplyDto } from '../types/types'

type Props = {
  reply: ReplyDto
  className?: string
  onReplyClick?: (reply: ReplyDto) => void
  showReplyButton?: boolean
}

const fallbackAvatar =
  'https://images.unsplash.com/photo-1528763380143-65b3ac89a3ff?q=80&auto=format&fit=crop&w=200&h=200'

export default function ReplyCard({ reply, className, onReplyClick, showReplyButton }: Props) {
  return (
    <div className={`flex items-start space-x-4 ${className ?? ''}`}>
      <img
        className="h-10 w-10 rounded-full object-cover mt-1"
        src={reply.user?.profilePicture.url || fallbackAvatar}
        alt={reply.user?.firstname || 'User'}
        loading="lazy"
      />

      <div className="flex-1 bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-gray-800">{reply.user?.firstname || 'Anonymous'}</p>
          <p className="text-xs text-gray-500">{FormatRelativeTime(reply.createdAt)}</p>
        </div>

        <p className="mt-2 text-gray-700 whitespace-pre-wrap leading-relaxed">{reply.content}</p>

        {showReplyButton && (
          <div className="mt-3">
            <button
              type="button"
              onClick={() => onReplyClick?.(reply)}
              className="text-xs font-medium text-blue-600 hover:text-blue-700"
            >
              Reply
            </button>
          </div>
        )}
      </div>
    </div>
  )
}