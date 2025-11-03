// contexts/user-provider.tsx - FIXED VERSION
import { type ReactNode, useEffect, useState, useCallback, useRef } from "react"
import { type User, UserContext } from "./user-context"
import { clearSession, getAccessToken, setAccessToken } from "@/services/api"
import { getMe } from "@/services/getMe"
import { getRefreshToken } from "@/services/getRefreshToken"
import { Progress } from "@/components/ui/progress"

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const initLock = useRef(false)

  const saveUser = useCallback((payload: User) => {
    setUser(payload)
    console.log("👤 User saved:", payload.email)
  }, [])

  const clearUser = useCallback(() => {
    setUser(null)
    clearSession()
    console.log("🚪 User logged out")
  }, [])

  useEffect(() => {
    if (initLock.current) return
    initLock.current = true

    const initUser = async () => {
      try {
        setLoading(true)
        console.log("🚀 Initializing user session...")

        let token = getAccessToken()
        console.log("🔍 Token status:", token ? "EXISTS" : "MISSING")

        // ✅ FIX: Jika ada token, langsung fetch user (jangan refresh dulu)
        if (token) {
          console.log("✅ Token found, fetching user data...")
          try {
            const data = await getMe()

            if (data) {
              setUser(data)
              console.log("✅ User data loaded:", data.email)
              setLoading(false)
              return
            } else {
              console.warn("⚠️ getMe returned no data, will try refresh")
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
            }
          } else {
            console.warn("⚠️ Refresh returned no token")
          }
        } catch (refreshError) {
          console.warn("⚠️ Token refresh failed:", refreshError)
        } finally {
          setIsRefreshing(false)
        }

      } catch (error) {
        console.error("❌ User initialization failed:", error)
        // ✅ JANGAN auto-clear user, biarkan ProtectedRoute handle
      } finally {
        setLoading(false)
      }
    }

    void initUser()

    return () => {
      initLock.current = false
    }
  }, [clearUser])

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