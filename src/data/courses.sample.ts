import {
  CourseLevel,
  CourseStatus,
  LectureType,
  type CourseDetailDisplay
} from "@/types/course.types";

// Sample courses data yang sesuai dengan backend entity structure
export const sampleCourses: CourseDetailDisplay[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    title: "Data Science with Python",
    description: `# Data Science with Python

Kursus ini dirancang untuk memberikan pemahaman mendalam tentang **Data Science** menggunakan Python, bahasa pemrograman paling populer di industri data.

## Apa yang Akan Anda Pelajari

- **Python Fundamentals**: Dasar-dasar pemrograman Python untuk data science
- **Data Manipulation**: Menggunakan Pandas dan NumPy untuk pengolahan data
- **Data Visualization**: Membuat visualisasi yang menarik dengan Matplotlib dan Seaborn
- **Statistical Analysis**: Analisis statistik untuk pengambilan keputusan
- **Machine Learning Basics**: Pengenalan algoritma machine learning

## Kenapa Kursus Ini?

Kursus ini cocok untuk pemula yang ingin memulai karir di bidang data science. Dengan pendekatan hands-on dan proyek nyata, Anda akan siap untuk menyelesaikan masalah bisnis menggunakan data.

## Prerequisites

- Pemahaman dasar tentang matematika
- Tidak perlu pengalaman programming sebelumnya
- Laptop dengan minimal 4GB RAM`,
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    price: 750000,
    level: CourseLevel.BEGINNER,
    status: CourseStatus.PUBLISHED,
    language: "Indonesian",
    totalDuration: 25920, // 7h 12m in seconds
    totalStudents: 3500,
    averageRating: 4.8,
    totalRatings: 1200,
    instructor: {
      id: "550e8400-e29b-41d4-a716-446655440101",
      email: "jane.smith@example.com",
      firstName: "Jane",
      lastName: "Smith",
      profilePictures: [{
        id: "pic-1",
        url: "https://i.pravatar.cc/100?img=5",
        filename: "jane-avatar.jpg"
      }],
      bio: "Data scientist dengan pengalaman 7 tahun di bidang analisis data dan machine learning."
    },
    category: {
      id: "cat-001",
      name: "Data Science",
      description: "Learn data analysis, visualization, and machine learning"
    },
    sections: [
      {
        id: "sec-001",
        title: "Introduction to Data Science",
        description: "Get started with data science fundamentals",
        order: 1,
        lectures: [
          {
            id: "lec-001",
            title: "What is Data Science?",
            type: LectureType.VIDEO,
            duration: 201,
            order: 1,
            videoUrl: "https://example.com/videos/lecture-001.mp4",
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-01T00:00:00Z"
          },
          {
            id: "lec-002",
            title: "Setting Up Python Environment",
            type: LectureType.VIDEO,
            duration: 342,
            order: 2,
            videoUrl: "https://example.com/videos/lecture-002.mp4",
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-01T00:00:00Z"
          },
          {
            id: "lec-003",
            title: "Course Resources",
            type: LectureType.ARTICLE,
            duration: 0,
            order: 3,
            content: "Download materials and resources for this course...",
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-01T00:00:00Z"
          }
        ],
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z"
      },
      {
        id: "sec-002",
        title: "Data Analysis with Pandas",
        description: "Master data manipulation with Pandas library",
        order: 2,
        lectures: [
          {
            id: "lec-004",
            title: "Introduction to Pandas",
            type: LectureType.VIDEO,
            duration: 490,
            order: 1,
            videoUrl: "https://example.com/videos/lecture-004.mp4",
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-01T00:00:00Z"
          },
          {
            id: "lec-005",
            title: "Series and DataFrame",
            type: LectureType.VIDEO,
            duration: 395,
            order: 2,
            videoUrl: "https://example.com/videos/lecture-005.mp4",
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-01T00:00:00Z"
          },
          {
            id: "lec-006",
            title: "Data Cleaning Techniques",
            type: LectureType.VIDEO,
            duration: 740,
            order: 3,
            videoUrl: "https://example.com/videos/lecture-006.mp4",
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-01T00:00:00Z"
          },
          {
            id: "lec-007",
            title: "Download Dataset Files",
            type: LectureType.FILE,
            duration: 0,
            order: 4,
            fileUrl: "https://example.com/files/dataset.zip",
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-01T00:00:00Z"
          },
          {
            id: "lec-008",
            title: "Pandas Documentation",
            type: LectureType.EXTERNAL,
            duration: 0,
            order: 5,
            externalUrl: "https://pandas.pydata.org/docs/",
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-01T00:00:00Z"
          }
        ],
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z"
      }
    ],
    lectureProgress: {
      "lec-001": {
        id: "prog-001",
        lectureId: "lec-001",
        userId: "user-001",
        watchedDuration: 120,
        completed: false,
        lastWatchedAt: "2024-01-15T10:30:00Z"
      },
      "lec-002": {
        id: "prog-002",
        lectureId: "lec-002",
        userId: "user-001",
        watchedDuration: 300,
        completed: false,
        lastWatchedAt: "2024-01-15T11:00:00Z"
      }
    },
    courseProgress: {
      courseId: "550e8400-e29b-41d4-a716-446655440001",
      userId: "user-001",
      totalWatchedDuration: 420,
      completedLectures: 0,
      totalLectures: 8,
      progressPercentage: 16,
      lastAccessedAt: "2024-01-15T11:00:00Z"
    },
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T11:00:00Z"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    title: "Full-Stack Web Developer Bootcamp",
    description: `# Full-Stack Web Developer Bootcamp

Bootcamp komprehensif yang akan mengubah Anda dari pemula menjadi **Full-Stack Developer** profesional.

## Teknologi yang Dipelajari

### Frontend
- HTML5, CSS3, JavaScript ES6+
- React.js untuk membangun UI interaktif
- Tailwind CSS untuk styling modern

### Backend
- Node.js dan Express.js
- RESTful API design
- Authentication & Authorization

### Database
- PostgreSQL untuk database relational
- Prisma ORM untuk database management
- Redis untuk caching

## Project yang Akan Dibangun

1. **E-commerce Platform**: Full-featured online store
2. **Social Media App**: Real-time chat and posts
3. **Portfolio Website**: Personal branding platform

## Career Support

- Resume review
- Mock interviews
- Job placement assistance`,
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2670&auto=format&fit=crop",
    price: 3000000,
    level: CourseLevel.INTERMEDIATE,
    status: CourseStatus.PUBLISHED,
    language: "Indonesian",
    totalDuration: 45900, // 12h 45m
    totalStudents: 5200,
    averageRating: 4.9,
    totalRatings: 2000,
    instructor: {
      id: "550e8400-e29b-41d4-a716-446655440102",
      email: "john.doe@example.com",
      firstName: "John",
      lastName: "Doe",
      profilePictures: [{
        id: "pic-2",
        url: "https://i.pravatar.cc/100?img=12",
        filename: "john-avatar.jpg"
      }],
      bio: "Full-stack engineer dengan pengalaman mengajar 1000+ siswa dalam pengembangan web modern."
    },
    category: {
      id: "cat-002",
      name: "Web Development",
      description: "Master modern web development technologies"
    },
    sections: [],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T11:00:00Z"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    title: "UI/UX Design Masterclass",
    description: `# UI/UX Design Masterclass

Kuasai seni dan sains **User Interface** dan **User Experience Design** dari dasar hingga mahir.`,
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2670&auto=format&fit=crop",
    price: 0,
    level: CourseLevel.BEGINNER,
    status: CourseStatus.PUBLISHED,
    language: "Indonesian",
    totalDuration: 30000, // 8h 20m
    totalStudents: 2100,
    averageRating: 4.7,
    totalRatings: 850,
    instructor: {
      id: "550e8400-e29b-41d4-a716-446655440103",
      email: "alice.johnson@example.com",
      firstName: "Alice",
      lastName: "Johnson",
      profilePictures: [{
        id: "pic-3",
        url: "https://i.pravatar.cc/100?img=33",
        filename: "alice-avatar.jpg"
      }],
      bio: "UI/UX designer profesional dengan portfolio klien dari Fortune 500 companies."
    },
    category: {
      id: "cat-003",
      name: "UI/UX Design",
      description: "Learn design principles and user experience"
    },
    sections: [],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T11:00:00Z"
  }
];

// Helper function untuk format duration dari seconds ke string
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};

// Helper untuk format seconds ke MM:SS
export const formatDurationShort = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};
