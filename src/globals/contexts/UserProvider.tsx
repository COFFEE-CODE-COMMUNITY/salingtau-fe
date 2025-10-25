import { ReactNode, useEffect, useState } from "react"
import { decodeJwt } from "../../utils/jwt"
import { User, UserContext } from "./UserContext"
import { clearSession, getAccessToken, setAccessToken } from "../../services/api"
import UserService from "../../services/UserService"
import AuthService from "../../services/AuthService"

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const saveUser = (payload: User) => setUser(payload)

  const clearUser = () => {
    setUser(null)
    clearSession()
  }

  useEffect(() => {
    const initUser = async () => {
      let token = getAccessToken()

      if (!token) {
        // ⏱️ coba refresh token dulu
        try {
          const refreshed = await AuthService.refreshToken()
          if (refreshed?.accessToken) {
            setAccessToken(refreshed.accessToken)
            token = refreshed.accessToken
          }
        } catch {
          console.warn("No access token or refresh failed")
        }
      }

      if (!token) {
        setLoading(false)
        return
      }

      try {
        const data = await UserService.getMe()
        if (data) setUser(data)
      } catch (err) {
        clearUser()
      } finally {
        setLoading(false)
      }
    }


    initUser()
  }, [])

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-500">
        Loading user session...
      </div>
    )
  }

  return (
    <UserContext.Provider value={{ user, saveUser, clearUser }}>
      {children}
    </UserContext.Provider>
  )
}
