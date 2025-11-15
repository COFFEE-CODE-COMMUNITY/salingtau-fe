const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8081/api/v1"

/**
 * Get full image URL from API response
 * Handles both full URLs and relative paths
 */
export function getImageUrl(url: string | undefined | null): string {
  console.log("🖼️ getImageUrl input:", url)
  
  if (!url) {
    return "/placeholder-course.jpg"
  }

  // If URL already starts with http/https, return as is
  if (url.startsWith("http://") || url.startsWith("https://")) {
    // Check if it's a placeholder URL
    if (url.includes("example.com") || url.includes("cdn.example.com")) {
      return "/placeholder-course.jpg"
    }
    return url
  }

  // If URL starts with /api, prepend base origin (without /v1)
  if (url.startsWith("/api")) {
    const apiBase = (import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8081/api/v1").replace(/\/v1$/, "")
    const result = `${apiBase}${url.replace(/^\/api/, "")}`
    console.log("🖼️ Final URL (starts with /api):", result)
    return result
  }

  // If URL starts with /files, prepend full API base URL
  if (url.startsWith("/files")) {
    const result = `${API_BASE_URL}${url}`
    console.log("🖼️ Final URL (starts with /files):", result)
    return result
  }

  // Otherwise assume it's a relative path from files endpoint
  const result = `${API_BASE_URL}/files/${url}`
  console.log("🖼️ Final URL (relative):", result)
  return result
}

/**
 * Get profile picture URL with fallback
 */
export function getProfilePictureUrl(
  profilePictures: Array<{ url: string }> | undefined | null,
  fallback: string = "/fallback-avatar.jpg"
): string {
  if (!profilePictures || profilePictures.length === 0) {
    return fallback
  }

  return getImageUrl(profilePictures[0].url)
}

/**
 * Get course thumbnail URL with fallback
 */
export function getCourseThumbnailUrl(
  thumbnail: { url: string } | undefined | null,
  fallback: string = "/placeholder-course.jpg"
): string {
  if (!thumbnail || !thumbnail.url) {
    return fallback
  }

  return getImageUrl(thumbnail.url)
}
