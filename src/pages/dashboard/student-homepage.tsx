import { BookOpen, CheckCircle, Clock } from 'lucide-react'
import { useUser } from "@/utils/user-context.tsx"

export default function StudentHomepage() {
  const { user } = useUser()
  const name = user ? user.firstName : "Someone"

  // ✨ 10 random motivational messages
  const messages = [
    "Every small step counts—keep moving forward!",
    "Your potential is endless, don’t stop exploring.",
    "Learning never stops, and neither should you.",
    "Keep growing, even when no one’s watching.",
    "The journey of progress starts with curiosity.",
    "Every day is a new chance to level up.",
    "Stay hungry for knowledge, stay humble in growth.",
    "You’re one idea away from your next big breakthrough.",
    "Progress isn’t about speed—it’s about consistency.",
    "The best investment you can make is in yourself."
  ]

  const randomMessage = messages[Math.floor(Math.random() * messages.length)]

  return (
    <>
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-10">
        <div className="h-16 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4" />
        </div>
      </header>

      <main className="w-full">
        {/* 👋 Welcome Section */}
        <section className="mb-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {name}! 👋</h1>
          <p className="mt-1 text-gray-500">{randomMessage}</p>
        </section>

        {/* 📊 Stat Cards */}
        <section className="flex flex-wrap gap-6 mb-8 px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4 flex-[1_1_0%] min-w-[180px]">
            <div className="bg-blue-100 p-3 rounded-full">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Courses in Progress</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4 flex-[1_1_0%] min-w-[180px]">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed Courses</p>
              <p className="text-2xl font-bold text-gray-900">7</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4 flex-[1_1_0%] min-w-[180px]">
            <div className="bg-yellow-100 p-3 rounded-full">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Hours Learned</p>
              <p className="text-2xl font-bold text-gray-900">128</p>
            </div>
          </div>
        </section>

        {/* 📚 Continue Learning */}
        <section className="px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Continue Learning</h2>
          <div className="flex flex-col gap-6">
            {/* Course 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row items-center p-4 transition-shadow hover:shadow-lg w-full">
              <img
                className="h-24 w-full md:w-32 object-cover rounded-lg"
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop"
                alt="Web Development ExploreCourse"
              />
              <div className="flex-1 md:ml-5 mt-4 md:mt-0 w-full">
                <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                  Web Development
                </span>
                <h3 className="mt-2 text-md font-semibold text-gray-900">
                  Full-Stack Web Developer Bootcamp
                </h3>
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-gray-500">Progress</span>
                    <span className="text-xs font-semibold text-blue-600">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Course 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row items-center p-4 transition-shadow hover:shadow-lg w-full">
              <img
                className="h-24 w-full md:w-32 object-cover rounded-lg"
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
                alt="Data Science ExploreCourse"
              />
              <div className="flex-1 md:ml-5 mt-4 md:mt-0 w-full">
                <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  Data Science
                </span>
                <h3 className="mt-2 text-md font-semibold text-gray-900">
                  Data Science with Python
                </h3>
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-gray-500">Progress</span>
                    <span className="text-xs font-semibold text-green-600">40%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
