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
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-10">
        <div className="h-16 flex items-center justify-between px-6">
          <h2 className="text-xl font-semibold text-gray-900">All Courses</h2>
          <div className="flex items-center gap-2 ml-auto">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search anything..."
                className="w-64 pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
            <Combobox />
            <SortByCourse onSortChange={handleSortChange} />
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Explore Courses
        </h3>
        
        {/* Error State */}
        {error && (
          <div className="text-center py-6 text-red-500">
            Error: {error}
          </div>
        )}
        
        {/* Loading State */}
        {loading && (
          <div className="text-center py-6">
            <p>Loading courses...</p>
          </div>
        )}
        
        {/* Courses Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
        
        {/* Empty State */}
        {!loading && !error && sortedCourses.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No courses available.
          </div>
        )}
      </div>
    </>
  )
}