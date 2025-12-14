import api from "@/services/api"

export async function createCourse(payload: {
  title: any
  description: any
  price: any
  language: string
  category: { name: any }
}) {
  console.log("📨 [API] POST /courses payload:", payload)
  return api.post("/courses", payload)
}

export async function uploadThumbnail(courseId: string, file: File) {
  console.log("📨 [API] PUT /courses/{id}/thumbnail", {
    courseId,
    fileName: file.name,
    fileType: file.type,
    fileSize: file.size
  })
  return api.put(`/courses/${courseId}/thumbnail`, file, {
    headers: { "Content-Type": file.type }
  })
}

export async function createSection(
  courseId: string,
  payload: { title: string; displayOrder: number }
) {
  console.log("📨 [API] POST /courses/{id}/sections", {
    courseId,
    payload
  })
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
  console.log("📨 [API] POST /courses/{id}/sections/{sectionId}/lectures", {
    courseId,
    sectionId,
    payload
  })
  return api.post(`/courses/${courseId}/sections/${sectionId}/lectures`, payload)
}

export async function uploadLectureContent(
  courseId: string,
  lectureId: string,
  file: File
) {
  console.log("📨 [API] PUT /courses/{id}/lectures/{lectureId}/content", {
    courseId,
    lectureId,
    fileName: file.name,
    fileType: file.type,
    fileSize: file.size
  })
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
      console.log("🚀 Starting course upload process")
      console.log("🧾 FormData received:", {
        ...formData,
        thumbnail: formData.thumbnail
          ? {
            name: formData.thumbnail.name,
            type: formData.thumbnail.type,
            size: formData.thumbnail.size
          }
          : null
      })

      onProgress?.("Creating course...")

      // Step 1: Create course
      const createCoursePayload = {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        language: formData.language,
        category: formData.category
      }

      console.log("➡️ Step 1 Create course payload:", createCoursePayload)

      const { data: course } = await createCourse(createCoursePayload)
      const courseId = course.id

      console.log("✅ Course created", { courseId, course })

      // Step 2: Upload thumbnail
      if (formData.thumbnail) {
        onProgress?.("Uploading thumbnail...")
        console.log("➡️ Step 2 Upload thumbnail")
        await uploadThumbnail(courseId, formData.thumbnail)
        console.log("✅ Thumbnail uploaded")
      } else {
        console.log("ℹ️ No thumbnail provided")
      }

      // Step 3: Sections & Lectures
      const totalSections = formData.sections.length
      const totalVideos = formData.sections.reduce(
        (sum, section) => sum + section.videos.length,
        0
      )

      console.log("📊 Upload plan", { totalSections, totalVideos })

      let uploadedVideos = 0

      for (let sectionIndex = 0; sectionIndex < totalSections; sectionIndex++) {
        const section = formData.sections[sectionIndex]

        onProgress?.(
          `Creating section ${sectionIndex + 1}/${totalSections}: ${section.name}`
        )

        console.log(`➡️ Step 3.${sectionIndex + 1} Create section`, {
          name: section.name,
          displayOrder: sectionIndex + 1
        })

        const { data: createdSection } = await createSection(courseId, {
          title: section.name,
          displayOrder: sectionIndex + 1
        })

        const sectionId = createdSection.id
        console.log("✅ Section created", { sectionId })

        for (let videoIndex = 0; videoIndex < section.videos.length; videoIndex++) {
          const video = section.videos[videoIndex]

          uploadedVideos++

          onProgress?.(
            `Uploading video ${uploadedVideos}/${totalVideos}: ${video.title}`
          )

          console.log(`➡️ Create lecture ${uploadedVideos}/${totalVideos}`, {
            sectionId,
            title: video.title,
            displayOrder: videoIndex + 1,
            hasFile: !!video.file
          })

          const { data: lecture } = await createLecture(courseId, sectionId, {
            title: video.title,
            description: `Lecture ${videoIndex + 1} of ${section.name}`,
            type: "VIDEO",
            displayOrder: videoIndex + 1
          })

          const lectureId = lecture.id
          console.log("✅ Lecture created", { lectureId })

          if (video.file) {
            console.log("➡️ Upload lecture content", {
              lectureId,
              fileName: video.file.name,
              fileType: video.file.type,
              fileSize: video.file.size
            })

            await uploadLectureContent(courseId, lectureId, video.file)

            console.log("✅ Lecture video uploaded", { lectureId })
          } else {
            console.log("⚠️ Lecture has no file", { lectureId })
          }
        }
      }

      console.log("🎉 Course upload completed successfully", { courseId })
      return course
    } catch (error) {
      console.error("❌ Upload course error", error)
      throw error
    }
  }

  return { uploadCourse }
}
