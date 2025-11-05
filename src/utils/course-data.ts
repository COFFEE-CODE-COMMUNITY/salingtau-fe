import type { Course } from "@/components/ui/course-card.tsx";

export interface CourseDetail extends Course {
  totalStudents?: number;
  instructor: {
    name: string;
    avatar: string;
    bio: string;
  };
  description: string; // Markdown format
  totalDuration: string;
  sections: {
    id: string;
    title: string;
    lectures: {
      id: string;
      title: string;
      type: "video" | "article" | "file";
      duration: number;
      watchedDuration: number;
      completed: boolean;
    }[];
  }[];
}

export const coursesData: CourseDetail[] = [
  {
    id: "1",
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
        id: "section-1",
        title: "1. Introduction to Data Science",
        lectures: [
          { id: "lec-1", title: "What is Data Science?", type: "video", duration: 201, watchedDuration: 120, completed: false },
          { id: "lec-2", title: "Setting Up Python Environment", type: "video", duration: 342, watchedDuration: 300, completed: false },
          { id: "lec-3", title: "Course Resources", type: "file", duration: 0, watchedDuration: 0, completed: false },
        ],
      },
      {
        id: "section-2",
        title: "2. Data Analysis with Pandas",
        lectures: [
          { id: "lec-4", title: "Introduction to Pandas", type: "video", duration: 490, watchedDuration: 330, completed: false },
          { id: "lec-5", title: "Series and DataFrame", type: "video", duration: 395, watchedDuration: 10, completed: false },
          { id: "lec-6", title: "Data Cleaning Techniques", type: "video", duration: 740, watchedDuration: 0, completed: false },
        ],
      },
    ],
  },
  {
    id: "2",
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
        id: "section-1",
        title: "1. Web Development Fundamentals",
        lectures: [
          { id: "lec-1", title: "What is Web Development?", type: "video", duration: 252, watchedDuration: 120, completed: false },
          { id: "lec-2", title: "HTML Basics", type: "video", duration: 407, watchedDuration: 320, completed: false },
          { id: "lec-3", title: "CSS Fundamentals", type: "video", duration: 510, watchedDuration: 40, completed: false },
        ],
      },
      {
        id: "section-2",
        title: "2. JavaScript & React",
        lectures: [
          { id: "lec-4", title: "JavaScript ES6+", type: "video", duration: 622, watchedDuration: 300, completed: false },
          { id: "lec-5", title: "React Basics", type: "video", duration: 535, watchedDuration: 250, completed: false },
          { id: "lec-6", title: "State Management", type: "video", duration: 730, watchedDuration: 120, completed: false },
        ],
      },
    ],
  },
  {
    id: "3",
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
        id: "section-1",
        title: "1. Design Fundamentals",
        lectures: [
          { id: "lec-1", title: "UI vs UX: Understanding the Difference", type: "video", duration: 215, watchedDuration: 0, completed: false },
          { id: "lec-2", title: "Design Thinking Process", type: "video", duration: 422, watchedDuration: 0, completed: false },
        ],
      },
      {
        id: "section-2",
        title: "2. Figma Mastery",
        lectures: [
          { id: "lec-3", title: "Figma Interface Overview", type: "video", duration: 344, watchedDuration: 0, completed: false },
          { id: "lec-4", title: "Creating Wireframes", type: "video", duration: 550, watchedDuration: 0, completed: false },
        ],
      },
    ],
  },
  {
    id: "4",
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
        id: "section-1",
        title: "1. Python Basics",
        lectures: [
          { id: "lec-1", title: "Installing Python", type: "video", duration: 255, watchedDuration: 0, completed: false },
          { id: "lec-2", title: "Your First Python Program", type: "video", duration: 390, watchedDuration: 0, completed: false },
          { id: "lec-3", title: "Variables and Data Types", type: "video", duration: 525, watchedDuration: 0, completed: false },
        ],
      },
      {
        id: "section-2",
        title: "2. Control Flow",
        lectures: [
          { id: "lec-4", title: "If Statements", type: "video", duration: 440, watchedDuration: 0, completed: false },
          { id: "lec-5", title: "Loops in Python", type: "video", duration: 615, watchedDuration: 0, completed: false },
        ],
      },
    ],
  },
  {
    id: "5",
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

Build production-ready **iOS** dan **Android** apps dengan satu codebase menggunakan React Native.

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
        id: "section-1",
        title: "1. React Native Basics",
        lectures: [
          { id: "lec-1", title: "Setting Up Development Environment", type: "video", duration: 630, watchedDuration: 0, completed: false },
          { id: "lec-2", title: "React Native Components", type: "video", duration: 765, watchedDuration: 0, completed: false },
        ],
      },
      {
        id: "section-2",
        title: "2. Navigation & Routing",
        lectures: [
          { id: "lec-3", title: "React Navigation Setup", type: "video", duration: 500, watchedDuration: 0, completed: false },
          { id: "lec-4", title: "Stack Navigator", type: "video", duration: 675, watchedDuration: 0, completed: false },
        ],
      },
    ],
  },
  {
    id: "6",
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
        id: "section-1",
        title: "1. ML Fundamentals",
        lectures: [
          { id: "lec-1", title: "What is Machine Learning?", type: "video", duration: 390, watchedDuration: 0, completed: false },
          { id: "lec-2", title: "Types of Machine Learning", type: "video", duration: 495, watchedDuration: 0, completed: false },
        ],
      },
      {
        id: "section-2",
        title: "2. Data Preprocessing",
        lectures: [
          { id: "lec-3", title: "Handling Missing Data", type: "video", duration: 645, watchedDuration: 0, completed: false },
          { id: "lec-4", title: "Feature Scaling", type: "video", duration: 450, watchedDuration: 0, completed: false },
        ],
      },
    ],
  },
  {
    id: "7",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop",
    category: "Business",
    title: "Digital Marketing Mastery 2024",
    rating: 4.5,
    totalRatings: 1100,
    totalStudents: 3200,
    creator: "David Martinez",
    price: 0,
    instructor: {
      name: "David Martinez",
      avatar: "https://i.pravatar.cc/100?img=52",
      bio: "Digital marketing strategist yang telah membantu 100+ businesses grow online.",
    },
    description: `# Digital Marketing Complete Course

Pelajari strategi **Digital Marketing** terkini untuk grow business di era digital.

## What You'll Learn

### SEO (Search Engine Optimization)
- Keyword research
- On-page optimization
- Link building strategies
- Technical SEO

### Social Media Marketing
- Facebook & Instagram Ads
- LinkedIn marketing
- TikTok strategies
- Content creation

### Email Marketing
- List building
- Email automation
- A/B testing
- Analytics

### Content Marketing
- Blog writing
- Video marketing
- Storytelling
- Content distribution

## Why This Course?

- **Up-to-date strategies** for 2024
- **Real case studies** from successful campaigns
- **Hands-on projects** to build your portfolio
- **Certification** upon completion

> Bonus: Access to exclusive marketing templates and tools!`,
    totalDuration: "10h 30m",
    sections: [
      {
        id: "section-1",
        title: "1. Digital Marketing Fundamentals",
        lectures: [
          { id: "lec-1", title: "Introduction to Digital Marketing", type: "video", duration: 320, watchedDuration: 0, completed: false },
          { id: "lec-2", title: "Marketing Funnel Basics", type: "video", duration: 465, watchedDuration: 0, completed: false },
        ],
      },
      {
        id: "section-2",
        title: "2. SEO Strategies",
        lectures: [
          { id: "lec-3", title: "Keyword Research Techniques", type: "video", duration: 750, watchedDuration: 0, completed: false },
          { id: "lec-4", title: "On-Page SEO Optimization", type: "video", duration: 555, watchedDuration: 0, completed: false },
        ],
      },
    ],
  },
  {
    id: "8",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop",
    category: "Finance",
    title: "Financial Analysis & Investment Strategy",
    rating: 4.7,
    totalRatings: 750,
    totalStudents: 1900,
    creator: "Robert Chang",
    price: 1200000,
    instructor: {
      name: "Robert Chang",
      avatar: "https://i.pravatar.cc/100?img=15",
      bio: "CFA charterholder dengan 15 tahun pengalaman di investment banking.",
    },
    description: `# Financial Analysis & Investment

Master **financial analysis** dan investment strategies untuk membangun wealth.

## Course Overview

### Financial Statement Analysis
- Balance Sheet analysis
- Income Statement interpretation
- Cash Flow Statement
- Financial Ratios

### Valuation Techniques
- Discounted Cash Flow (DCF)
- Comparable Company Analysis
- Precedent Transactions
- Asset-based Valuation

### Investment Strategies
- Value Investing
- Growth Investing
- Dividend Investing
- Index Fund Investing

### Portfolio Management
- Asset Allocation
- Diversification strategies
- Risk management
- Rebalancing

## Tools You'll Use

- Excel for financial modeling
- Python for data analysis
- Bloomberg Terminal basics
- Portfolio tracking tools

*Perfect for aspiring analysts, investors, and finance professionals!*`,
    totalDuration: "14h 20m",
    sections: [
      {
        id: "section-1",
        title: "1. Financial Statements",
        lectures: [
          { id: "lec-1", title: "Understanding Balance Sheets", type: "video", duration: 690, watchedDuration: 0, completed: false },
          { id: "lec-2", title: "Income Statement Analysis", type: "video", duration: 585, watchedDuration: 0, completed: false },
        ],
      },
      {
        id: "section-2",
        title: "2. Valuation Methods",
        lectures: [
          { id: "lec-3", title: "DCF Valuation", type: "video", duration: 920, watchedDuration: 0, completed: false },
          { id: "lec-4", title: "Comparable Analysis", type: "video", duration: 730, watchedDuration: 0, completed: false },
        ],
      },
    ],
  },
  {
    id: "9",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop",
    category: "Photography",
    title: "Professional Photography: From Beginner to Pro",
    rating: 4.8,
    totalRatings: 1350,
    totalStudents: 3800,
    creator: "Lisa Anderson",
    price: 800000,
    instructor: {
      name: "Lisa Anderson",
      avatar: "https://i.pravatar.cc/100?img=28",
      bio: "Award-winning photographer dengan klien dari National Geographic dan Vogue.",
    },
    description: `# Professional Photography Course

Transform your photography skills dari pemula hingga **professional photographer**.

## What You'll Master

### Camera Fundamentals
- Understanding exposure triangle
- Aperture, shutter speed, ISO
- Focus techniques
- White balance

### Composition Techniques
- Rule of thirds
- Leading lines
- Framing
- Symmetry and patterns

### Lighting Mastery
- Natural light photography
- Studio lighting setup
- Flash photography
- Light modifiers

### Post-Processing
- Adobe Lightroom
- Adobe Photoshop
- Color grading
- Retouching

## Photography Genres Covered

- **Portrait Photography**
- **Landscape Photography**
- **Street Photography**
- **Product Photography**
- **Wedding Photography**

## Build Your Portfolio

Complete 10 photography assignments to create a professional portfolio that attracts clients.`,
    totalDuration: "16h 45m",
    sections: [
      {
        id: "section-1",
        title: "1. Camera Basics",
        lectures: [
          { id: "lec-1", title: "Understanding Your Camera", type: "video", duration: 510, watchedDuration: 0, completed: false },
          { id: "lec-2", title: "Exposure Triangle Explained", type: "video", duration: 735, watchedDuration: 0, completed: false },
        ],
      },
      {
        id: "section-2",
        title: "2. Composition Rules",
        lectures: [
          { id: "lec-3", title: "Rule of Thirds", type: "video", duration: 465, watchedDuration: 0, completed: false },
          { id: "lec-4", title: "Leading Lines and Depth", type: "video", duration: 570, watchedDuration: 0, completed: false },
        ],
      },
    ],
  },
  {
    id: "10",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2670&auto=format&fit=crop",
    category: "Cybersecurity",
    title: "Ethical Hacking & Penetration Testing",
    rating: 4.9,
    totalRatings: 2100,
    totalStudents: 4500,
    creator: "Alex Thompson",
    price: 2500000,
    instructor: {
      name: "Alex Thompson",
      avatar: "https://i.pravatar.cc/100?img=63",
      bio: "Certified Ethical Hacker (CEH) dan security consultant untuk Fortune 500 companies.",
    },
    description: `# Ethical Hacking Complete Course

Become a **Certified Ethical Hacker** dan learn to protect systems from cyber threats.

## Comprehensive Training

### Reconnaissance & Footprinting
- Information gathering
- Network scanning
- Enumeration techniques
- Social engineering

### Vulnerability Analysis
- Vulnerability scanning
- Security auditing
- Exploit research
- Penetration testing methodology

### System Hacking
- Password cracking
- Privilege escalation
- Maintaining access
- Covering tracks

### Web Application Security
- SQL Injection
- Cross-Site Scripting (XSS)
- CSRF attacks
- Security misconfigurations

### Network Security
- Firewall testing
- IDS/IPS evasion
- VPN security
- Wireless network hacking

## Certification Prep

This course prepares you for:
- **CEH (Certified Ethical Hacker)**
- **OSCP (Offensive Security Certified Professional)**
- **CompTIA Security+**

## Lab Environment

Access to virtual lab with:
- Kali Linux
- Metasploit Framework
- Burp Suite
- Wireshark

⚠️ **Legal Notice**: All techniques taught are for legal, authorized testing only.`,
    totalDuration: "22h 30m",
    sections: [
      {
        id: "section-1",
        title: "1. Introduction to Ethical Hacking",
        lectures: [
          { id: "lec-1", title: "What is Ethical Hacking?", type: "video", duration: 345, watchedDuration: 0, completed: false },
          { id: "lec-2", title: "Legal and Ethical Considerations", type: "video", duration: 500, watchedDuration: 0, completed: false },
          { id: "lec-3", title: "Setting Up Kali Linux", type: "video", duration: 750, watchedDuration: 0, completed: false },
        ],
      },
      {
        id: "section-2",
        title: "2. Reconnaissance Techniques",
        lectures: [
          { id: "lec-4", title: "Passive Information Gathering", type: "video", duration: 615, watchedDuration: 0, completed: false },
          { id: "lec-5", title: "Active Scanning Methods", type: "video", duration: 880, watchedDuration: 0, completed: false },
        ],
      },
    ],
  },
];