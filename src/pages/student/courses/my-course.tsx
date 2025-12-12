import { BookOpen, GraduationCap, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { Combobox } from "@/components/ui/combobox.tsx";
import { SortByCourse } from "@/components/ui/sort-by-course.tsx";
import { CourseCard } from "@/components/ui/course-card.tsx";
import { useMyCourses } from "@/services/myCourse.ts";

export default function MyCourse() {
  const navigate = useNavigate();
  const { courses, loading, error, total } = useMyCourses();
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("ascending");

  // Sort courses based on selected criteria
  const sortedCourses = useMemo(() => {
    return [...courses].sort((a, b) => {
      let compareValue = 0;

      if (sortBy === "name") {
        compareValue = a.title.localeCompare(b.title);
      } else if (sortBy === "price") {
        compareValue = a.price - b.price;
      } else if (sortBy === "rating") {
        compareValue = a.averageRating - b.averageRating;
      }

      return sortOrder === "ascending" ? compareValue : -compareValue;
    });
  }, [courses, sortBy, sortOrder]);

  const handleSortChange = (newSortBy: string, newSortOrder: string) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const stats = [
    {
      title: "Total Courses",
      value: total,
      color: "bg-blue-50",
      iconColor: "bg-blue-600",
      icon: <BookOpen className="text-white w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
      title: "In Progress",
      value: total, // TODO: Add logic for in progress count
      color: "bg-green-50",
      iconColor: "bg-green-600",
      icon: <GraduationCap className="text-white w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
      title: "Completed",
      value: 0, // TODO: Add logic for completed count
      color: "bg-purple-50",
      iconColor: "bg-purple-600",
      icon: <GraduationCap className="text-white w-4 h-4 sm:w-5 sm:h-5" />,
    },
  ];

  return (
    <>
      {/* Header / Navbar - Responsif */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 border-b shadow-sm">
        <div className="min-h-[3.5rem] sm:h-16 flex flex-col sm:flex-row items-stretch sm:items-center justify-between px-4 sm:px-6 gap-3 py-3 sm:py-0">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 flex-shrink-0">My Courses</h2>
          
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
            
            {/* Filter Controls */}
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
        {/* Stats - Grid responsif dengan hover effect */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {stats.map((item, index) => (
            <div
              key={index}
              className={`${item.color} rounded-lg sm:rounded-xl border border-gray-200 p-4 sm:p-5 flex items-center gap-3 sm:gap-4 hover:shadow-md transition-all duration-200 active:scale-[0.98] cursor-default`}
            >
              <div className={`${item.iconColor} p-2.5 sm:p-3 rounded-lg shadow-sm flex-shrink-0`}>
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-700 truncate">
                  {item.title}
                </p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Loading State - dengan spinner animasi */}
        {loading && (
          <div className="text-center py-12 sm:py-16">
            <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600 mb-3 sm:mb-4"></div>
            <p className="text-sm sm:text-base text-gray-600">Loading your courses...</p>
          </div>
        )}

        {/* Error State - dengan icon */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg sm:rounded-xl p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-red-100 mb-3 sm:mb-4">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm sm:text-base text-red-600 font-medium">{error}</p>
          </div>
        )}

        {/* Courses Grid - Responsif */}
        {!loading && !error && sortedCourses.length > 0 && (
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              Continue Learning
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {sortedCourses.map((course) => (
                <CourseCard course={course} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State - Lebih visual dan interaktif */}
        {!loading && !error && sortedCourses.length === 0 && (
          <div className="border border-gray-200 rounded-lg sm:rounded-xl py-12 sm:py-16 px-4 flex flex-col items-center justify-center text-center bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-50 mb-4 sm:mb-5">
              <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">
              No Courses Yet
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-7 max-w-md px-2">
              You haven't enrolled in any courses yet. Start learning by exploring available courses.
            </p>
            <button
              onClick={() => navigate("/dashboard/student/explore")}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] touch-manipulation text-sm sm:text-base"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              Explore Courses
            </button>
          </div>
        )}
      </div>
    </>
  );
}