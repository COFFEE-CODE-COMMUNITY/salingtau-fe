export type UserLite = {
  id: string
  firstname: string
  profilePicture: ProfilePicture
}

export interface ProfilePicture {
  url: string
  width: number
  height: number
}

export type ReplyDto = {
  id: string
  threadId: string
  parentReplyId: string | null
  content: string
  user: UserLite
  childCount?: number
  createdAt: string           
  updatedAt: string           
}

export type ThreadDto = {
  id: string
  title: string
  content: string
  category: string
  repliesCount: number
  user: UserLite
  createdAt: string
  updatedAt: string
}

export type SortOption = 'latest' | 'popular'

export interface ThreadFilters {
  page?: number
  limit?: number
  category?: string
  sort?: SortOption
  searchKey?: string
}

export interface ThreadPaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface GetAllThreadResponse {
  data: ThreadDto[]
  meta: ThreadPaginationMeta
}

export interface ParentReplyDto {
  id: string
  content: string
  user: UserLite | null
}

export interface ReplyPaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  threadId?: string
  parentReplyId?: string
}

export interface GetAllReplyResponse {
  data: ReplyDto[]
  meta: ReplyPaginationMeta
}

export interface ThreadDetailDto extends ThreadDto {
  // Sama seperti ThreadDto tapi bisa ada field tambahan dari backend
}