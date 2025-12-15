const API_BASE_URL = import.meta.env.VITE_BASE_IMAGE_URL ?? "http://localhost:8081/api/v1/files"

const DEFAULT_PLACEHOLDER = "/placeholder-course.jpg"

export function getImageUrl(url: string | undefined | null): string {
  if (!url) {
    return DEFAULT_PLACEHOLDER
  }

  if (/^https?:\/\//.test(url)) {
    return url
  }

  const base = API_BASE_URL.replace(/\/$/, "")
  const path = url.replace(/^\//, "")

  return `${base}/files/${path}`
}

export function getProfilePictureUrl(
  profilePictures: Array<{ url: string }> | undefined | null,
  fallback: string = "/fallback-avatar.jpg"
): string {
  if (!profilePictures || profilePictures.length === 0) {
    return fallback
  }

  return getImageUrl(profilePictures[0].url)
}

export function getCourseThumbnailUrl(
  thumbnail: { url: string } | undefined | null,
  fallback: string = "/placeholder-course.jpg"
): string {
  if (!thumbnail || !thumbnail.url) {
    return fallback
  }

  return getImageUrl(thumbnail.url)
}