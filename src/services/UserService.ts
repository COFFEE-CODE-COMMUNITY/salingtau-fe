import api from "./api.ts";

export interface UserProfile {
  firstName: string
  lastName: string
  email: string
  headline: string
  biography: string
  language: string
  profilePictureUrl: string
  websiteUrl?: string
  facebookUrl?: string
  instagramUrl?: string
  linkedinUrl?: string
  tiktokUrl?: string
  xUrl?: string
  youtubeUrl?: string
}

const handleError = (error: any) => {
  const message =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    "Terjadi kesalahan pada server"

  throw { message, status: error?.response?.status || 500 }
}

const UserService = {
  forgotPasswordProfile: async (data: { email: string }) => {
    try {
      const res = await api.post(
        "/auth/password-reset",
        data,
        {
          withCredentials: true,
          skipAuth: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      return res.data
    } catch (error) {
      handleError(error)
    }
  },
  getMe: async () => {
    try {
      const res = await api.get(
        "/users/me",
        {
          withCredentials: true,
          skipAuth: false,
          headers: { "Content-Type": "application/json" },
        }
      )
      return res.data
    } catch (error) {
      handleError(error)
    }
  },
  updateProfilePicture: async (data : {}) => {
    try {
      const res = await api.post(
        "/users/profile-picture",
        data,
        {
          withCredentials: true,
          skipAuth: false,
          headers: { "Content-Type": "application/json" },
        }
      )

      return res.data
    } catch (error) {
      handleError(error)
    }
  },
  updateMe: async (data: UserProfile) => {
    try {
      const res = await api.patch(
        "/users/me",
        data,
        {
          withCredentials: true,
          skipAuth: false,
          headers: { "Content-Type": "application/json" },
        }
      )

      return res.data
    } catch (error) {
      handleError(error)
    }
  }
}

export default UserService;