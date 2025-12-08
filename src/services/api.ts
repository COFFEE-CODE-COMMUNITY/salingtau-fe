import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios"

declare module "axios" {
  export interface AxiosRequestConfig {
    skipAuth?: boolean
  }
  export interface InternalAxiosRequestConfig {
    skipAuth?: boolean
    _retry?: boolean
  }
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  validateStatus: () => true,
  timeout: 10000, // 10s timeout
})

let accessToken: string | null = null
let isRefreshing = false
let refreshSubscribers: Array<(token: string) => void> = []

export const setAccessToken = (token: string) => {
  accessToken = token
  console.log("✅ Access token set")
}

export const getAccessToken = (): string | null => accessToken

export const clearSession = () => {
  accessToken = null
  refreshSubscribers = []
  isRefreshing = false
  console.log("🧹 Session cleared")
}

const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach(callback => callback(token))
  refreshSubscribers = []
}

const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback)
}

const hasRefreshTokenCookie = (): boolean => {
  return document.cookie.split(';').some(cookie => {
    const trimmed = cookie.trim()
    return trimmed.startsWith('refresh_token=') || trimmed.startsWith('refreshToken=')
  })
}

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (!config.skipAuth) {
      const token = getAccessToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json"
    }

    return config
  },
  (error) => {
    console.error("❌ Request interceptor error:", error)
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig

    if (
      !originalRequest ||
      originalRequest.skipAuth ||
      originalRequest._retry ||
      originalRequest.url?.includes("/auth/refresh-token")
    ) {
      return Promise.reject(error)
    }

    if (error.response?.status === 401) {
      // ✅ Cek apakah ada refresh token cookie sebelum coba refresh
      if (!hasRefreshTokenCookie()) {
        console.warn("🚫 No refresh token cookie found")
        clearSession()

        // ✅ HANYA redirect jika bukan di halaman login
        if (window.location.pathname !== "/login") {
          window.location.href = "/login"
        }
        return Promise.reject(error)
      }

      // ✅ Queue management untuk concurrent requests
      if (isRefreshing) {
        console.log("⏳ Queueing request while refreshing...")
        return new Promise((resolve) => {
          addRefreshSubscriber((newToken: string) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`
            resolve(api(originalRequest))
          })
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        console.log("🔄 Refreshing access token...")

        const refreshResponse = await api.get("/auth/refresh-token", {
          withCredentials: true,
          skipAuth: true,
        })

        const newToken = refreshResponse.data?.accessToken

        if (!newToken) {
          throw new Error("No access token in refresh response")
        }

        setAccessToken(newToken)
        onTokenRefreshed(newToken)

        originalRequest.headers.Authorization = `Bearer ${newToken}`

        console.log("✅ Token refreshed, retrying original request")
        return api(originalRequest)

      } catch (refreshError) {
        console.error("❌ Token refresh failed:", refreshError)

        // ✅ Clear session dan redirect
        clearSession()

        if (window.location.pathname !== "/login") {
          window.location.href = "/login"
        }

        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default api