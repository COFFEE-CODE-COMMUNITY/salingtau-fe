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

interface VideoItem {
  id: string;
  title: string;
  file: File | null;
}

interface Section {
  id: string;
  name: string;
  videos: VideoItem[];
}

export function useUploadCourse() {
  const uploadCourse = async (formData: { 
    title: string; 
    description: string; 
    price: number; 
    language: string;
    category: { name: string }; 
    thumbnail: File | null; 
    sections: Section[];
  }, onProgress?: (message: string) => void) => {
    try {
      console.log("🚀 Starting course upload process...");
      onProgress?.("Creating course...");
      
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
        onProgress?.("Uploading thumbnail...");
        await uploadThumbnail(courseId, formData.thumbnail)
        console.log("✅ Thumbnail uploaded")
      }

      // Step 3: Create sections and their videos
      const totalSections = formData.sections.length;
      const totalVideos = formData.sections.reduce((sum, section) => sum + section.videos.length, 0);
      let uploadedVideos = 0;
      
      for (let sectionIndex = 0; sectionIndex < formData.sections.length; sectionIndex++) {
        const section = formData.sections[sectionIndex];
        onProgress?.(`Creating section ${sectionIndex + 1}/${totalSections}: ${section.name}`);
        console.log(`📁 Creating section ${sectionIndex + 1}: ${section.name}`);
        
        const { data: createdSection } = await createSection(courseId, {
          title: section.name,
          displayOrder: sectionIndex + 1
        })
        const sectionId = createdSection.id
        console.log(`✅ Section created:`, sectionId)

        // Create lectures for this section
        for (let videoIndex = 0; videoIndex < section.videos.length; videoIndex++) {
          const video = section.videos[videoIndex];
          onProgress?.(`Uploading video ${uploadedVideos + 1}/${totalVideos}: ${video.title}`);
          console.log(`🎥 Creating lecture ${videoIndex + 1}: ${video.title}`);
          
          const { data: lecture } = await createLecture(courseId, sectionId, {
            title: video.title,
            description: `Lecture ${videoIndex + 1} of ${section.name}`,
            type: "VIDEO",
            displayOrder: videoIndex + 1
          })
          const lectureId = lecture.id
          console.log(`✅ Lecture created:`, lectureId)

          // Upload video content
          if (video.file) {
            console.log(`📤 Uploading video content for: ${video.title}`);
            await uploadLectureContent(courseId, lectureId, video.file)
            console.log(`✅ Video uploaded for: ${video.title}`);
          }
          uploadedVideos++;
        }
      }

      console.log("🎉 Course upload completed successfully!");
      return course
    } catch (error) {
      console.error("❌ Upload course error:", error)
      throw error
    }
  }

  return { uploadCourse }
}
