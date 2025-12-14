import { X, Trash2, Users, Star, DollarSign, Calendar, TrendingUp } from 'lucide-react'

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

interface CourseDetailModalProps {
  course: Course | null
  isOpen: boolean
  onClose: () => void
  onEdit: (courseId: string) => void
  onDelete: (courseId: string) => void
  formatCurrency: (amount: number) => string
}

export default function CourseDetailModal({
  course,
  isOpen,
  onClose,
  onDelete,
  formatCurrency
}: CourseDetailModalProps) {
  if (!isOpen || !course) return null

  const getStatusBadge = (status: 'PUBLISHED' | 'DRAFT' | 'PENDING') => {
    const statusConfig: Record<'PUBLISHED' | 'DRAFT' | 'PENDING', { bg: string; text: string; label: string }> = {
      PUBLISHED: { bg: 'bg-green-100', text: 'text-green-800', label: 'Published' },
      DRAFT: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Draft' },
      PENDING: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending Review' }
    }
    const config = statusConfig[status]
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${course.title}"? This action cannot be undone.`)) {
      onDelete(course.id)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          
          {/* Header with Image */}
          <div className="relative h-64 bg-gradient-to-br from-blue-500 to-purple-600">
            {course.thumbnail?.url ? (
              <img 
                src={course.thumbnail.url} 
                alt={course.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-white text-6xl font-bold opacity-20">
                  {course.title.charAt(0)}
                </div>
              </div>
            )}
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            {/* Status badge */}
            <div className="absolute top-4 left-4">
              {getStatusBadge(course.status)}
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-16rem)]">
            <div className="p-8">
              
              {/* Title */}
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {course.title}
                </h2>
                <p className="text-sm text-gray-500">
                  Slug: <span className="font-mono text-gray-700">{course.slug}</span>
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-600">Price</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900">
                    {formatCurrency(course.price)}
                  </p>
                </div>

                <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-gray-600">Enrollments</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900">
                    {course.enrollments.toLocaleString()}
                  </p>
                </div>

                <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium text-gray-600">Revenue</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900">
                    {formatCurrency(course.revenue)}
                  </p>
                </div>

                <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm font-medium text-gray-600">Rating</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <p className="text-xl font-bold text-gray-900">
                      {course.rating > 0 ? course.rating.toFixed(1) : '-'}
                    </p>
                    <span className="text-sm text-gray-500">
                      ({course.totalReviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Last Updated</p>
                      <p className="text-base text-gray-900">{formatDate(course.lastUpdated)}</p>
                    </div>
                  </div>
                  
                  {course.status === 'PUBLISHED' && course.enrollments > 0 && (
                    <div className="pt-3 border-t border-gray-200">
                      <p className="text-sm text-gray-600">
                        Average revenue per student: <span className="font-semibold text-gray-900">
                          {formatCurrency(course.revenue / course.enrollments)}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Delete Button */}
              <button
                onClick={handleDelete}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors shadow-sm"
              >
                <Trash2 className="w-5 h-5" />
                Delete Course
              </button>

              {/* Warning for non-published courses */}
              {course.status !== 'PUBLISHED' && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <span className="font-semibold">Note:</span> This course is not published yet. 
                    {course.status === 'DRAFT' && ' Complete the course content and publish it to make it available to students.'}
                    {course.status === 'PENDING' && ' Your course is under review and will be published once approved.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}