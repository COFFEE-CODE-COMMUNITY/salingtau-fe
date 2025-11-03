import type {User} from "@/utils/user-context.tsx";
import api from "@/services/api.ts";

export const getMe = async (): Promise<User | undefined> => {
    const res = await api.get("/users/me", {
      withCredentials: true,
      skipAuth: false,
      headers: { "Content-Type": "application/json" },
    })
  return res.data
}