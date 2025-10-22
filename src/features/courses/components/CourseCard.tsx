import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import CategoryColor from "../../../globals/components/CategoryColor.tsx";

export type Course = {
  image: string,
  category: string,
  title: string,
  rating: number,
  totalRatings: number,
  creator: string,
  price: string,
}

export const CourseCard = ({course}:{course: Course}) => {
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
          {course.price}
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
