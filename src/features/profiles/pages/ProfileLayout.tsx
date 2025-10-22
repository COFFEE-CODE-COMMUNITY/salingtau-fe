import { NavLink, Outlet } from "react-router-dom"
import LogoutButton from "../components/LogoutButton.tsx"

export default function ProfileLayout() {
  return (
    <div className="p-8">
      {/* Header ProfileHome */}
      <div className="bg-white rounded-xl shadow-md border p-6">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <img
            className="h-24 w-24 rounded-full object-cover ring-4 ring-blue-100"
            src="https://images.unsplash.com/photo-1528763380143-65b3ac89a3ff?q=80&w=2574&auto=format&fit=crop"
            alt="User avatar"
          />
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900">Andi Pratama</h2>
            <p className="text-gray-500">Creator & Web Developer</p>
          </div>
          <button className="bg-blue-50 text-blue-600 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-100">
            Edit Profile
          </button>
          <LogoutButton />
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <NavLink
            to="/profile"
            end
            className={({ isActive }) =>
              `whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                isActive
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`
            }
          >
            Profile
          </NavLink>

          <NavLink
            to="/profile/settings"
            className={({ isActive }) =>
              `whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                isActive
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`
            }
          >
            Settings
          </NavLink>

          <NavLink
            to="/profile/security"
            className={({ isActive }) =>
              `whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                isActive
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`
            }
          >
            Security
          </NavLink>
        </nav>
      </div>

      {/* Children Content */}
      <div className="mt-8">
        <Outlet />
      </div>
    </div>
  )
}
