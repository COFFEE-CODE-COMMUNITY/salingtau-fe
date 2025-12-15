import api ,{setAccessToken} from "@/services/api.ts";

export const checkAuth = async () => {
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
        return false
      }
    }

    return false
  }
}