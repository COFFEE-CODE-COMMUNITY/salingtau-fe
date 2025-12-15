import {useCallback} from "react"
import {useNavigate} from "react-router-dom"
import api, {clearSession} from "@/services/api"
import {useUser} from "@/utils/user-context"

export function useLogout() {
  const { clearUser } = useUser()
  const navigate = useNavigate()

  return useCallback(async () => {
    try {
      await api.post(
        "/auth/logout",
        {},
        {
          withCredentials: true,
          headers: {
            "User-Agent": navigator.userAgent,
          },
        },
      )

      clearUser()
      clearSession()

      navigate("/login", {replace: true})
    } catch (error) {
      clearUser()
      clearSession()
      navigate("/login", {replace: true})
    }
  }, [clearUser, navigate])
}
