import api, {setAccessToken} from "./api"

export interface IRegister {
  firstName: string
  lastName: string
  email: string
  password: string
}

const handleError = (error: any) => {
  const message =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    "Terjadi kesalahan pada server"

  throw { message, status: error?.response?.status || 500 }
}

const AuthService = {
  login: async (data: { email: string; password: string }) => {
    try {
      const res = await api.post(
        "/auth/login",
        data,
        {
          withCredentials: true,
          skipAuth: true,
          headers: { "Content-Type": "application/json" },
        })
      console.log(res.data)
      return res.data
    } catch (error) {
      handleError(error)
    }
  },

  register: async (data: IRegister) => {
    try {
      const res = await api.post(
        "/auth/register",
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

  refreshToken: async () => {
    try {
      const res = await api.get("/auth/refresh-token", { withCredentials: true })
      return res.data
    } catch (error) {
      handleError(error)
    }
  },

  checkAuth: async () => {
    try {
      const res = await api.get("/users/me", { withCredentials: true })
      return res.status === 200
    } catch (error: any) {
      if (error?.response?.status === 401) {
        try {
          const refresh = await api.get("/auth/refresh-token", {
            withCredentials: true,
            skipAuth: true,
          })

          const newAccessToken = refresh.data?.accessToken
          if (newAccessToken) {
            setAccessToken(newAccessToken)

            const retry = await api.get("/users/me", { withCredentials: true })
            return retry.status === 200
          }
        } catch (refreshError) {
          console.warn("Refresh token invalid atau expired")
          return false
        }
      }

      console.error("Auth check gagal:", error)
      return false
    }
  },


  forgotPassword: async (data: { email: string }) => {
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

  forgotPasswordChange: async (data: { token: string; password: string; confirmPassword: string; logoutAll: boolean }) => {
    try {
      const res = await api.post(
        `/auth/password-reset/change?token=${data.token}`,
        {
          password: data.password,
          confirmPassword: data.confirmPassword,
          logoutAll: data.logoutAll,
        },
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


  oauth2Google: async () => {
    try {
      const res = await api.get("/auth/google?platform=WEB")
      return res.data
    } catch (error) {
      handleError(error)
    }
  },

  logout: async () => {
    try {
      const res = await api.post("/auth/logout", {}, { withCredentials: true })
      return res.data
    } catch (error) {
      handleError(error)
    }
  },
}

export default AuthService
