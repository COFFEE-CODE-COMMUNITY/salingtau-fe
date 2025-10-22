import { Search } from "lucide-react";
import { CourseCard, Course } from "../components/CourseCard.tsx";

const coursesData: Course[] = [
  {
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    category: "Data Science",
    title: "Data Science with Python",
    rating: 4.8,
    totalRatings: 1200,
    creator: "Jane Smith",
    price: "Free",
  },
  {
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2574&auto=format&fit=crop",
    category: "Marketing",
    title: "The Ultimate Digital Marketing Guide",
    rating: 4.6,
    totalRatings: 980,
    creator: "Emily White",
    price: "Rp 199.000",
  },
  {
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2670&auto=format&fit=crop",
    category: "Web Development",
    title: "Full-Stack Web Developer Bootcamp",
    rating: 4.9,
    totalRatings: 2000,
    creator: "John Doe",
    price: "Rp 3.000.000",
  },
  {
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2670&auto=format&fit=crop",
    category: "Mobile Development",
    title: "Full-Stack Mobile Developer Bootcamp",
    rating: 4.7,
    totalRatings: 2100,
    creator: "John Doe",
    price: "Rp 3.000.000",
  },
];

export default function Courses() {
  return (
    <>
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b z-10">
        <div className="h-16 flex items-center justify-between px-6">
          <h2 className="text-xl font-semibold text-gray-900">All Courses</h2>
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-64 pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="p-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Explore Courses
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {coursesData.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
