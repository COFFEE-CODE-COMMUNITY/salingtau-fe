import api from "@/services/api.ts";

export const getRefreshToken = async () => {
  const response = await api.get("/auth/refresh-token", {
    withCredentials: true,
    skipAuth: true,
  })
  return response.data
}