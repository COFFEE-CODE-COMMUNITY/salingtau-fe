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

const getAccessToken = () => localStorage.getItem("accessToken")
const setAccessToken = (t: string) => localStorage.setItem("accessToken", t)
const clearSession = () => {
  localStorage.removeItem("accessToken")
  window.location.href = "/login"
}

const PUBLIC_ENDPOINTS = [
  "/auth/login",
  "/auth/register",
  "/auth/password-reset",
  "/auth/password-reset/change",
  "/auth/google",
]

let isRefreshing = false
let refreshSubscribers: ((token: string) => void)[] = []
function onTokenRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token))
  refreshSubscribers = []
}
function addRefreshSubscriber(cb: (token: string) => void) {
  refreshSubscribers.push(cb)
}

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (config.url && PUBLIC_ENDPOINTS.some((url) => config.url!.includes(url))) {
      config.skipAuth = true
    }

    const token = getAccessToken()
    if (token && !config.skipAuth) {
      config.headers.Authorization = `Bearer ${token}`
    }

    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json"
    }

    return config
  },
  (error) => Promise.reject(error)
)

// ==== Response Interceptor ====
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    if (original?.skipAuth) {
      return Promise.reject(error)
    }

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
  }
)

export default api
