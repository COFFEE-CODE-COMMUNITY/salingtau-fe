import { type ReactNode, useEffect, useState, useCallback, useRef } from "react"
import { type User, UserContext } from "./user-context"
import { clearSession, getAccessToken, setAccessToken } from "@/services/api"
import { getMe } from "@/services/getMe"
import { getRefreshToken } from "@/services/getRefreshToken"
import { Progress } from "@/components/ui/progress"
import { useUserStore } from "@/utils/useActiveRoles"

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const initLock = useRef(false)

  const setUserStore = useUserStore((state) => state.setUser)
  const clearUserStore = useUserStore((state) => state.clearUser)

  const saveUser = useCallback((payload: User) => {
    setUser(payload)
    setUserStore(payload)
  }, [setUserStore])

  const clearUser = useCallback(() => {
    setUser(null)
    clearUserStore()
    clearSession()
  }, [clearUserStore])

  useEffect(() => {
    if (initLock.current) return
    initLock.current = true

    const initUser = async () => {
      try {
        setLoading(true)

        let token = getAccessToken()

        if (token) {
          try {
            const data = await getMe()
            if (data) {
              setUser(data)
              setUserStore(data)
              setLoading(false)
              return
            }
          } catch (error) {
            console.warn("⚠️ getMe failed, will try refresh:", error)
          }
        }

        setIsRefreshing(true)

        try {
          const refreshed = await getRefreshToken()

          if (refreshed?.accessToken) {
            setAccessToken(refreshed.accessToken)
            token = refreshed.accessToken

            const data = await getMe()
            if (data) {
              setUser(data)
              setUserStore(data)
            }
          }
        } catch (refreshError) {
          console.warn("⚠️ Token refresh failed:", refreshError)
        } finally {
          setIsRefreshing(false)
        }
      } catch (error) {
        console.error("❌ User initialization failed:", error)
      } finally {
        setLoading(false)
      }
    }

    void initUser()

    return () => {
      initLock.current = false
    }
  }, [setUserStore])

  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
        <Progress value={isRefreshing ? 60 : 40} className="w-80 h-2" />
        <p className="text-sm text-gray-500">
          {isRefreshing ? "Refreshing session..." : "Loading..."}
        </p>
      </div>
    )
  }

  return (
    <UserContext.Provider value={{ user, saveUser, clearUser, loading }}>
      {children}
    </UserContext.Provider>
  )
}
