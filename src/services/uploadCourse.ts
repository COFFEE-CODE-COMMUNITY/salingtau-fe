import api from "@/services/api"

export async function createCourse(payload: {
  title: any
  description: any
  price: any
  language: string
  category: { name: any }
}) {
  return api.post("/courses", payload)
}

export async function uploadThumbnail(courseId: string, file: File) {
  return api.put(`/courses/${courseId}/thumbnail`, file, {
    headers: { "Content-Type": file.type }
  })
}

export async function createSection(
  courseId: string,
  payload: { title: string; displayOrder: number }
) {
  return api.post(`/courses/${courseId}/sections`, payload)
}

export async function createLecture(
  courseId: string,
  sectionId: string,
  payload: {
    title: string
    description: string
    type: string
    displayOrder: number
  }
) {
  return api.post(`/courses/${courseId}/sections/${sectionId}/lectures`, payload)
}

export async function uploadLectureContent(
  courseId: string,
  lectureId: string,
  file: File
) {
  return api.put(`/courses/${courseId}/lectures/${lectureId}/content`, file, {
    headers: { "Content-Type": file.type }
  })
}

interface VideoItem {
  id: string
  title: string
  file: File | null
}

interface Section {
  id: string
  name: string
  videos: VideoItem[]
}

export function useUploadCourse() {
  const uploadCourse = async (
    formData: {
      title: string
      description: string
      price: number
      language: string
      category: { name: string }
      thumbnail: File | null
      sections: Section[]
    },
    onProgress?: (message: string) => void
  ) => {
    try {
      onProgress?.("Creating course...")

      // Step 1: Create course
      const createCoursePayload = {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        language: formData.language,
        category: formData.category
      }

      const { data: course } = await createCourse(createCoursePayload)
      const courseId = course.id

      // Step 2: Upload thumbnail
      if (formData.thumbnail) {
        onProgress?.("Uploading thumbnail...")
        await uploadThumbnail(courseId, formData.thumbnail)
      }

      // Step 3: Sections & Lectures
      const totalSections = formData.sections.length
      const totalVideos = formData.sections.reduce(
        (sum, section) => sum + section.videos.length,
        0
      )

      let uploadedVideos = 0

      for (let sectionIndex = 0; sectionIndex < totalSections; sectionIndex++) {
        const section = formData.sections[sectionIndex]

        onProgress?.(
          `Creating section ${sectionIndex + 1}/${totalSections}: ${section.name}`
        )

        const { data: createdSection } = await createSection(courseId, {
          title: section.name,
          displayOrder: sectionIndex + 1
        })

        const sectionId = createdSection.id
        for (let videoIndex = 0; videoIndex < section.videos.length; videoIndex++) {
          const video = section.videos[videoIndex]

          uploadedVideos++

          onProgress?.(
            `Uploading video ${uploadedVideos}/${totalVideos}: ${video.title}`
          )


          const { data: lecture } = await createLecture(courseId, sectionId, {
            title: video.title,
            description: `Lecture ${videoIndex + 1} of ${section.name}`,
            type: "VIDEO",
            displayOrder: videoIndex + 1
          })

          const lectureId = lecture.id

          if (video.file) {
            console.log("➡️ Upload lecture content", {
              lectureId,
              fileName: video.file.name,
              fileType: video.file.type,
              fileSize: video.file.size
            })

            await uploadLectureContent(courseId, lectureId, video.file)
          }
        }
      }

      return course
    } catch (error) {
      throw error
    }
  }

  return { uploadCourse }
}
