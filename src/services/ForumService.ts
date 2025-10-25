import api from './api.ts'
import { GetAllThreadResponse } from '../features/forums/types/types.ts'

export interface CreateThread {
  title: string
  category: string
  content: string
  isDraft?: boolean
}

export interface UpdateThread {
  title: string
  category: string
  content: string
}

export interface CreateReply {
  content: string
  parentReplyId?: string | null
}

const ForumService = {
  // ============ THREADS ============
  createThread: async (data: CreateThread) => {
    const res = await api.post('/forums/threads/', data, {
      withCredentials: true,
    })
    return res.data
  },

  updateThread: async (threadId: string, data: UpdateThread) => {
    const res = await api.patch(`/forums/threads/${threadId}`, data, {
      withCredentials: true,
    })
    return res.data
  },

  deleteThread: async (threadId: string) => {
    const res = await api.delete(`/forums/threads/${threadId}`, {
      withCredentials: true,
    })
    return res.data
  },

  getAllThread: async (
    page: number = 1,
    limit: number = 10,
    sort?: string,
    category?: string
  ): Promise<GetAllThreadResponse> => {
    const res = await api.get('/forums/threads/', {
      params: {
        page,
        limit,
        sort,
        category,
      },
      withCredentials: true,
    })
    return res.data
  },

  getThreadById: async (threadId: string) => {
    const res = await api.get(`/forums/threads/${threadId}`, {
      withCredentials: true,
    })
    return res.data
  },

  getAllThreadByUserId: async (
    page: number = 1,
    limit: number = 10,
    sort?: string,
    category?: string
  ): Promise<GetAllThreadResponse> => {
    const res = await api.get('/forums/threads/me', {
      params: {
        page,
        limit,
        sort,
        category,
      },
      withCredentials: true,
    })
    return res.data
  },

  searchThreads: async (
    searchKey: string,
    page: number = 1,
    limit: number = 10,
    sort?: string,
    category?: string
  ): Promise<GetAllThreadResponse> => {
    const res = await api.get('/forums/threads/search', {
      params: {
        q: searchKey,
        page,
        limit,
        sort,
        category,
      },
      withCredentials: true,
    })
    return res.data
  },

  // ============ REPLIES ============
  createReply: async (threadId: string, data: CreateReply) => {
    const res = await api.post(`/forums/threads/${threadId}/replies`, data, {
      withCredentials: true,
    })
    return res.data
  },

  updateReply: async (replyId: string, content: string) => {
    const res = await api.patch(
      `/forums/replies/${replyId}`,
      { content },
      {
        withCredentials: true,
      }
    )
    return res.data
  },

  deleteReply: async (replyId: string) => {
    const res = await api.delete(`/forums/replies/${replyId}`, {
      withCredentials: true,
    })
    return res.data
  },

  getRepliesByThread: async (
    threadId: string,
    page: number = 1,
    limit: number = 10,
    sort?: string
  ) => {
    const res = await api.get(`/forums/replies/${threadId}`, {
      params: {
        page,
        limit,
        sort,
      },
      withCredentials: true,
    })
    return res.data
  },

  getChildrenReplies: async (
    parentReplyId: string,
    page: number = 1,
    limit: number = 10,
    sort?: string
  ) => {
    const res = await api.get(`/forums/replies/children/${parentReplyId}`, {
      params: {
        page,
        limit,
        sort,
      },
      withCredentials: true,
    })
    return res.data
  },
}

export default ForumService
