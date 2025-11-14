// Enums
export enum CourseLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
  ALL_LEVELS = "ALL_LEVELS"
}

export enum CourseStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED"
}

export enum LectureType {
  VIDEO = "VIDEO",
  ARTICLE = "ARTICLE",
  FILE = "FILE",
  EXTERNAL = "EXTERNAL"
}

// Base entities
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePictures?: ProfilePicture[];
  bio?: string;
}

export interface ProfilePicture {
  id: string;
  url: string;
  filename: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

// Course related entities
export interface Lecture {
  id: string;
  title: string;
  type: LectureType;
  duration: number; // in seconds
  order: number;
  content?: string;
  videoUrl?: string;
  fileUrl?: string;
  externalUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Section {
  id: string;
  title: string;
  description?: string;
  order: number;
  lectures: Lecture[];
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  price: number;
  discountPrice?: number;
  level: CourseLevel;
  status: CourseStatus;
  language?: string;
  totalDuration?: number; // in seconds
  totalStudents?: number;
  averageRating?: number;
  totalRatings?: number;
  instructor: User;
  category: Category;
  sections?: Section[];
  createdAt: string;
  updatedAt: string;
}

// DTOs
export interface CreateCourseDto {
  title: string;
  description: string;
  thumbnail?: string;
  price: number;
  discountPrice?: number;
  level: CourseLevel;
  language?: string;
  categoryId: string;
}

export interface UpdateCourseDto {
  title?: string;
  description?: string;
  thumbnail?: string;
  price?: number;
  discountPrice?: number;
  level?: CourseLevel;
  status?: CourseStatus;
  language?: string;
  categoryId?: string;
}

export interface CourseResponseDto {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  price: number;
  discountPrice?: number;
  level: CourseLevel;
  status: CourseStatus;
  language?: string;
  totalDuration?: number;
  totalStudents?: number;
  averageRating?: number;
  totalRatings?: number;
  instructor: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    bio?: string;
  };
  category: {
    id: string;
    name: string;
  };
  sections?: Section[];
  createdAt: string;
  updatedAt: string;
}

// Progress related
export interface LectureProgress {
  id: string;
  lectureId: string;
  userId: string;
  watchedDuration: number; // in seconds
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

// Extended types for frontend display
export interface CourseDetailDisplay extends Course {
  lectureProgress?: Record<string, LectureProgress>; // lectureId -> progress
  courseProgress?: CourseProgress;
}
