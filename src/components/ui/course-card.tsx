import { Link } from "react-router-dom";
import { StarRating } from "@/components/ui/star-rating.tsx";
import type { Course } from "@/services/exploreCourse.ts";

export type { Course };

function formatPrice(price: number): string {
  return price === 0
    ? "Free"
    : "Rp " + price.toLocaleString("id-ID")
}

function CategoryColor(categoryName: string): string {
  const colorMap: Record<string, string> = {
    "Technology": "text-blue-600 bg-blue-100",
    "Plantation": "text-green-600 bg-green-100",
    "Business": "text-yellow-600 bg-yellow-100",
    "Design": "text-pink-600 bg-pink-100",
    "Art": "text-purple-600 bg-purple-100",
    "Astronomy": "text-indigo-600 bg-indigo-100",
    "Health": "text-teal-600 bg-teal-100",
    "Science": "text-orange-600 bg-orange-100",
  };
  const color = colorMap[categoryName] || "text-gray-600 bg-gray-100";
  return `text-xs font-semibold ${color} px-2 py-1 rounded-full`;
}

export const CourseCard = ({ course }: { course: Course }) => {
  const instructorName = `${course.instructor.firstName} ${course.instructor.lastName}`;
  const categoryName = course.category?.name || "Uncategorized";
  
  return (
    <Link
      to={`/dashboard/student/course/${course.id}`}
      className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow transform hover:-translate-y-1"
    >
      <div className="relative">
        <img
          className="h-40 w-full object-cover"
          src={course.thumbnail?.url || "/placeholder-course.jpg"}
          alt={course.title}
        />
        {/* Price Badge */}
        <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow">
          {formatPrice(course.price)}
        </span>
      </div>

      <div className="p-5">
        <span className={CategoryColor(categoryName)}>
          {categoryName}
        </span>
        <h3 className="mt-3 text-lg font-semibold text-gray-900 truncate">
          {course.title}
        </h3>
        <p className="mt-1 text-sm text-gray-500">by {instructorName}</p>

        {/* Rating - Horizontal Layout */}
        <div className="flex items-center mt-3 gap-2">
          <StarRating
            initialRating={course.averageRating}
            readonly={true}
            size={16}
            showRatingText={true}
          />
          <span className="text-sm text-gray-500">
            ({course.totalReviews.toLocaleString()})
          </span>
        </div>
      </div>
    </Link>
  );
};
