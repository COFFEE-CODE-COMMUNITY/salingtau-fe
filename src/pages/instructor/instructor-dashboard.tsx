import { BookOpen, DollarSign, Star, Users } from 'lucide-react'
import { useUser } from "@/utils/user-context.tsx"

export default function InstructorDashboard() {
  const { user } = useUser()
  const name = user ? user.firstName : "Instructor"

  // ✨ 10 random motivational messages for instructors
  const messages = [
    "Your teaching creates endless ripples.",
    "Sharing knowledge is the best way to grow it.",
    "Great instructors inspire the future.",
    "Every question you answer builds a stronger community.",
    "Your courses are empowering hundreds.",
    "Keep creating, keep inspiring.",
    "The impact of a good teacher is immeasurable.",
    "You're not just teaching skills, you're changing lives.",
    "Your expertise is valuable. Thank you for sharing it.",
    "Every course you build is a new door for someone."
  ]

  const randomMessage = messages[Math.floor(Math.random() * messages.length)]

  return (
    <>
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-10">
        <div className="h-16 flex items-center justify-between px-6">
          <h2 className="text-xl font-semibold text-gray-900">Dashboard</h2>
          {/* A placeholder for potential right-side items like Profile */}
          <div className="flex items-center space-x-4" />
        </div>
      </header>

      <main className="w-full">
        {/* 👋 Welcome Section */}
        <section className="mb-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {name}! 👋</h1>
          <p className="mt-1 text-gray-500">{randomMessage}</p>
        </section>

        {/* 📊 Stat Cards (Instructor Version) */}
        <section className="flex flex-wrap gap-6 mb-8 px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4 flex-[1_1_0%] min-w-[180px]">
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">1,240</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4 flex-[1_1_0%] min-w-[180px]">
            <div className="bg-green-100 p-3 rounded-full">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Courses Published</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4 flex-[1_1_0%] min-w-[180px]">
            <div className="bg-yellow-100 p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">Rp 15.2M</p>
            </div>
          </div>
        </section>

        {/* 📚 My Courses Section */}
        <section className="px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">My Courses</h2>
          <div className="flex flex-col gap-6">
            {/* Course 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row items-center p-4 transition-shadow hover:shadow-lg w-full">
              <img
                className="h-24 w-full md:w-32 object-cover rounded-lg"
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop"
                alt="Web Development Course"
              />
              <div className="flex-1 md:ml-5 mt-4 md:mt-0 w-full">
                <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                  Web Development
                </span>
                <h3 className="mt-2 text-md font-semibold text-gray-900">
                  Full-Stack Web Developer Bootcamp
                </h3>
                {/* Stats for Instructor */}
                <div className="flex items-center gap-6 mt-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">450 Students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium text-gray-700">4.8 (120 Ratings)</span>
                  </div>
                </div>
              </div>
              {/* Manage Button */}
              <div className="md:ml-auto mt-4 md:mt-0">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
                  Manage
                </button>
              </div>
            </div>

            {/* Course 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row items-center p-4 transition-shadow hover:shadow-lg w-full">
              <img
                className="h-24 w-full md:w-32 object-cover rounded-lg"
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
                alt="Data Science Course"
              />
              <div className="flex-1 md:ml-5 mt-4 md:mt-0 w-full">
                <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  Data Science
                </span>
                <h3 className="mt-2 text-md font-semibold text-gray-900">
                  Data Science with Python
                </h3>
                {/* Stats for Instructor */}
                <div className="flex items-center gap-6 mt-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">790 Students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium text-gray-700">4.6 (210 Ratings)</span>
                  </div>
                </div>
              </div>
              {/* Manage Button */}
              <div className="md:ml-auto mt-4 md:mt-0">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
                  Manage
                </button>
              </div>
            </div>
            
          </div>
        </section>
      </main>
    </>
  )
}