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

  const randomMessage = messages[Math.floor(Math.random() * messages.length)]

  return (
    <section className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {name}! 👋</h1>
        <p className="mt-2 text-gray-600">{randomMessage}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-xl">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <span className="flex items-center gap-1 text-sm font-semibold text-green-600">
              <TrendingUp className="w-4 h-4" />
              {stats.revenueGrowth > 0 ? '+' : ''}{stats.revenueGrowth}%
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-900">
            {formatCurrency(stats.totalRevenue)}
          </p>
          <p className="text-xs text-gray-500 mt-2">From {stats.totalEnrollments} enrollments</p>
        </div>

        {/* Total Students */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <span className="flex items-center gap-1 text-sm font-semibold text-blue-600">
              <TrendingUp className="w-4 h-4" />
              {stats.studentGrowth > 0 ? '+' : ''}{stats.studentGrowth}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Students</p>
          <p className="text-3xl font-bold text-gray-900">{stats.totalStudents}</p>
          <p className="text-xs text-gray-500 mt-2">Across all courses</p>
        </div>

        {/* Published Courses */}
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-xl">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm font-semibold text-purple-600">
              {stats.pendingCourses} pending
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-1">Published Courses</p>
          <p className="text-3xl font-bold text-gray-900">{stats.publishedCourses}</p>
          <p className="text-xs text-gray-500 mt-2">Out of {stats.totalCourses} total</p>
        </div>

        {/* Average Rating */}
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-xl border border-amber-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-amber-100 p-3 rounded-xl">
              <Star className="w-6 h-6 text-amber-600" />
            </div>
            <span className="flex items-center gap-1 text-sm font-semibold text-amber-600">
              <TrendingUp className="w-4 h-4" />
              +{stats.ratingChange}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-1">Average Rating</p>
          <p className="text-3xl font-bold text-gray-900">{stats.averageRating}</p>
          <p className="text-xs text-gray-500 mt-2">From {stats.totalReviews} reviews</p>
        </div>
      </div>
    </section>
  )
}