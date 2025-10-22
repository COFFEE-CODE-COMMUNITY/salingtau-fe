import api from "./api.ts";

const handleError = (error: any) => {
  const message =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    "Terjadi kesalahan pada server"

  throw { message, status: error?.response?.status || 500 }
}

const ProfileService = {
  forgotPasswordProfile: async (data: { email: string }) => {
    try {
      const res = await api.post(
        "/auth/password-reset",
        data,
        {
          withCredentials: true,
          skipAuth: true,
          headers: { "Content-Type": "application/json" },
        })
      return res.data
    } catch (error) {
      handleError(error)
    }
  },
}

export default ProfileService;