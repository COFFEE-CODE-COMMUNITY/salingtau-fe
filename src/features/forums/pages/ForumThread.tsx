import { Link, useParams } from 'react-router-dom'
import { ChevronLeft, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useThreadDetail } from '../hooks/useThreadDetail'
import { useReplies } from '../hooks/useReplies'
import { useNestedReplies } from '../hooks/useNestedReplies'
import { useCreateReply } from '../hooks/useCreateReply'
import ReplyCard from '../components/ReplyCard'
import { NestedReplies } from '../components/NestedReplies'
import { Pagination } from '../components/Pagination'
import { FormatRelativeTime } from '../../../globals/components/FormatRelativeTime'
import { ReplyDto } from '../types/types'
import { fallbackAvatar } from '../../../globals/components/fallbackAvatar'

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

export default function ForumThread() {
  const { threadId } = useParams<{ threadId: string }>()
  const { thread, loading: threadLoading, error: threadError } = useThreadDetail(threadId)
  const {
    replies,
    meta,
    loading: repliesLoading,
    error: repliesError,
    setPage,
    refresh: refreshReplies,
  } = useReplies({ threadId, page: 1, limit: 10 })

  console.log("thread:", thread)

  const { nestedReplies, nestedMeta, loadingNested, fetchNestedReplies } = useNestedReplies()
  const { createReply, loading: createLoading, error: createError } = useCreateReply()

  const [replyContent, setReplyContent] = useState('')
  const [replyingTo, setReplyingTo] = useState<ReplyDto | null>(null)

  const handleCreateReply = async () => {
    if (!threadId || !replyContent.trim()) return

    try {
      await createReply(threadId, {
        content: replyContent,
        parentReplyId: replyingTo?.id || null,
      })

      setReplyContent('')
      setReplyingTo(null)
      refreshReplies()
    } catch (err) {
      console.error('Failed to create reply:', err)
    }
  }

  const handleReplyClick = (reply: ReplyDto) => {
    setReplyingTo(reply)
    // Scroll to reply form
    document.getElementById('reply-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleLoadNested = (parentReplyId: string) => {
    fetchNestedReplies(parentReplyId, 1, 5)
  }

  if (threadLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (threadError || !thread) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-gray-900 font-medium mb-2">Failed to load thread</p>
          <p className="text-gray-500 text-sm">{threadError || 'Thread not found'}</p>
          <Link to="/forum" className="text-blue-600 hover:underline mt-4 inline-block">
            Back to forum
          </Link>
        </div>
      </div>
    )
  }

  const cat = categoryStyle(thread.category)

  return (
    <>
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-10">
        <div className="h-16 flex items-center px-6">
          <Link
            to="/forum"
            className="flex items-center text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Forum
          </Link>
        </div>
      </header>

      <div className="p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Thread Content */}
            <div>
              <span className={`text-sm font-semibold ${cat.text} ${cat.bg} px-2 py-1 rounded-full`}>
                {thread.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mt-3">{thread.title}</h1>
              <div className="flex items-center space-x-3 mt-4 text-sm text-gray-500">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={thread.user?.profilePicture?.url || fallbackAvatar}
                  alt={thread.user?.firstname}
                />
                <span>
                  Posted by <span className="font-semibold text-gray-800">{thread?.user?.firstname || "anonymous"}</span>
                </span>
                <span>•</span>
                <span>{FormatRelativeTime(thread.createdAt)}</span>
              </div>
              <div className="mt-6 text-gray-700 leading-relaxed whitespace-pre-wrap">
                {thread.content}
              </div>
            </div>

            {/* Replies Section */}
            <div className="pt-6 border-t border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {meta?.total || 0} {meta?.total === 1 ? 'Reply' : 'Replies'}
              </h2>

              {repliesError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                  {repliesError}
                </div>
              )}

              {repliesLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="animate-pulse flex space-x-4">
                      <div className="rounded-full bg-gray-300 h-10 w-10" />
                      <div className="flex-1 space-y-2 py-1">
                        <div className="h-4 bg-gray-300 rounded w-3/4" />
                        <div className="h-4 bg-gray-300 rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : replies.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No replies yet. Be the first to reply!
                </p>
              ) : (
                <div className="space-y-4">
                  {replies.map((reply) => (
                    <div key={reply.id}>
                      <ReplyCard
                        reply={reply}
                        onReplyClick={handleReplyClick}
                        showReplyButton={true}
                      />
                      
                      {/* Nested Replies */}
                      <NestedReplies
                        parentReply={reply}
                        nestedReplies={nestedReplies[reply.id] || []}
                        loading={loadingNested[reply.id] || false}
                        onLoadNested={handleLoadNested}
                        onReplyClick={handleReplyClick}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {meta && meta.totalPages > 1 && (
                <div className="mt-6">
                  <Pagination meta={meta} onPageChange={setPage} />
                </div>
              )}

              {/* Reply Form */}
              <div id="reply-form" className="pt-6 border-t border-gray-200 mt-6">
                {replyingTo && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-blue-800">
                        Replying to <span className="font-semibold">{replyingTo.user?.firstname}</span>
                      </p>
                      <button
                        onClick={() => setReplyingTo(null)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {createError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-3">
                    {createError}
                  </div>
                )}

                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                  rows={4}
                  placeholder={
                    replyingTo
                      ? `Reply to ${replyingTo.user?.firstname}...`
                      : 'Write your reply...'
                  }
                  disabled={createLoading}
                />
                <button
                  onClick={handleCreateReply}
                  disabled={createLoading || !replyContent.trim()}
                  className="mt-3 bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {createLoading ? 'Posting...' : 'Post Reply'}
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-lg border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-3">Thread Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Category:</span>
                  <span className={`font-semibold ${cat.text}`}>{thread.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Created:</span>
                  <span className="font-semibold text-gray-800">
                    {new Date(thread.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Replies:</span>
                  <span className="font-semibold text-gray-800">{meta?.total || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}