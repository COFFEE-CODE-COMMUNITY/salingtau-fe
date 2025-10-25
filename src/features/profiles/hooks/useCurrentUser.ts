import { useEffect, useState } from "react"
import UserService from "../../services/UserService"
import { User } from "../../globals/contexts/UserContext"

export default function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await UserService.getMe()
        setUser(data)
      } catch (err: any) {
        setError("Gagal memuat data pengguna")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  return { user, loading, error }
}
