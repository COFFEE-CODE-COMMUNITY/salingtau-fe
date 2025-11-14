import { BookOpen, DollarSign, Star, Users, TrendingUp } from 'lucide-react'
import { useUser } from "@/utils/user-context.tsx"
import {
  RecentTransactionsChart,
  RevenueChart,
} from "@/components/ui/charts.tsx"
import { useEffect, useState } from 'react'
import api from '@/services/api'

interface Transaction {
  id: string
  amount: number
  currency: string
  paymentGateway: string
  transactionId?: string
  status: string
  paymentDetails?: Record<string, any>
  createdAt: string
  updatedAt: string
  user: {
    id: string
    firstName: string
    lastName: string
    email: string
  }
  course: {
    id: string
    title: string
    slug: string
    price: number
    thumbnail?: {
      url: string
    }
  }
}

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

interface RevenueChartData {
  month: string
  revenue: number
  students: number
}

export default function InstructorDashboard() {
  const { user } = useUser()
  const name = user ? user.firstName : "Instructor"

  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    revenueGrowth: 0,
    totalStudents: 0,
    studentGrowth: 0,
    publishedCourses: 0,
    pendingCourses: 0,
    totalCourses: 0,
    averageRating: 0,
    ratingChange: 0,
    totalReviews: 0,
    totalEnrollments: 0,
  })
  const [revenueData, setRevenueData] = useState<RevenueChartData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      if (!user?.id) return

      try {
        setLoading(true)
        setError(null)

        const response = await api.get(`/transaction/instructor/${user.id}/history`)

        if (response.status === 200 && response.data) {
          const transactionsData: Transaction[] = response.data
          setTransactions(transactionsData)

          // Process data untuk statistics
          processStatistics(transactionsData)

          // Process data untuk revenue chart
          processRevenueChart(transactionsData)
        } else {
          throw new Error('Failed to fetch transaction history')
        }
      } catch (err) {
        console.error('Error fetching transaction history:', err)
        setError('Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    fetchTransactionHistory()
  }, [user?.id])

  const processStatistics = (transactionsData: Transaction[]) => {
    // Filter hanya transaksi yang sukses
    const completedTransactions = transactionsData.filter(
      t => t.status === 'SUCCESS' || t.status === 'COMPLETED' || t.status === 'completed'
    )

    // Total Revenue (dalam Rupiah, asumsi currency IDR)
    const totalRevenue = completedTransactions.reduce((sum, t) => sum + Number(t.amount), 0)

    // Unique students
    const uniqueStudents = new Set(completedTransactions.map(t => t.user.id))
    const totalStudents = uniqueStudents.size

    // Unique courses
    const uniqueCourses = new Set(completedTransactions.map(t => t.course.id))
    const totalEnrollments = completedTransactions.length

    // Calculate growth (compare last 30 days vs previous 30 days)
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000)

    const recentTransactions = completedTransactions.filter(
      t => new Date(t.createdAt) >= thirtyDaysAgo
    )
    const previousTransactions = completedTransactions.filter(
      t => new Date(t.createdAt) >= sixtyDaysAgo && new Date(t.createdAt) < thirtyDaysAgo
    )

    const recentRevenue = recentTransactions.reduce((sum, t) => sum + Number(t.amount), 0)
    const previousRevenue = previousTransactions.reduce((sum, t) => sum + Number(t.amount), 0)

    const revenueGrowth = previousRevenue > 0
      ? ((recentRevenue - previousRevenue) / previousRevenue) * 100
      : 0

    const recentStudents = new Set(recentTransactions.map(t => t.user.id)).size
    const previousStudents = new Set(previousTransactions.map(t => t.user.id)).size
    const studentGrowth = recentStudents - previousStudents

    setStats({
      totalRevenue,
      revenueGrowth: Math.round(revenueGrowth),
      totalStudents,
      studentGrowth,
      publishedCourses: uniqueCourses.size,
      pendingCourses: 2, // Placeholder, bisa diganti dengan data real
      totalCourses: uniqueCourses.size + 2,
      averageRating: 4.7, // Placeholder, perlu endpoint terpisah untuk reviews
      ratingChange: 0.3,
      totalReviews: 542, // Placeholder
      totalEnrollments,
    })
  }

  const processRevenueChart = (transactionsData: Transaction[]) => {
    const completedTransactions = transactionsData.filter(
      t => t.status === 'SUCCESS' || t.status === 'COMPLETED' || t.status === 'completed'
    )

    // Group by month (last 6 months)
    const monthlyData: { [key: string]: { revenue: number; students: Set<string> } } = {}

    const now = new Date()
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const monthKey = date.toLocaleString('en-US', { month: 'short' })
      monthlyData[monthKey] = { revenue: 0, students: new Set() }
    }

    completedTransactions.forEach(transaction => {
      const date = new Date(transaction.createdAt)
      const monthKey = date.toLocaleString('en-US', { month: 'short' })

      if (monthlyData[monthKey]) {
        monthlyData[monthKey].revenue += Number(transaction.amount)
        monthlyData[monthKey].students.add(transaction.user.id)
      }
    })

    const chartData = Object.entries(monthlyData).map(([month, data]) => ({
      month,
      revenue: Math.round(data.revenue / 1000), // Konversi ke ribuan
      students: data.students.size,
    }))

    setRevenueData(chartData)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

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
            <RevenueChart data={revenueData} />
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
            <RecentTransactionsChart transactions={transactions} />
          </div>

          {/* My Courses Section - Placeholder */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">My Courses</h3>
            {stats.publishedCourses === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No courses yet. Start creating your first course!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Course cards will be populated from separate API endpoint */}
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 text-center">
                  <p className="text-gray-600">Course data will be loaded from courses endpoint</p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  )
}