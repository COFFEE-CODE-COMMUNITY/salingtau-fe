import { useUser } from "@/utils/user-context.tsx"
import { RevenueChart } from "@/components/ui/charts.tsx"
import { useEffect, useState, useRef } from 'react'
import api from '@/services/api'
import OverviewSection from './overview-section.tsx'
import RecentActivitySection from './recent-activity-section.tsx'

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
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingCourseId, setDeletingCourseId] = useState<string | null>(null)
  const hasLoadedRef = useRef(false)

  useEffect(() => {
    // Only fetch once on mount
    if (hasLoadedRef.current) return
    
    const fetchDashboardData = async () => {
      if (!user?.id) return

      try {
        setLoading(true)
        setError(null)

        // Fetch transactions
        try {
          const transactionsResponse = await api.get(`/transaction/instructor/${user.id}/history`)
          if (transactionsResponse.status === 200 && transactionsResponse.data) {
            const transactionsData: Transaction[] = transactionsResponse.data
            setTransactions(transactionsData)
            processStatistics(transactionsData)
            processRevenueChart(transactionsData)
          }
        } catch (transErr) {
          console.error('Error fetching transactions:', transErr)
        }

        // Fetch courses from backend
        try {
          const coursesResponse = await api.get('/courses/instructor')
          if (coursesResponse.status === 200 && coursesResponse.data) {
            const coursesData = Array.isArray(coursesResponse.data) 
              ? coursesResponse.data 
              : (coursesResponse.data.data || [])
            setCourses(coursesData)
          }
        } catch (courseErr: any) {
          console.error('Error fetching courses:', courseErr)
          if (courseErr.response?.status === 401) {
            setError('Session expired. Please login again.')
          }
          setCourses([])
        }

      } catch (err: any) {
        console.error('Error fetching dashboard data:', err)
        if (err.response?.status === 401) {
          setError('Session expired. Please login again.')
        } else {
          setError('Failed to load dashboard data')
        }
        setCourses([])
      } finally {
        setLoading(false)
        hasLoadedRef.current = true
      }
    }

    fetchDashboardData()
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

  const handleDeleteCourse = async (courseId: string) => {
    const course = courses.find(c => c.id === courseId)
    if (!course) return

    if (window.confirm(`Are you sure you want to delete "${course.title}"? This action cannot be undone.`)) {
      setDeletingCourseId(courseId)
      
      try {
        console.log('=== DELETE COURSE DEBUG ===')
        console.log('Course ID:', courseId)
        console.log('Course title:', course.title)
        console.log('Sending DELETE request to:', `/courses/${courseId}/instructor`)
        
        const response = await api.delete(`/courses/${courseId}/instructor`)
        
        console.log('DELETE Response Status:', response.status)
        console.log('DELETE Response Data:', response.data)
        
        if (response.status === 200 || response.status === 204) {
          console.log('✅ Delete successful')
          
          // Update local state immediately
          setCourses(prevCourses => {
            const filtered = prevCourses.filter(c => c.id !== courseId)
            console.log('Courses before delete:', prevCourses.length)
            console.log('Courses after delete:', filtered.length)
            return filtered
          })
          
          // Show success message
          const successDiv = document.createElement('div')
          successDiv.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in'
          successDiv.innerHTML = '<span class="flex items-center gap-2"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg> Course deleted successfully!</span>'
          document.body.appendChild(successDiv)
          setTimeout(() => {
            successDiv.style.opacity = '0'
            successDiv.style.transform = 'translateY(-10px)'
            successDiv.style.transition = 'all 0.3s ease-out'
            setTimeout(() => successDiv.remove(), 300)
          }, 2700)
          
        } else {
          throw new Error('Unexpected status code: ' + response.status)
        }
      } catch (err: any) {
        console.error('❌ Error deleting course')
        console.error('Error object:', err)
        console.error('Error response status:', err.response?.status)
        console.error('Error response data:', err.response?.data)
        
        let errorMessage = 'Failed to delete course. Please try again.'
        
        if (err.response?.status === 500) {
          errorMessage = err.response?.data?.message || 
            'Server error: Unable to delete course. The course might have active enrollments or dependencies.'
        } else if (err.response?.status === 403) {
          errorMessage = 'You do not have permission to delete this course.'
        } else if (err.response?.status === 404) {
          errorMessage = 'Course not found.'
        } else if (err.response?.data?.message) {
          errorMessage = err.response.data.message
        }
        
        console.error('Final error message:', errorMessage)
        
        // Show error message
        const errorDiv = document.createElement('div')
        errorDiv.className = 'fixed top-20 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in max-w-md'
        errorDiv.innerHTML = `<span class="flex items-center gap-2"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg> ${errorMessage}</span>`
        document.body.appendChild(errorDiv)
        setTimeout(() => {
          errorDiv.style.opacity = '0'
          errorDiv.style.transform = 'translateY(-10px)'
          errorDiv.style.transition = 'all 0.3s ease-out'
          setTimeout(() => errorDiv.remove(), 300)
        }, 4700)
      } finally {
        setDeletingCourseId(null)
      }
    }
  }

  const handleEditCourse = (courseId: string) => {
    console.log('=== EDIT COURSE ===')
    console.log('Course ID:', courseId)
    window.location.href = `/instructor/courses/${courseId}/edit`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto w-full">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-4">
            <p className="text-red-600 font-semibold mb-2">{error}</p>
            {error.includes('Session expired') || error.includes('login') ? (
              <p className="text-sm text-red-500">Your session has expired. Please log in again to continue.</p>
            ) : (
              <p className="text-sm text-red-500">Unable to load dashboard data. Please try again.</p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {error.includes('Session expired') || error.includes('login') ? (
              <button
                onClick={() => window.location.href = '/login'}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm active:scale-95"
              >
                Go to Login
              </button>
            ) : (
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm active:scale-95"
              >
                Retry
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Header - Sticky on mobile */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md z-30 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto h-14 sm:h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Dashboard</h2>
          <div className="flex items-center space-x-4" />
        </div>
      </header>

      {/* Main Content - Mobile Optimized */}
      <main className="min-h-screen bg-gray-50 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 pt-4 sm:pt-8">
          
          {/* SECTION 1: OVERVIEW */}
          <div className="px-0">
            <OverviewSection
              name={name}
              stats={stats}
              formatCurrency={formatCurrency}
            />
          </div>

          {/* SECTION 2: ANALYTICS CHARTS */}
          <section className="px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Analytics Overview</h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">Track your performance and growth metrics</p>
              </div>

              <div className="w-full h-[300px] sm:h-[400px]">
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
                deletingCourseId={deletingCourseId}
              />
          </div>

        </div>
      </main>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  )
}