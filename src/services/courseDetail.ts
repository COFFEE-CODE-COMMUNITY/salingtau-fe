import { useState, useEffect } from "react"
import api from "./api"
import type { Course, Instructor, Category } from "./exploreCourse"
import type {Lecture, Section} from "@/types/course.types.ts";


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
  
  const courseData = response.data
  
  // Try to fetch sections if course has ID
  let sectionsWithLectures: Section[] = []
  
  try {
    if (courseData.id) {
      const sectionsResponse = await api.get(`/courses/${courseData.id}/sections`)
      
      if (sectionsResponse.status === 200 && sectionsResponse.data?.data) {
        const sections = sectionsResponse.data.data
        
        // For each section, try to fetch lectures
        for (const section of sections) {
          try {
            // Try different possible endpoints for lectures
            let lecturesResponse

            try {
              lecturesResponse = await api.get(`/courses/${courseData.id}/sections/${section.id}/lectures`)
            } catch (nestedError) {
              const baseUrl = import.meta.env.VITE_API_URL
              const videoUrl = `${baseUrl}${courseData.id}/master.m3u8`
              
              const mockLecture = {
                id: `${section.id}-lecture-1`,
                title: `${section.title} - Video Lesson`,
                description: "Course video content",
                type: "VIDEO" as const,
                duration: 600, // 10 minutes default
                videoUrl: videoUrl,
                order: 1,
                isFree: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
              }
              
              section.lectures = [mockLecture]

              continue
            }
            
            if (lecturesResponse?.status === 200 && lecturesResponse.data?.data) {
              section.lectures = lecturesResponse.data.data
            } else {
              section.lectures = []
            }
          } catch (lectureError) {
            section.lectures = []
          }
        }
        
        sectionsWithLectures = sections
      }
    }
  } catch (sectionsError) {
    sectionsWithLectures = []
  }
  
  // Combine course data with sections
  const enrichedCourse: CourseDetail = {
    ...courseData,
    sections: sectionsWithLectures,
    totalSections: sectionsWithLectures.length,
    totalLectures: sectionsWithLectures.reduce((total, section) => 
      total + (section.lectures?.length || 0), 0
    ),
    totalDuration: sectionsWithLectures.reduce((total, section) => 
      total + (section.lectures?.reduce((sectionTotal, lecture) => 
        sectionTotal + (lecture.duration || 0), 0
      ) || 0), 0
    )
  }

  return enrichedCourse
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
