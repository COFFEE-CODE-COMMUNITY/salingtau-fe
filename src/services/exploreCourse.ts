import { useState, useEffect } from "react"
import api from "./api"
import {useUser} from "@/utils/user-context.tsx";

// Types
export interface Thumbnail {
  path: string;
  url: string
  width: number
  height: number
}

export interface Category {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface ProfilePicture {
  url: string
  width: number
  height: number
}

export interface Instructor {
  firstName: string
  lastName: string
  headline: string
  biography: string
  profilePictures: ProfilePicture[]
  websiteUrl?: string
  facebookUrl?: string
  instagramUrl?: string
  linkedinUrl?: string
  tiktokUrl?: string
  xUrl?: string
  youtubeUrl?: string
}

export interface Course {
  id: string
  title: string
  slug: string
  description: string
  language: string
  price: number
  thumbnail: Thumbnail
  status: string
  averageRating: number
  totalReviews: number
  category: Category
  instructor: Instructor
  createdAt: string
  updatedAt: string
}

interface CoursesResponse {
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

// Service functions
export const getCourses = async (userId: string): Promise<CoursesResponse> => {
  const response = await api.get("/courses", {
    params: {
      userId: userId,
      purchased: false,
      limit: 50, // Fetch all courses
      offset: 0
    }
  })

  console.log("response", response)

  if (response.status !== 200) {
    throw new Error(response.data?.message || "Failed to fetch courses")
  }
  
  return response.data
}

// Custom hook
export const useExploreCourses = () => {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)
  const {user} = useUser()

  const fetchCourses = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await getCourses(user!.id)
      
      // Filter out null values
      const validCourses = response.data.filter((course): course is Course => course !== null)
      
      setCourses(validCourses)
      setTotal(response.meta.totalItems)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch courses")
      console.error("Error fetching courses:", err)
    } finally {
      setLoading(false)
    }
  }

  const refetch = () => {
    fetchCourses()
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  return {
    courses,
    loading,
    error,
    refetch,
    total,
  }
}
