import { useState, useEffect } from "react"
import api from "./api"
import type { Course } from "./exploreCourse"
import {useUser} from "@/utils/user-context.tsx";

interface MyCoursesResponse {
  data: Course[]
  meta: {
    totalItems: number
    limit: number
    offset: number
    totalPages: number
  }
  links: {
    first: string
    previous: string
    next: string
    last: string
  }
}

// Service function
export const getMyCourses = async (userId: string): Promise<MyCoursesResponse> => {
  const response = await api.get("/transaction/student/", {
    params: {
      userId: userId,
      purchased: true, // Flag to get only purchased courses
      limit: 50,
      offset: 0
    }
  })
  
  if (response.status !== 200) {
    throw new Error(response.data?.message || "Failed to fetch my courses")
  }
  
  return response.data
}

// Custom hook
export const useMyCourses = () => {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)
  const {user} = useUser()

  const fetchMyCourses = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await getMyCourses(user!.id)
      
      // Filter out null values
      const validCourses = response.data.filter((course): course is Course => course !== null)
      
      setCourses(validCourses)
      setTotal(response.meta.totalItems)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch my courses")
      console.error("Error fetching my courses:", err)
    } finally {
      setLoading(false)
    }
  }

  const refetch = () => {
    fetchMyCourses()
  }

  useEffect(() => {
    fetchMyCourses()
  }, [])

  return {
    courses,
    loading,
    error,
    refetch,
    total,
  }
}
