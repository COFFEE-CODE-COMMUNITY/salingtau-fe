import { useState, useCallback } from 'react'
import ForumService from '../../../services/ForumService'
import { ReplyDto, ReplyPaginationMeta } from '../types/types'

export const useNestedReplies = () => {
  const [nestedReplies, setNestedReplies] = useState<Record<string, ReplyDto[]>>({})
  const [nestedMeta, setNestedMeta] = useState<Record<string, ReplyPaginationMeta>>({})
  const [loadingNested, setLoadingNested] = useState<Record<string, boolean>>({})
  const [errorNested, setErrorNested] = useState<Record<string, string>>({})

  const fetchNestedReplies = useCallback(
    async (parentReplyId: string, page: number = 1, limit: number = 5) => {
      try {
        setLoadingNested((prev) => ({ ...prev, [parentReplyId]: true }))
        setErrorNested((prev) => ({ ...prev, [parentReplyId]: '' }))

        const result = await ForumService.getChildrenReplies(parentReplyId, page, limit, 'oldest')

        setNestedReplies((prev) => ({
          ...prev,
          [parentReplyId]: result.data,
        }))
        setNestedMeta((prev) => ({
          ...prev,
          [parentReplyId]: result.meta,
        }))
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || err.message || 'Failed to fetch nested replies'
        setErrorNested((prev) => ({ ...prev, [parentReplyId]: errorMessage }))
        console.error('Error fetching nested replies:', err)
      } finally {
        setLoadingNested((prev) => ({ ...prev, [parentReplyId]: false }))
      }
    },
    []
  )

  const clearNestedReplies = (parentReplyId: string) => {
    setNestedReplies((prev) => {
      const updated = { ...prev }
      delete updated[parentReplyId]
      return updated
    })
    setNestedMeta((prev) => {
      const updated = { ...prev }
      delete updated[parentReplyId]
      return updated
    })
  }

  return {
    nestedReplies,
    nestedMeta,
    loadingNested,
    errorNested,
    fetchNestedReplies,
    clearNestedReplies,
  }
}