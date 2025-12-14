// =====================
// ENUMS
// =====================
export enum CourseLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
  ALL_LEVELS = "ALL_LEVELS",
}

export enum CourseStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

export enum LectureType {
  VIDEO = "VIDEO",
  ARTICLE = "ARTICLE",
  FILE = "FILE",
  EXTERNAL = "EXTERNAL",
}

// =====================
// USER & MEDIA
// =====================
export interface ProfilePicture {
  id?: string;
  url: string;
  width?: number;
  height?: number;
  variant?: "original" | "small" | "medium" | "large";
  filename?: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePictures?: ProfilePicture[];
  bio?: string;
}

// =====================
// INSTRUCTOR
// =====================
export interface Instructor extends User {
  biography?: string | null;
  headline?: string | null;
  websiteUrl?: string | null;
  linkedinUrl?: string | null;
  xUrl?: string | null;
  youtubeUrl?: string | null;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  tiktokUrl?: string | null;
}

// =====================
// CATEGORY
// =====================
export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

// =====================
// VIDEO
// =====================
export interface Video {
  path: string;
  mimetype?: string | null;
  size?: number | null;
  durationMilliseconds?: string;
  resolutions?: number[];
  status?: "processing" | "ready" | "failed";
}

// =====================
// LECTURE
// =====================
export interface Lecture {
  id: string;
  title: string;
  description?: string;
  type: LectureType;

  // ordering
  order?: number;
  displayOrder?: number;

  // content
  duration?: number; // seconds
  video?: Video;
  videoUrl?: string;
  fileUrl?: string;
  externalUrl?: string;
  content?: string;

  createdAt?: string;
  updatedAt?: string;
}

// =====================
// SECTION
// =====================
export interface Section {
  id: string;
  title: string;
  description?: string;

  order?: number;
  displayOrder?: number;

  lectures: Lecture[];

  createdAt?: string;
  updatedAt?: string;
}

// =====================
// COURSE
// =====================
export interface Course {
  id: string;
  title: string;
  description: string;
  slug?: string;

  thumbnail?: {
    url: string;
    width?: number;
    height?: number;
  };

  price: number;
  discountPrice?: number;

  level?: CourseLevel;
  status: CourseStatus;
  language?: string;

  totalDuration?: number; // seconds
  totalStudents?: number;
  averageRating?: number;
  totalRatings?: number;

  instructor: Instructor;
  category: Category;
  sections?: Section[];

  createdAt: string;
  updatedAt: string;
}

// =====================
// COURSE DETAIL
// =====================
export interface CourseDetail extends Course {
  totalLectures?: number;
  totalSections?: number;
}

// =====================
// PROGRESS
// =====================
export interface LectureProgress {
  id: string;
  lectureId: string;
  userId: string;
  watchedDuration: number;
  completed: boolean;
  lastWatchedAt: string;
}

export interface CourseProgress {
  courseId: string;
  userId: string;
  totalWatchedDuration: number;
  completedLectures: number;
  totalLectures: number;
  progressPercentage: number;
  lastAccessedAt: string;
}

// =====================
// FRONTEND DISPLAY
// =====================
export interface CourseDetailDisplay extends CourseDetail {
  lectureProgress?: Record<string, LectureProgress>;
  courseProgress?: CourseProgress;
}

// =====================
// RESPONSES
// =====================
export interface CourseDetailResponse {
  course: CourseDetail | null;
  loading: boolean;
  error: string | null;
}