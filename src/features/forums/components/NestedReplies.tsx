import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import ReplyCard from './ReplyCard'
import { ReplyDto } from '../types/types'

type Props = {
  parentReply: ReplyDto
  nestedReplies: ReplyDto[]
  loading: boolean
  onLoadNested: (parentReplyId: string) => void
  onReplyClick?: (reply: ReplyDto) => void
}

export function NestedReplies({
  parentReply,
  nestedReplies,
  loading,
  onLoadNested,
  onReplyClick,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false)
  const childCount = parentReply.childCount || 0

  if (childCount === 0) return null

  const handleToggle = () => {
    if (!isExpanded && nestedReplies.length === 0) {
      onLoadNested(parentReply.id)
    }
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="ml-14 mt-3">
      <button
        onClick={handleToggle}
        className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 mb-2"
      >
        {isExpanded ? (
          <>
            <ChevronUp className="w-4 h-4 mr-1" />
            Hide {childCount} {childCount === 1 ? 'reply' : 'replies'}
          </>
        ) : (
          <>
            <ChevronDown className="w-4 h-4 mr-1" />
            Show {childCount} {childCount === 1 ? 'reply' : 'replies'}
          </>
        )}
      </button>

      {isExpanded && (
        <div className="space-y-3">
          {loading ? (
            <div className="text-sm text-gray-500">Loading replies...</div>
          ) : (
            nestedReplies.map((nested) => (
              <ReplyCard
                key={nested.id}
                reply={nested}
                onReplyClick={onReplyClick}
                showReplyButton={true}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}