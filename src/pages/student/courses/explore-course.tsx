import {useMemo, useState} from "react"
import {Search} from "lucide-react"
import {CourseCard} from "@/components/ui/course-card.tsx"
import {Combobox} from "@/components/ui/combobox.tsx"
import {SortByCourse} from "@/components/ui/sort-by-course.tsx"
import {useExploreCourses} from "@/services/exploreCourse.ts"

export default function ExploreCourse() {
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("ascending")

  const { courses, loading, error } = useExploreCourses()

  // Sort courses based on selected criteria
  const sortedCourses = useMemo(() => {
    return [...courses].sort((a, b) => {
      let compareValue = 0

      if (sortBy === "name") {
        compareValue = a.title.localeCompare(b.title)
      } else if (sortBy === "price") {
        compareValue = a.price - b.price
      } else if (sortBy === "rating") {
        compareValue = a.averageRating - b.averageRating
      }

      return sortOrder === "ascending" ? compareValue : -compareValue
    })
  }, [courses, sortBy, sortOrder])

  const handleSortChange = (newSortBy: string, newSortOrder: string) => {
    setSortBy(newSortBy)
    setSortOrder(newSortOrder)
  }

  return (
    <>
      {/* Header - Responsif untuk semua device */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 shadow-sm">
        <div className="min-h-[3.5rem] sm:h-16 flex flex-col sm:flex-row items-stretch sm:items-center justify-between px-4 sm:px-6 gap-3 py-3 sm:py-0">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 flex-shrink-0">All Courses</h2>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-2 sm:ml-auto w-full sm:w-auto">
            {/* Search Bar - Responsif */}
            <div className="relative w-full sm:w-auto sm:flex-shrink-0">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full sm:w-48 md:w-56 lg:w-64 pl-9 sm:pl-10 pr-4 py-2.5 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all touch-manipulation hover:border-gray-400"
              />
            </div>
            
            {/* Filter Controls - Stack di mobile */}
            <div className="flex items-stretch gap-2 w-full sm:w-auto">
              <div className="flex-1 sm:flex-initial min-w-0">
                <Combobox />
              </div>
              <div className="flex-1 sm:flex-initial min-w-0">
                <SortByCourse onSortChange={handleSortChange} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Body - Padding responsif */}
      <div className="p-4 sm:p-6 md:p-8">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
          Explore Courses
        </h3>
        
        {/* Error State - Responsif */}
        {error && (
          <div className="text-center py-8 sm:py-10 px-4">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-red-100 mb-3 sm:mb-4">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm sm:text-base text-red-600 font-medium">Error loading courses</p>
            <p className="text-xs sm:text-sm text-red-500 mt-1">{error}</p>
          </div>
        )}
        
        {/* Loading State - Animasi spinner */}
        {loading && (
          <div className="text-center py-12 sm:py-16">
            <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600 mb-3 sm:mb-4"></div>
            <p className="text-sm sm:text-base text-gray-600">Loading courses...</p>
          </div>
        )}
        
        {/* Courses Grid - Responsif dengan breakpoints lebih detail */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {sortedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
        
        {/* Empty State - Lebih visual */}
        {!loading && !error && sortedCourses.length === 0 && (
          <div className="text-center py-12 sm:py-16 px-4">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-100 mb-4">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">No courses available</h3>
            <p className="text-xs sm:text-sm text-gray-500">Try adjusting your filters or check back later.</p>
          </div>
        )}
      </div>
    </>
  )
}