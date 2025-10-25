import {Pencil, Plus, Trash2, Video} from "lucide-react";
import {Link} from "react-router-dom";

export default function Dashboard() {
  // Data dummy dulu
  const courses = [
    {
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop",
      title: "Full-Stack Web Developer Bootcamp",
      free: true,
    },
    {
      image:
        "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=2670&auto=format&fit=crop",
      title: "Advanced React & Redux",
      free: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="h-16 bg-white flex items-center justify-between px-6 border-b">
        {/* Judul */}
        <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <Link
            to="/dashboard/go-live"
            className="flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
          >
            <Video className="w-5 h-5 mr-2" />
            Go Live
          </Link>
          <Link
            to="/dashboard/create-course"
            className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Course
          </Link>
        </div>
      </header>

      {/* Body */}
      <main className="max-w-8xl mx-auto px-8 py-4">
        <div className="mt-2 space-y-8">
          {/* Ringkasan Pendapatan */}
          <div className="bg-white rounded-xl shadow-md border p-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">
                Summary
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 text-center">
              <div>
                <p className="text-sm text-gray-500">Income Per-Month</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  Rp 2.850.000
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Selling Total</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">15</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Income Total</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  Rp 21.980.000
                </p>
              </div>
            </div>
          </div>

          {/* Manage Paid Content */}
          <div className="bg-white rounded-xl shadow-md border p-6">
            <h3 className="text-lg font-bold text-gray-900">
              Manage Content
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Atur kursus mana yang ingin Anda jadikan konten berbayar.
            </p>
            <ul className="divide-y divide-gray-200 mt-4">
              {courses.map((course, idx) => (
                <li
                  key={idx}
                  className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0"
                >
                  {/* Left side */}
                  <div className="flex items-center space-x-4">
                    <img
                      className="h-16 w-24 object-cover rounded-md"
                      src={course.image}
                      alt={course.title}
                    />
                    <div>
                      <p className="font-semibold text-gray-800">
                        {course.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        Status:{" "}
                        <span
                          className={`font-medium ${
                            course.free ? "text-green-600" : "text-blue-600"
                          }`}
                        >
                          {course.free ? "Free" : "Paid"}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Right side */}
                  <div className="flex items-center space-x-3 justify-end">

                    {/* Switch + optional price input */}
                    {course.free ? (
                      <label className="flex items-center cursor-pointer">
                        <span className="mr-3 text-sm font-medium text-gray-900">
                          Paid
                        </span>
                        <div className="relative">
                          <input type="checkbox" className="sr-only" />
                          <div className="block bg-gray-200 w-12 h-7 rounded-full"></div>
                        </div>
                      </label>
                    ) : (
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                            Rp
                          </span>
                          <input
                            type="text"
                            defaultValue="250.000"
                            className="pl-8 pr-3 py-2 border border-gray-300 rounded-lg w-36 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <label className="flex items-center cursor-pointer">
                          <span className="mr-3 text-sm font-medium text-gray-900">
                            Paid
                          </span>
                          <div className="relative">
                            <input
                              type="checkbox"
                              defaultChecked
                              className="sr-only"
                            />
                            <div className="block bg-blue-600 w-12 h-7 rounded-full"></div>
                          </div>
                        </label>

                      </div>
                    )}
                    {/* Tombol Edit */}
                    <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition">
                      <Pencil className="w-4 h-4 text-gray-600" />
                    </button>

                    {/* Tombol Delete */}
                    <button className="p-2 rounded-lg border border-red-300 hover:bg-red-50 transition">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
