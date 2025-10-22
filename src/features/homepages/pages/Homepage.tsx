import { Bell, BookOpen, CheckCircle, Clock } from 'lucide-react';
import {Link} from "react-router-dom";

export default function Homepage() {
  return (
    <>
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-10">
        <div className="h-16 flex items-center justify-between px-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Dashboard</h2>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/notification"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-500" />
            </Link>
          </div>
        </div>
      </header>

      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Selamat Datang Kembali, Andi! 👋</h1>
          <p className="mt-1 text-gray-500">Selalu ada hal baru untuk dipelajari. Teruslah berkembang!</p>
        </div>

        <div className="flex flex-wrap gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4 flex-1 min-w-[250px]">
            <div className="bg-blue-100 p-3 rounded-full">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Courses in Progress</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4 flex-1 min-w-[250px]">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed Courses</p>
              <p className="text-2xl font-bold text-gray-900">7</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4 flex-1 min-w-[250px]">
            <div className="bg-yellow-100 p-3 rounded-full">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Hours Learned</p>
              <p className="text-2xl font-bold text-gray-900">128</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Continue Learning</h2>
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-md overflow-hidden flex items-center p-4 transition-shadow hover:shadow-lg">
                <img
                  className="h-24 w-32 object-cover rounded-lg"
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop"
                  alt="Web Development Course"
                />
                <div className="flex-1 ml-5">
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
              <div className="bg-white rounded-xl shadow-md overflow-hidden flex items-center p-4 transition-shadow hover:shadow-lg">
                <img
                  className="h-24 w-32 object-cover rounded-lg"
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
                  alt="Data Science Course"
                />
                <div className="flex-1 ml-5">
                  <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    Data Science
                  </span>
                  <h3 className="mt-2 text-md font-semibold text-gray-900">Data Science with Python</h3>
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
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Schedule</h2>
            <div className="space-y-5">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 text-center bg-red-100 rounded-lg p-2 w-16">
                  <p className="text-red-600 font-bold text-lg">15</p>
                  <p className="text-red-500 text-xs">OCT</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Live Session: AI & ML Trends</p>
                  <p className="text-sm text-gray-500">10:00 - 11:00 WIB</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 text-center bg-blue-100 rounded-lg p-2 w-16">
                  <p className="text-blue-600 font-bold text-lg">21</p>
                  <p className="text-blue-500 text-xs">OCT</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Project Deadline: Web Bootcamp</p>
                  <p className="text-sm text-gray-500">Due at 23:59 WIB</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 text-center bg-purple-100 rounded-lg p-2 w-16">
                  <p className="text-purple-600 font-bold text-lg">28</p>
                  <p className="text-purple-500 text-xs">OCT</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Webinar: Digital Marketing 2025</p>
                  <p className="text-sm text-gray-500">19:00 - 20:30 WIB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
