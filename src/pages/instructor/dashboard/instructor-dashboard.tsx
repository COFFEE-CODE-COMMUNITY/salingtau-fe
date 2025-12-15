import { useUser } from "@/utils/user-context.tsx"
import { RevenueChart } from "@/components/ui/charts.tsx"
import { useEffect, useState } from 'react'
import api from '@/services/api'
import OverviewSection from '../dashboard/overview-section'
import RecentActivitySection from '../dashboard/recent-activity-section.tsx'

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

interface Course {
  id: string
  title: string
  slug: string
  price: number
  thumbnail?: {
    url: string
  }
  status: 'PUBLISHED' | 'DRAFT' | 'PENDING'
  enrollments: number
  revenue: number
  rating: number
  totalReviews: number
  lastUpdated: string
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

  // Dummy courses data
  const [courses, setCourses] = useState<Course[]>([

  ])

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
          processStatistics(transactionsData)
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
    const completedTransactions = transactionsData.filter(
      t => t.status === 'SUCCESS' || t.status === 'COMPLETED' || t.status === 'completed'
    )

    const totalRevenue = completedTransactions.reduce((sum, t) => sum + Number(t.amount), 0)
    const uniqueStudents = new Set(completedTransactions.map(t => t.user.id))
    const totalStudents = uniqueStudents.size
    const uniqueCourses = new Set(completedTransactions.map(t => t.course.id))
    const totalEnrollments = completedTransactions.length

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
      pendingCourses: 2,
      totalCourses: uniqueCourses.size + 2,
      averageRating: 4.7,
      ratingChange: 0.3,
      totalReviews: 542,
      totalEnrollments,
    })
  }

  const processRevenueChart = (transactionsData: Transaction[]) => {
    const completedTransactions = transactionsData.filter(
      t => t.status === 'SUCCESS' || t.status === 'COMPLETED' || t.status === 'completed'
    )

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
      revenue: Math.round(data.revenue / 1000),
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

  const handleDeleteCourse = (courseId: string) => {
    if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      setCourses(prevCourses => prevCourses.filter(course => course.id !== courseId))
    }
  }

  const handleEditCourse = (courseId: string) => {
    console.log('Edit course:', courseId)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Header tanpa logo tambahan, sesuai aslinya tapi dengan container agar rapi */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-30 border-b border-gray-200">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-gray-900">Dashboard</h2>
          <div className="flex items-center space-x-4" />
        </div>
      </header>

      {/* Main Content dengan vertical spacing yang konsisten */}
      <main className="min-h-screen bg-gray-50 pb-12">
        <div className="max-w-7xl mx-auto space-y-8 pt-8">
          
          {/* SECTION 1: OVERVIEW */}
          <div className="px-0"> {/* Wrapper untuk konsistensi layout */}
            <OverviewSection
              name={name}
              stats={stats}
              formatCurrency={formatCurrency}
            />
          </div>

          {/* SECTION 2: ANALYTICS CHARTS */}
          <section className="px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">Analytics Overview</h2>
                <p className="text-sm text-gray-500 mt-1">Track your performance and growth metrics</p>
              </div>

              <div className="w-full h-[400px]">
                <RevenueChart data={revenueData} />
              </div>
            </div>
          </section>

          {/* SECTION 3: RECENT ACTIVITY */}
          <div className="px-0">
             <RecentActivitySection
                transactions={transactions}
                courses={courses}
                formatCurrency={formatCurrency}
                onDeleteCourse={handleDeleteCourse}
                onEditCourse={handleEditCourse}
              />
          </div>

        </div>
      </main>
    </>
  )
}