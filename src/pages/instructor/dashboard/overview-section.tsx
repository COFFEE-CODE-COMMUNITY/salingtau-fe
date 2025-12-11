import { BookOpen, DollarSign, Star, Users, TrendingUp } from 'lucide-react'

interface DashboardStats {
  totalRevenue: number
  revenueGrowth: number
  totalStudents: number
  studentGrowth: number
  publishedCourses: number
  pendingCourses: number
  totalCourses: number
  averageRating: number
  ratingChange: number
  totalReviews: number
  totalEnrollments: number
}

interface OverviewSectionProps {
  name: string
  stats: DashboardStats
  formatCurrency: (amount: number) => string
}

export default function OverviewSection({ name, stats, formatCurrency }: OverviewSectionProps) {
  // Motivational messages
  const messages = [
    "Your teaching creates endless ripples.",
    "Sharing knowledge is the best way to grow it.",
    "Great instructors inspire the future.",
    "Every question you answer builds a stronger community.",
    "Your courses are empowering hundreds.",
    "Keep creating, keep inspiring.",
    "The impact of a good teacher is immeasurable.",
    "You're not just teaching skills, you're changing lives.",
    "Your expertise is valuable. Thank you for sharing it.",
    "Every course you build is a new door for someone."
  ]

  // Note: In a real app, you might want to stabilize this with useMemo or useEffect to prevent flickering on re-renders
  // For now, keeping logic as requested.
  const randomMessage = messages[Math.floor(Math.random() * messages.length)]

  return (
    <section className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome back, {name}! 👋</h1>
          <p className="mt-2 text-gray-600 text-lg">{randomMessage}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Total Revenue */}
          <div className="group bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-xl group-hover:bg-green-200 transition-colors duration-300">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <span className="flex items-center gap-1 text-sm font-bold text-green-600 bg-green-100/50 px-2 py-1 rounded-full">
                <TrendingUp className="w-3 h-3" />
                {stats.revenueGrowth > 0 ? '+' : ''}{stats.revenueGrowth}%
              </span>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">Total Revenue</p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight truncate">
              {formatCurrency(stats.totalRevenue)}
            </p>
            <p className="text-xs text-gray-500 mt-2 font-medium">From {stats.totalEnrollments} enrollments</p>
          </div>

          {/* Total Students */}
          <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-xl group-hover:bg-blue-200 transition-colors duration-300">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="flex items-center gap-1 text-sm font-bold text-blue-600 bg-blue-100/50 px-2 py-1 rounded-full">
                <TrendingUp className="w-3 h-3" />
                {stats.studentGrowth > 0 ? '+' : ''}{stats.studentGrowth}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">Total Students</p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">{stats.totalStudents}</p>
            <p className="text-xs text-gray-500 mt-2 font-medium">Across all courses</p>
          </div>

          {/* Published Courses */}
          <div className="group bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-2xl border border-purple-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-xl group-hover:bg-purple-200 transition-colors duration-300">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-xs font-bold text-purple-600 bg-purple-100/50 px-2 py-1 rounded-full">
                {stats.pendingCourses} pending
              </span>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">Published Courses</p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">{stats.publishedCourses}</p>
            <p className="text-xs text-gray-500 mt-2 font-medium">Out of {stats.totalCourses} total</p>
          </div>

          {/* Average Rating */}
          <div className="group bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-2xl border border-amber-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-amber-100 p-3 rounded-xl group-hover:bg-amber-200 transition-colors duration-300">
                <Star className="w-6 h-6 text-amber-600" />
              </div>
              <span className="flex items-center gap-1 text-sm font-bold text-amber-600 bg-amber-100/50 px-2 py-1 rounded-full">
                <TrendingUp className="w-3 h-3" />
                +{stats.ratingChange}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">Average Rating</p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">{stats.averageRating}</p>
            <p className="text-xs text-gray-500 mt-2 font-medium">From {stats.totalReviews} reviews</p>
          </div>
          
        </div>
      </div>
    </section>
  )
}