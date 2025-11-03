import React, {useMemo, useState} from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import {Search} from "lucide-react"
import {CourseCard} from "@/components/ui/course-card.tsx"
import {coursesData} from "@/utils/course-data.ts"
import {Combobox} from "@/components/ui/combobox.tsx"
import {SortByCourse} from "@/components/ui/sort-by-course.tsx"

const PAGE_SIZE = 9

export default function MyCourse() {
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("ascending")

  // Sort courses based on selected criteria
  const sortedCourses = useMemo(() => {
    return [...coursesData].sort((a, b) => {
      let compareValue = 0

      if (sortBy === "name") {
        compareValue = a.title.localeCompare(b.title)
      } else if (sortBy === "price") {
        compareValue = a.price - b.price
      } else if (sortBy === "rating") {
        compareValue = a.rating - b.rating
      }

      return sortOrder === "ascending" ? compareValue : -compareValue
    })
  }, [sortBy, sortOrder])

  const [displayed, setDisplayed] = useState(
    sortedCourses.slice(0, PAGE_SIZE)
  )
  const [hasMore, setHasMore] = useState(sortedCourses.length > PAGE_SIZE)

  // Reset displayed courses when sort changes
  React.useEffect(() => {
    setDisplayed(sortedCourses.slice(0, PAGE_SIZE))
    setHasMore(sortedCourses.length > PAGE_SIZE)
  }, [sortedCourses])

  // Fetch next chunk of data (3x3 card)
  const fetchMoreData = () => {
    setTimeout(() => {
      const next = sortedCourses.slice(
        displayed.length,
        displayed.length + PAGE_SIZE
      )
      setDisplayed((prev) => [...prev, ...next])
      if (displayed.length + PAGE_SIZE >= sortedCourses.length) {
        setHasMore(false)
      }
    }, 600)
  }

  const handleSortChange = (newSortBy: string, newSortOrder: string) => {
    setSortBy(newSortBy)
    setSortOrder(newSortOrder)
  }

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-10">
        <div className="h-16 flex items-center justify-between px-6">
          <h2 className="text-xl font-semibold text-gray-900">My Courses</h2>
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
          My Courses
        </h3>
        {/* Infinite Scroll Area */}
        <InfiniteScroll
          dataLength={displayed.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<p className="text-center py-4">Loading...</p>}
          endMessage={
            <p className="text-center py-6 text-gray-500">
              Semua course sudah ditampilkan.
            </p>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayed.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </>
  )
}