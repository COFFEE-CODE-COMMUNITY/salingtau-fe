import api from "@/services/api"

export async function createCourse(payload: { title: any; description: any; price: any; language: string; category: { name: any } }) {
  return api.post("/courses", payload)
}

export async function uploadThumbnail(courseId: string, file: File) {
  return api.put(`/courses/${courseId}/thumbnail`, file, {
    headers: { "Content-Type": file.type }
  })
}

export async function createLecture(courseId: string, sectionId: string, payload: { title: any; description: any; }) {
  return api.post(`/courses/${courseId}/sections/${sectionId}/lectures`, payload)
}

export async function uploadLectureContent(courseId: string, lectureId: string, file: File) {
  return api.put(`/courses/${courseId}/lectures/${lectureId}/content`, file, {
    headers: { "Content-Type": file.type }
  })
}

export function useUploadCourse() {
  const uploadCourse = async (formData: { title: any; description: any; isPaid: any; price: any; category_id: any; thumbnail: File; lessons: any[] }) => {
    const payload = {
      title: formData.title,
      description: formData.description,
      price: formData.isPaid ? formData.price : 0,
      language: "en-US",
      category: {
        name: formData.category_id,
      }
    }

    const { data: course } = await createCourse(payload)
    const courseId = course.id

    if (formData.thumbnail) {
      await uploadThumbnail(courseId, formData.thumbnail)
    }

    const { data: section } = await api.post(`/courses/${courseId}/sections`, {
      title: "Section 1"
    })
    const sectionId = section.id
    const lesson = formData.lessons[0]

    const { data: lecture } = await createLecture(courseId, sectionId, {
      title: lesson.title,
      description: lesson.description
    })
    const lectureId = lecture.id

    if (lesson.video_file) {
      await uploadLectureContent(courseId, lectureId, lesson.video_file)
    }

    return course
  }

  return { uploadCourse }
}
