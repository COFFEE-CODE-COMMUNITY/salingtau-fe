import {
  type Course
} from "@/types/course.types";

// Legacy type for backward compatibility with CourseCard
export interface CourseLegacy {
  id: string;
  image: string;
  category: string;
  title: string;
  rating: number;
  totalRatings: number;
  creator: string;
  price: number;
}

// Helper to convert Course to legacy format
export const toLegacyCourse = (course: Course): CourseLegacy => ({
  id: course.id,
  image: course.thumbnail?.url ?? '',
  category: course.category.name,
  title: course.title,
  rating: course.averageRating ?? 0,
  totalRatings: course.totalRatings ?? 0,
  creator: `${course.instructor.firstName} ${course.instructor.lastName}`,
  price: course.price,
});


export const coursesData = [
  {
    id: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    category: "Data Science",
    title: "Data Science with Python",
    rating: 4.8,
    totalRatings: 1200,
    totalStudents: 3500,
    creator: "Jane Smith",
    price: 750000,
    instructor: {
      name: "Jane Smith",
      avatar: "https://i.pravatar.cc/100?img=5",
      bio: "Data scientist dengan pengalaman 7 tahun di bidang analisis data dan machine learning.",
    },
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
    totalDuration: "7h 12m",
    sections: [
      {
        id: "f9e8d7c6-b5a4-4321-9876-543210fedcba",
        title: "1. Introduction to Data Science",
        lectures: [
          { id: "11223344-5566-4778-899a-abbccddeeff0", title: "What is Data Science?", type: "video", duration: 201, watchedDuration: 120, completed: false },
          { id: "22334455-6677-4889-9aab-bccddeeff011", title: "Setting Up Python Environment", type: "video", duration: 342, watchedDuration: 300, completed: false },
          { id: "33445566-7788-4999-aabb-ccddeeff0112", title: "Course Resources", type: "article", duration: 0, watchedDuration: 0, completed: false },
        ],
      },
      {
        id: "e8d7c6b5-a493-4210-9876-543210fedcba",
        title: "2. Data Analysis with Pandas",
        lectures: [
          { id: "44556677-8899-4aab-bccd-deeff0112233", title: "Introduction to Pandas", type: "video", duration: 490, watchedDuration: 330, completed: false },
          { id: "55667788-99aa-4bbc-cdde-eff011223344", title: "Series and DataFrame", type: "video", duration: 395, watchedDuration: 10, completed: false },
          { id: "66778899-aabb-4ccd-deef-f01122334455", title: "Data Cleaning Techniques", type: "video", duration: 740, watchedDuration: 0, completed: false },
          { id: "778899aa-bbcc-4dde-eff0-112233445566", title: "Download Dataset Files", type: "file", duration: 0, watchedDuration: 0, completed: false },
          { id: "8899aabb-ccdd-4eef-f011-223344556677", title: "External Learning Resource: Pandas Documentation", type: "external", duration: 0, watchedDuration: 0, completed: false },
        ],
      },
    ],
  },
  {
    id: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2670&auto=format&fit=crop",
    category: "Web Development",
    title: "Full-Stack Web Developer Bootcamp",
    rating: 4.9,
    totalRatings: 2000,
    totalStudents: 5200,
    creator: "John Doe",
    price: 3000000,
    instructor: {
      name: "John Doe",
      avatar: "https://i.pravatar.cc/100?img=12",
      bio: "Full-stack engineer dengan pengalaman mengajar 1000+ siswa dalam pengembangan web modern.",
    },
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
    totalDuration: "12h 45m",
    sections: [
      {
        id: "d7c6b5a4-9382-4109-8765-43210fedcba9",
        title: "1. Web Development Fundamentals",
        lectures: [
          { id: "99aabbcc-ddee-4ff0-0112-233445566778", title: "What is Web Development?", type: "video", duration: 252, watchedDuration: 120, completed: false },
          { id: "aabbccdd-eeff-4001-1223-344556677889", title: "HTML Basics", type: "video", duration: 407, watchedDuration: 320, completed: false },
          { id: "bbccddee-ff00-4112-2334-45566778899a", title: "CSS Fundamentals", type: "video", duration: 510, watchedDuration: 40, completed: false },
        ],
      },
      {
        id: "c6b5a493-8271-4098-7654-3210fedcba98",
        title: "2. JavaScript & React",
        lectures: [
          { id: "ccddeeff-0011-4223-3445-566778899aab", title: "JavaScript ES6+", type: "video", duration: 622, watchedDuration: 300, completed: false },
          { id: "ddeeff00-1122-4334-4556-6778899aabbc", title: "React Basics", type: "video", duration: 535, watchedDuration: 250, completed: false },
          { id: "eeff0011-2233-4445-5667-78899aabbccd", title: "State Management", type: "article", duration: 0, watchedDuration: 0, completed: false },
          { id: "ff001122-3344-4556-6778-899aabbccdde", title: "Download Dataset Files", type: "file", duration: 0, watchedDuration: 0, completed: false },
          { id: "00112233-4455-4667-7889-9aabbccddee0", title: "External Learning Resource: Pandas Documentation", type: "external", duration: 0, watchedDuration: 0, completed: false },
        ],
      },
    ],
  },
  {
    id: "c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2670&auto=format&fit=crop",
    category: "UI/UX Design",
    title: "UI/UX Design Masterclass",
    rating: 4.7,
    totalRatings: 850,
    totalStudents: 2100,
    creator: "Alice Johnson",
    price: 0,
    instructor: {
      name: "Alice Johnson",
      avatar: "https://i.pravatar.cc/100?img=33",
      bio: "UI/UX designer profesional dengan portfolio klien dari Fortune 500 companies.",
    },
    description: `# UI/UX Design Masterclass

Kuasai seni dan sains **User Interface** dan **User Experience Design** dari dasar hingga mahir.

## What You'll Master

- **Design Principles**: Typography, color theory, layout
- **User Research**: Interview, surveys, persona creation
- **Wireframing**: Low-fi to high-fi wireframes
- **Prototyping**: Interactive prototypes with Figma
- **Usability Testing**: Validate your designs

## Tools Covered

- **Figma**: Industry-standard design tool
- **Adobe XD**: Alternative design platform
- **Miro**: Collaborative whiteboarding
- **Maze**: User testing platform

## Real-World Projects

Design complete products including mobile apps, web applications, and SaaS platforms.

> "Design is not just what it looks like. Design is how it works." - Steve Jobs`,
    totalDuration: "8h 20m",
    sections: [
      {
        id: "b5a49382-7160-4987-6543-210fedcba987",
        title: "1. Design Fundamentals",
        lectures: [
          { id: "11223344-5566-4778-899a-abbccddee001", title: "UI vs UX: Understanding the Difference", type: "video", duration: 215, watchedDuration: 0, completed: false },
          { id: "22334455-6677-4889-9aab-bccddee00112", title: "Design Thinking Process", type: "video", duration: 422, watchedDuration: 0, completed: false },
        ],
      },
      {
        id: "a4938271-6050-4876-5432-10fedcba9876",
        title: "2. Figma Mastery",
        lectures: [
          { id: "33445566-7788-4999-aabb-ccddee001122", title: "Figma Interface Overview", type: "video", duration: 344, watchedDuration: 0, completed: false },
          { id: "44556677-8899-4aab-bccd-dee0011223344", title: "Creating Wireframes", type: "article", duration: 0, watchedDuration: 0, completed: false },
          { id: "55667788-99aa-4bbc-cdde-e00112233445", title: "Download Dataset Files", type: "file", duration: 0, watchedDuration: 0, completed: false },
          { id: "66778899-aabb-4ccd-deef-001122334455", title: "External Learning Resource: Pandas Documentation", type: "external", duration: 0, watchedDuration: 0, completed: false },
        ],
      },
    ],
  },
  {
    id: "d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop",
    category: "Programming",
    title: "Python Programming: From Beginner to Advanced",
    rating: 4.8,
    totalRatings: 1500,
    totalStudents: 4200,
    creator: "Michael Chen",
    price: 500000,
    instructor: {
      name: "Michael Chen",
      avatar: "https://i.pravatar.cc/100?img=68",
      bio: "Senior Python developer dan educator dengan 10+ tahun pengalaman di industri software.",
    },
    description: `# Python Programming Complete Course

Pelajari **Python** dari nol hingga mahir dengan proyek-proyek real-world yang menantang.

## Course Curriculum

### Beginner Level
- Python syntax dan basic concepts
- Data types dan operators
- Control flow dan loops
- Functions dan modules

### Intermediate Level
- Object-Oriented Programming (OOP)
- File handling dan exceptions
- Working with APIs
- Database operations

### Advanced Level
- Decorators dan generators
- Multithreading dan multiprocessing
- Web scraping
- Testing dan debugging

## Why Python?

Python adalah bahasa pemrograman **paling populer** di dunia dengan aplikasi di:
- Web Development
- Data Science
- Machine Learning
- Automation
- Game Development`,
    totalDuration: "15h 30m",
    sections: [
      {
        id: "93827160-5049-4765-4321-0fedcba98765",
        title: "1. Python Basics",
        lectures: [
          { id: "778899aa-bbcc-4dde-eff0-011223344556", title: "Installing Python", type: "video", duration: 255, watchedDuration: 0, completed: false },
          { id: "8899aabb-ccdd-4eef-f001-122334455667", title: "Your First Python Program", type: "video", duration: 390, watchedDuration: 0, completed: false },
          { id: "99aabbcc-ddee-4ff0-0112-233445566778", title: "Variables and Data Types", type: "article", duration: 0, watchedDuration: 0, completed: false },
        ],
      },
      {
        id: "82716050-4938-4654-3210-fedcba987654",
        title: "2. Control Flow",
        lectures: [
          { id: "aabbccdd-eeff-4001-1223-344556677889", title: "If Statements", type: "video", duration: 440, watchedDuration: 0, completed: false },
          { id: "bbccddee-ff00-4112-2334-45566778899a", title: "Loops in Python", type: "video", duration: 615, watchedDuration: 0, completed: false },
          { id: "ccddeeff-0011-4223-3445-566778899aab", title: "Download Dataset Files", type: "file", duration: 0, watchedDuration: 0, completed: false },
          { id: "ddeeff00-1122-4334-4556-6778899aabbc", title: "External Learning Resource: Pandas Documentation", type: "external", duration: 0, watchedDuration: 0, completed: false },
        ],
      },
    ],
  },
  {
    id: "e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2670&auto=format&fit=crop",
    category: "Mobile Development",
    title: "React Native: Build iOS & Android Apps",
    rating: 4.6,
    totalRatings: 980,
    totalStudents: 2800,
    creator: "Sarah Williams",
    price: 1500000,
    instructor: {
      name: "Sarah Williams",
      avatar: "https://i.pravatar.cc/100?img=45",
      bio: "Mobile app developer dengan 15+ apps di App Store dan Google Play Store.",
    },
    description: `# React Native Mobile Development

Build production-ready **iOS** dan **Android** apps dengan satu codebase menggunakankan React Native.

## What Makes This Course Special

- **One Codebase, Two Platforms**: Write once, deploy everywhere
- **Real App Development**: Build 5 complete apps
- **App Store Deployment**: Learn submission process
- **Performance Optimization**: Make apps lightning fast

## Apps You'll Build

1. **Weather App**: Location-based forecasts
2. **Food Delivery App**: Full e-commerce experience
3. **Chat Application**: Real-time messaging
4. **Fitness Tracker**: Health monitoring app
5. **Portfolio App**: Showcase your skills

## Technologies Covered

- React Native core concepts
- Navigation (React Navigation)
- State management (Redux/Context API)
- Firebase integration
- Push notifications
- Maps and geolocation`,
    totalDuration: "18h 15m",
    sections: [
      {
        id: "71605049-3827-4543-2109-edcba9876543",
        title: "1. React Native Basics",
        lectures: [
          { id: "eeff0011-2233-4445-5667-78899aabbccd", title: "Setting Up Development Environment", type: "video", duration: 630, watchedDuration: 0, completed: false },
          { id: "ff001122-3344-4556-6778-899aabbccdde", title: "React Native Components", type: "video", duration: 765, watchedDuration: 0, completed: false },
        ],
      },
      {
        id: "60504938-2716-4432-1098-dcba98765432",
        title: "2. Navigation & Routing",
        lectures: [
          { id: "00112233-4455-4667-7889-9aabbccddee0", title: "React Navigation Setup", type: "video", duration: 500, watchedDuration: 0, completed: false },
          { id: "11223344-5566-4778-899a-abbccddeeff1", title: "Stack Navigator", type: "article", duration: 0, watchedDuration: 0, completed: false },
          { id: "22334455-6677-4889-9aab-bccddeeff011", title: "Download Dataset Files", type: "file", duration: 0, watchedDuration: 0, completed: false },
          { id: "33445566-7788-4999-aabb-ccddeeff0112", title: "External Learning Resource: Pandas Documentation", type: "external", duration: 0, watchedDuration: 0, completed: false },
        ],
      },
    ],
  },
  {
    id: "f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2670&auto=format&fit=crop",
    category: "Machine Learning",
    title: "Machine Learning A-Z: Hands-On Python",
    rating: 4.9,
    totalRatings: 3200,
    totalStudents: 8500,
    creator: "Dr. Emma Rodriguez",
    price: 2000000,
    instructor: {
      name: "Dr. Emma Rodriguez",
      avatar: "https://i.pravatar.cc/100?img=20",
      bio: "PhD in Computer Science, AI researcher dengan publikasi di top conferences.",
    },
    description: `# Machine Learning Complete Guide

Master **Machine Learning** dengan Python: dari fundamental theory hingga advanced implementations.

## Comprehensive Curriculum

### Supervised Learning
- Linear Regression
- Logistic Regression
- Decision Trees
- Random Forests
- Support Vector Machines (SVM)

### Unsupervised Learning
- K-Means Clustering
- Hierarchical Clustering
- Principal Component Analysis (PCA)
- Anomaly Detection

### Deep Learning
- Neural Networks
- Convolutional Neural Networks (CNN)
- Recurrent Neural Networks (RNN)
- Transfer Learning

## Real-World Projects

Build ML models for:
- **Stock Price Prediction**
- **Image Classification**
- **Sentiment Analysis**
- **Recommendation Systems**
- **Fraud Detection**

## Tools & Libraries

- Scikit-learn
- TensorFlow
- Keras
- PyTorch
- Pandas & NumPy`,
    totalDuration: "25h 40m",
    sections: [
      {
        id: "50493827-1605-4321-0987-cba987654321",
        title: "1. ML Fundamentals",
        lectures: [
          { id: "44556677-8899-4aab-bccd-deeff0112234", title: "What is Machine Learning?", type: "video", duration: 390, watchedDuration: 0, completed: false },
          { id: "55667788-99aa-4bbc-cdde-eff011223345", title: "Types of Machine Learning", type: "video", duration: 495, watchedDuration: 0, completed: false },
        ],
      },
      {
        id: "49382716-0504-4210-9876-ba9876543210",
        title: "2. Data Preprocessing",
        lectures: [
          { id: "66778899-aabb-4ccd-deef-f01122334456", title: "Handling Missing Data", type: "video", duration: 645, watchedDuration: 0, completed: false },
          { id: "778899aa-bbcc-4dde-eff0-112233445567", title: "Feature Scaling", type: "article", duration: 0, watchedDuration: 0, completed: false },
          { id: "8899aabb-ccdd-4eef-f011-223344556678", title: "Download Dataset Files", type: "file", duration: 0, watchedDuration: 0, completed: false },
          { id: "99aabbcc-ddee-4ff0-0112-233445566789", title: "External Learning Resource: Pandas Documentation", type: "external", duration: 0, watchedDuration: 0, completed: false },
        ],
      },
    ],
  },
];