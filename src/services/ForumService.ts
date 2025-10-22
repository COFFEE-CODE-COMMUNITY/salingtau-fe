import api from "./api.ts";

export interface CreateThread {
  title: string
  category: string
  content: string
  isDraft?: boolean
}

export interface CreateReply {
  content: string
}

const ForumService = {
  createThread: async (data: CreateThread) => {
    const res = await api.post(
      "",
      data,
      {
        withCredentials: true,
      },
    )

    return res.data
  }
}

export default ForumService;