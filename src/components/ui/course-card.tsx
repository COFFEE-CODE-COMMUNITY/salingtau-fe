import { Link } from "react-router-dom";
import { Star } from "lucide-react";

export type Course = {
  image: string,
  category: string,
  title: string,
  rating: number,
  totalRatings: number,
  creator: string,
  price: number,
}

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
  return (
    <Link
      to="/courses/player"
      className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow transform hover:-translate-y-1"
    >
      <div className="relative">
        <img
          className="h-40 w-full object-cover"
          src={course.image}
          alt={course.title}
        />
        {/* Price Badge */}
        <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow">
          {formatPrice(course.price)}
        </span>
      </div>

      <div className="p-5">
        <span className={CategoryColor(course.category)}>
          {course.category}
        </span>
        <h3 className="mt-3 text-lg font-semibold text-gray-900 truncate">
          {course.title}
        </h3>
        <p className="mt-1 text-sm text-gray-500">by {course.creator}</p>

        {/* Rating */}
        <div className="flex items-center mt-3 space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.round(course.rating)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">
            {course.rating} ({course.totalRatings})
          </span>
        </div>
      </div>
    </Link>
  );
};
