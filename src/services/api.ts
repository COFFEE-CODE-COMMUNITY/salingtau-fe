import axios, { AxiosError, InternalAxiosRequestConfig } from "axios"

declare module "axios" {
  export interface AxiosRequestConfig {
    skipAuth?: boolean
  }
  export interface InternalAxiosRequestConfig {
    skipAuth?: boolean
  }
}

const api = axios.create({
  baseURL: "http://localhost:8081/api/v1",
  withCredentials: true,
})

// 🧠 Simpan access token di memori (runtime variable)
let accessToken: string | null = null

export const setAccessToken = (t: string) => {
  accessToken = t
}

export const getAccessToken = () => accessToken

export const clearSession = () => {
  accessToken = null
  window.location.href = "/login"
}

// ==== Token Refresh Handling ====
let isRefreshing = false
let refreshSubscribers: ((token: string) => void)[] = []

function onTokenRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token))
  refreshSubscribers = []
}

function addRefreshSubscriber(cb: (token: string) => void) {
  refreshSubscribers.push(cb)
}

// ==== Request Interceptor ====
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Jika skipAuth tidak diset atau false → tambahkan Authorization
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
  (error) => Promise.reject(error),
)

// ==== Response Interceptor ====
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    if (original?.skipAuth) {
      return Promise.reject(error)
    }

    // === Refresh token jika access token expired ===
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true

      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber((token) => {
            if (original.headers) original.headers.Authorization = `Bearer ${token}`
            resolve(api(original))
          })
        })
      }

      isRefreshing = true
      try {
        const refreshResponse = await api.get("/auth/refresh-token", { withCredentials: true, skipAuth: true })
        const newToken = (refreshResponse as any).data?.accessToken
        if (!newToken) throw new Error("Access token tidak ditemukan dalam response")

        setAccessToken(newToken)
        onTokenRefreshed(newToken)

        if (original.headers) original.headers.Authorization = `Bearer ${newToken}`
        return api(original)
      } catch (refreshError) {
        console.error("Refresh token gagal:", refreshError)
        clearSession()
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    if (error.response?.status === 500) {
      console.error("Server Error:", error.response.data)
    }

    return Promise.reject(error)
  },
)

export default api
