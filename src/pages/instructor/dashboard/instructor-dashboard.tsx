import { BookOpen, DollarSign, Star, Users, TrendingUp } from 'lucide-react'
import { useUser } from "@/utils/user-context.tsx"
import {
  RecentTransactionsChart,
  RevenueChart,
} from "@/components/ui/charts.tsx";

export default function InstructorDashboard() {
  const { user } = useUser()
  const name = user ? user.firstName : "Instructor"

  // ✨ 10 random motivational messages for instructors
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
    <>
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 border-b border-gray-200">
        <div className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-gray-900">Dashboard</h2>
          <div className="flex items-center space-x-4" />
        </div>
      </header>

      <main className="w-full bg-gray-50 min-h-screen">
        {/* ========================================
            SECTION 1: OVERVIEW
        ======================================== */}
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
                  +12%
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900">Rp 15.2M</p>
              <p className="text-xs text-gray-500 mt-2">From 1,240 enrollments</p>
            </div>

            {/* Total Students */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <span className="flex items-center gap-1 text-sm font-semibold text-blue-600">
                  <TrendingUp className="w-4 h-4" />
                  +124
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">Total Students</p>
              <p className="text-3xl font-bold text-gray-900">1,240</p>
              <p className="text-xs text-gray-500 mt-2">Across all courses</p>
            </div>

            {/* Published Courses */}
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-100 p-3 rounded-xl">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-sm font-semibold text-purple-600">
                  2 pending
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">Published Courses</p>
              <p className="text-3xl font-bold text-gray-900">8</p>
              <p className="text-xs text-gray-500 mt-2">Out of 11 total</p>
            </div>

            {/* Average Rating */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-xl border border-amber-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-amber-100 p-3 rounded-xl">
                  <Star className="w-6 h-6 text-amber-600" />
                </div>
                <span className="flex items-center gap-1 text-sm font-semibold text-amber-600">
                  <TrendingUp className="w-4 h-4" />
                  +0.3
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">Average Rating</p>
              <p className="text-3xl font-bold text-gray-900">4.7</p>
              <p className="text-xs text-gray-500 mt-2">From 542 reviews</p>
            </div>
          </div>
        </section>

        {/* ========================================
            SECTION 2: ANALYTICS CHARTS
        ======================================== */}
        <section className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Analytics Overview</h2>
            <p className="text-gray-600 mt-1">Track your performance and growth metrics</p>
          </div>

          {/* Revenue Chart - Full Width */}
          <div className="flex w-full">
            <RevenueChart />
          </div>
        </section>

        {/* ========================================
            SECTION 3: RECENT ACTIVITY
        ======================================== */}
        <section className="px-4 sm:px-6 lg:px-8 py-8 bg-white border-t border-gray-200">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
            <p className="text-gray-600 mt-1">Latest transactions and enrollments</p>
          </div>

          {/* Recent Transactions */}
          <div className="mb-8">
            <RecentTransactionsChart />
          </div>

          {/* My Courses Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">My Courses</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Course 1 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  className="h-48 w-full object-cover"
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop"
                  alt="Web Development Course"
                />
                <div className="p-5">
                  <span className="inline-block text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full mb-3">
                    Web Development
                  </span>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    Full-Stack Web Developer Bootcamp
                  </h4>
                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">450 Students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium text-gray-700">4.8 (120)</span>
                    </div>
                  </div>
                  <button className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
                    Manage Course
                  </button>
                </div>
              </div>

              {/* Course 2 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  className="h-48 w-full object-cover"
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
                  alt="Data Science Course"
                />
                <div className="p-5">
                  <span className="inline-block text-xs font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full mb-3">
                    Data Science
                  </span>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    Data Science with Python
                  </h4>
                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">790 Students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium text-gray-700">4.6 (210)</span>
                    </div>
                  </div>
                  <button className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
                    Manage Course
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}