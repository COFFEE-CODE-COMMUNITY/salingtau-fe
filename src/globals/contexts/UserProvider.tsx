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
      const token = getAccessToken()
      if (!token) {
        setLoading(false)
        return
      }

      try {
        // 1️⃣ Decode JWT sementara
        const payload = decodeJwt<User>(token)
        if (payload) setUser(payload)

        // 2️⃣ Ambil data user dari backend
        const data = await UserService.getMe()
        if (data) setUser(data)
      } catch (err: any) {
        console.warn("[UserProvider] Gagal memuat user:", err.message)

        // 3️⃣ Coba refresh token jika gagal karena 401/expired
        try {
          console.info("[UserProvider] Mencoba refresh token...")
          const refreshed = await AuthService.refreshToken()
          if (refreshed?.accessToken) {
            setAccessToken(refreshed.accessToken)

            // ✅ Ambil ulang data user
            const data = await UserService.getMe()
            if (data) {
              setUser(data)
              console.info("[UserProvider] Token berhasil diperbarui")
              return
            }
          }
        } catch (refreshError) {
          console.error("[UserProvider] Refresh token gagal:", refreshError)
          clearUser()
        }
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
