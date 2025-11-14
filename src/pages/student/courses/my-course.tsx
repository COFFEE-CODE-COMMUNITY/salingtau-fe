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
      icon: <BookOpen className="text-white w-5 h-5" />,
    },
    {
      title: "In Progress",
      value: total, // TODO: Add logic for in progress count
      color: "bg-green-50",
      iconColor: "bg-green-600",
      icon: <GraduationCap className="text-white w-5 h-5" />,
    },
    {
      title: "Completed",
      value: 0, // TODO: Add logic for completed count
      color: "bg-purple-50",
      iconColor: "bg-purple-600",
      icon: <GraduationCap className="text-white w-5 h-5" />,
    },
  ];

  return (
    <>
      {/* Header / Navbar seperti ExploreCourse */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 border-b">
        <div className="h-16 flex items-center justify-between px-6">
          <h2 className="text-xl font-semibold text-gray-900">My Courses</h2>
          <div className="flex items-center gap-2 ml-auto">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search my courses..."
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
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {stats.map((item, index) => (
            <div
              key={index}
              className={`${item.color} rounded-xl border border-gray-200 p-5 flex items-center gap-4`}
            >
              <div className={`${item.iconColor} p-3 rounded-lg`}>
                {item.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {item.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading your courses...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Courses Grid */}
        {!loading && !error && sortedCourses.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Continue Learning
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedCourses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => navigate(`/dashboard/student/course/play/${course.id}`)}
                  className="cursor-pointer"
                >
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && sortedCourses.length === 0 && (
          <div className="border border-gray-200 rounded-xl py-16 flex flex-col items-center justify-center text-center bg-white">
            <BookOpen className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              No Courses Yet
            </h3>
            <p className="text-gray-500 text-sm mb-6 max-w-md">
              You haven't enrolled in any courses yet. Start learning by exploring available courses.
            </p>
            <button
              onClick={() => navigate("/dashboard/student/explore")}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition"
            >
              <Search className="w-5 h-5" />
              Explore Courses
            </button>
          </div>
        )}
      </div>
    </>
  );
}
