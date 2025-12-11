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
    <section className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* Recent Transactions Section */}
        <div>
           <div className="mb-6">
             <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Recent Activity</h2>
             <p className="text-gray-600 mt-1 text-lg">Latest transactions and enrollments overview</p>
           </div>
           
           <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <RecentTransactionsChart transactions={transactions} />
           </div>
        </div>

        {/* My Courses Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 tracking-tight">My Courses</h3>
              <p className="text-gray-600 mt-1 text-lg">Manage and track your course performance</p>
            </div>
          </div>

          {courses.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900">No courses yet</h4>
              <p className="text-gray-500 mt-1">Start creating your first course to see it here!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full"
                >
                  {/* Course Thumbnail */}
                  <div className="relative h-52 bg-gray-100 overflow-hidden">
                    {course.thumbnail?.url ? (
                      <img
                        src={course.thumbnail.url}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
                        <BookOpen className="w-16 h-16 text-blue-300" />
                      </div>
                    )}

                    {/* Status Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border shadow-sm backdrop-blur-sm bg-opacity-90 ${getStatusBadge(course.status)}`}>
                        {course.status}
                      </span>
                    </div>

                    {/* Action Buttons (Visible on Hover) */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-10">
                      <button
                        onClick={() => onEditCourse(course.id)}
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-blue-50 hover:text-blue-600 text-gray-600 transition-colors"
                        title="Edit Course"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteCourse(course.id)}
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-red-50 hover:text-red-600 text-gray-600 transition-colors"
                        title="Delete Course"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* Overlay Gradient for Text Readability if needed */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>

                  {/* Course Info */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4 flex-grow">
                        <h4 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                        {course.title}
                        </h4>

                        <div className="flex items-center justify-between mt-3">
                            <span className="text-xl font-bold text-blue-600">
                                {formatCurrency(course.price)}
                            </span>
                            {course.rating > 0 && (
                                <div className="flex items-center gap-1.5 bg-amber-50 px-2 py-1 rounded-lg border border-amber-100">
                                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                <span className="font-bold text-gray-900 text-sm">{course.rating}</span>
                                <span className="text-xs text-gray-500">({course.totalReviews})</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Stats Grid */}
                    {course.status === 'PUBLISHED' ? (
                      <div className="grid grid-cols-2 gap-3 mb-5 pt-4 border-t border-gray-100">
                        <div className="bg-blue-50/50 rounded-xl p-3 border border-blue-100/50">
                          <div className="flex items-center gap-2 mb-1">
                            <Users className="w-3.5 h-3.5 text-blue-600" />
                            <span className="text-xs font-semibold text-blue-800 uppercase tracking-wide">Students</span>
                          </div>
                          <p className="text-lg font-bold text-gray-900">{course.enrollments}</p>
                        </div>
                        <div className="bg-green-50/50 rounded-xl p-3 border border-green-100/50">
                          <div className="flex items-center gap-2 mb-1">
                            <BarChart3 className="w-3.5 h-3.5 text-green-600" />
                            <span className="text-xs font-semibold text-green-800 uppercase tracking-wide">Revenue</span>
                          </div>
                          <p className="text-lg font-bold text-gray-900">
                            {formatCurrency(course.revenue).replace(/\D00$/, 'k').replace('Rp', '').trim()}k
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gray-50 rounded-xl p-4 mb-5 border border-gray-100">
                        <p className="text-sm font-medium text-gray-500 text-center flex items-center justify-center gap-2">
                           <Clock className="w-4 h-4" />
                           {course.status === 'DRAFT' ? 'Finish editing to publish' : 'Currently under review'}
                        </p>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between text-xs text-gray-400 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Updated {new Date(course.lastUpdated).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}