import { BookOpen, Edit, Trash2, Clock, BarChart3, Star, Users } from 'lucide-react'
import { RecentTransactionsChart } from "@/components/ui/charts.tsx"

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

interface RecentActivitySectionProps {
  transactions: Transaction[]
  courses: Course[]
  formatCurrency: (amount: number) => string
  onDeleteCourse: (courseId: string) => void
  onEditCourse: (courseId: string) => void
}

export default function RecentActivitySection({
                                                transactions,
                                                courses,
                                                formatCurrency,
                                                onDeleteCourse,
                                                onEditCourse
                                              }: RecentActivitySectionProps) {

  const getStatusBadge = (status: string) => {
    const badges = {
      PUBLISHED: 'bg-green-100 text-green-800 border-green-200',
      DRAFT: 'bg-gray-100 text-gray-800 border-gray-200',
      PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    }
    return badges[status as keyof typeof badges] || badges.DRAFT
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-8 bg-white border-t border-gray-200">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
        <p className="text-gray-600 mt-1">Latest transactions and enrollments</p>
      </div>

      {/* Recent Transactions */}
      <div className="mb-8">
        <RecentTransactionsChart transactions={transactions} />
      </div>

      {/* My Courses Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">My Courses</h3>
            <p className="text-sm text-gray-600 mt-1">Manage and track your course performance</p>
          </div>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No courses yet. Start creating your first course!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group"
              >
                {/* Course Thumbnail */}
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  {course.thumbnail?.url ? (
                    <img
                      src={course.thumbnail.url}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
                      <BookOpen className="w-16 h-16 text-blue-400" />
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(course.status)}`}>
                      {course.status}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEditCourse(course.id)}
                      className="p-2 bg-white rounded-lg shadow-md hover:bg-blue-50 transition-colors"
                      title="Edit Course"
                    >
                      <Edit className="w-4 h-4 text-blue-600" />
                    </button>
                    <button
                      onClick={() => onDeleteCourse(course.id)}
                      className="p-2 bg-white rounded-lg shadow-md hover:bg-red-50 transition-colors"
                      title="Delete Course"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>

                {/* Course Info */}
                <div className="p-5">
                  <h4 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 min-h-[3.5rem]">
                    {course.title}
                  </h4>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-blue-600">
                      {formatCurrency(course.price)}
                    </span>
                    {course.rating > 0 && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="font-semibold text-gray-900">{course.rating}</span>
                        <span className="text-sm text-gray-500">({course.totalReviews})</span>
                      </div>
                    )}
                  </div>

                  {/* Stats */}
                  {course.status === 'PUBLISHED' ? (
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Users className="w-4 h-4 text-blue-600" />
                          <span className="text-xs font-medium text-gray-600">Students</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900">{course.enrollments}</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <BarChart3 className="w-4 h-4 text-green-600" />
                          <span className="text-xs font-medium text-gray-600">Revenue</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900">
                          {formatCurrency(course.revenue).replace(/\D00$/, 'k').replace('Rp', '').trim()}k
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <p className="text-sm text-gray-600 text-center">
                        {course.status === 'DRAFT' ? 'Complete your course to publish' : 'Waiting for review'}
                      </p>
                    </div>
                  )}

                  {/* Last Updated */}
                  <div className="flex items-center gap-2 text-xs text-gray-500 pt-3 border-t border-gray-100">
                    <Clock className="w-3 h-3" />
                    <span>Updated {new Date(course.lastUpdated).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}