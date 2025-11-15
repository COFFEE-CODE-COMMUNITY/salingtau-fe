import api from "@/services/api"

export async function createCourse(payload: { title: any; description: any; price: any; language: string; category: { name: any } }) {
  return api.post("/courses", payload)
}

export async function uploadThumbnail(courseId: string, file: File) {
  return api.put(`/courses/${courseId}/thumbnail`, file, {
    headers: { "Content-Type": file.type }
  })
}

export async function createSection(courseId: string, payload: { title: string; displayOrder: number }) {
  return api.post(`/courses/${courseId}/sections`, payload)
}

export async function createLecture(courseId: string, sectionId: string, payload: { title: string; description: string; type: string; displayOrder: number }) {
  return api.post(`/courses/${courseId}/sections/${sectionId}/lectures`, payload)
}

export async function uploadLectureContent(courseId: string, lectureId: string, file: File) {
  return api.put(`/courses/${courseId}/lectures/${lectureId}/content`, file, {
    headers: { "Content-Type": file.type }
  })
}

export function useUploadCourse() {
  const uploadCourse = async (formData: { 
    title: string; 
    description: string; 
    price: number; 
    language: string;
    category: { name: string }; 
    thumbnail: File | null; 
    video: File | null;
  }) => {
    try {
      // Step 1: Create course
      const { data: course } = await createCourse({
        title: formData.title,
        description: formData.description,
        price: formData.price,
        language: formData.language,
        category: formData.category
      })
      const courseId = course.id
      console.log("✅ Course created:", courseId)

      // Step 2: Upload thumbnail
      if (formData.thumbnail) {
        await uploadThumbnail(courseId, formData.thumbnail)
        console.log("✅ Thumbnail uploaded")
      }

      // Step 3: Create section (hardcoded as requested)
      const { data: section } = await createSection(courseId, {
        title: "Section 1",
        displayOrder: 1
      })
      const sectionId = section.id
      console.log("✅ Section created:", sectionId)

      // Step 4: Create lecture
      const { data: lecture } = await createLecture(courseId, sectionId, {
        title: "Lesson 1",
        description: "First lesson of the course",
        type: "VIDEO",
        displayOrder: 1
      })
      const lectureId = lecture.id
      console.log("✅ Lecture created:", lectureId)

      // Step 5: Upload video content
      if (formData.video) {
        await uploadLectureContent(courseId, lectureId, formData.video)
        console.log("✅ Video uploaded")
      }

      return course
    } catch (error) {
      console.error("❌ Upload course error:", error)
      throw error
    }
  }

  return { uploadCourse }
}
