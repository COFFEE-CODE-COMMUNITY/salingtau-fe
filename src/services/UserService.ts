import api from "./api"

export interface UpdateUserDto {
  firstName?: string
  lastName?: string
  headline?: string
  biography?: string
  language?: string
  websiteUrl?: string
  facebookUrl?: string
  instagramUrl?: string
  linkedinUrl?: string
  tiktokUrl?: string
  xUrl?: string
  youtubeUrl?: string
}

export interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  headline?: string
  biography?: string
  language?: string
  profilePictureUrl?: string
  websiteUrl?: string
  facebookUrl?: string
  instagramUrl?: string
  linkedinUrl?: string
  tiktokUrl?: string
  xUrl?: string
  youtubeUrl?: string
  createdAt?: string
  updatedAt?: string
}

const handleError = (error: any) => {
  const message =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    "Terjadi kesalahan pada server"

  throw { message, status: error?.response?.status || 500 }
}

const UserService = {
  getMe: async (): Promise<UserProfile | undefined> => {
    try {
      const res = await api.get("/users/me", {
        withCredentials: true,
        skipAuth: false,
        headers: { "Content-Type": "application/json" },
      })
      return res.data
    } catch (error) {
      handleError(error)
    }
  },

  getUserById: async (userId: string): Promise<UserProfile | undefined> => {
    try {
      const res = await api.get(`/users/${userId}`, {
        withCredentials: true,
        skipAuth: true,
        headers: { "Content-Type": "application/json" },
      })
      return res.data
    } catch (error) {
      handleError(error)
    }
  },

  updateMe: async (data: UpdateUserDto): Promise<UserProfile | undefined> => {
    try {
      const res = await api.patch("/users/me", data, {
        withCredentials: true,
        skipAuth: false,
        headers: { "Content-Type": "application/json" },
      })
      return res.data
    } catch (error) {
      handleError(error)
    }
  },

  updateProfilePicture: async (file: File): Promise<{ message: string } | undefined> => {
    try {
      const formData = new FormData()
      formData.append("file", file)

      const res = await api.put("/users/me/profile-picture", formData, {
        withCredentials: true,
        skipAuth: false,
        headers: { "Content-Type": "multipart/form-data" },
      })
      return res.data
    } catch (error) {
      handleError(error)
    }
  },
}

export default UserService
