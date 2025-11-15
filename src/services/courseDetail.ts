import { useState, useEffect } from "react"
import api from "./api"
import type { Course, Instructor, Category } from "./exploreCourse"

// Extended types for course detail
export interface Section {
  lectures: any
  id: string
  title: string
  description?: string
  order: number
  createdAt: string
  updatedAt: string
}

export interface Lecture {
  id: string
  title: string
  description?: string
  type: "VIDEO" | "ARTICLE" | "FILE"
  duration: number
  videoUrl?: string
  articleContent?: string
  fileUrl?: string
  order: number
  isFree: boolean
  createdAt: string
  updatedAt: string
}

export interface CourseDetail extends Course {
  sections?: Section[]
  lectures?: Lecture[]
  totalSections?: number
  totalLectures?: number
  totalDuration?: number
  requirements?: string[]
  whatYouWillLearn?: string[]
  targetAudience?: string[]
}

// Service function
export const getCourseDetail = async (courseIdOrSlug: string): Promise<CourseDetail> => {
  const response = await api.get(`/courses/${courseIdOrSlug}`)
  
  if (response.status !== 200) {
    throw new Error(response.data?.message || "Failed to fetch course detail")
  }
  
  // API returns course data directly in response.data
  return response.data
}

// Custom hook
export const useCourseDetail = (courseIdOrSlug: string | undefined) => {
  const [course, setCourse] = useState<CourseDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCourseDetail = async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      const courseData = await getCourseDetail(id)
      setCourse(courseData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch course detail")
      console.error("Error fetching course detail:", err)
    } finally {
      setLoading(false)
    }
  }

  const refetch = () => {
    if (courseIdOrSlug) {
      fetchCourseDetail(courseIdOrSlug)
    }
  }

  useEffect(() => {
    if (courseIdOrSlug) {
      fetchCourseDetail(courseIdOrSlug)
    }
  }, [courseIdOrSlug])

  return {
    course,
    loading,
    error,
    refetch,
  }
}

export type { Course, Instructor, Category }
