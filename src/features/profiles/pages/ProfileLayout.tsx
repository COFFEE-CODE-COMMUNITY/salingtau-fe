import { Link, NavLink, Outlet } from "react-router-dom"
import { useUser } from "../../../globals/contexts/UserContext.tsx"
import LogoutButton from "../components/LogoutButton.tsx"
import EditProfilePicture from "../components/EditProfilePicture.tsx"
import { fallbackAvatar } from "../../../globals/components/fallbackAvatar.ts"

export default function ProfileLayout() {
  const { user } = useUser()

  const avatarUrl =
    user?.profilePictureUrl ||
    fallbackAvatar

  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "User"

  return (
    <div className="p-8">
      {/* Header Profile */}
      <div className="bg-white rounded-xl shadow-md border p-6">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <EditProfilePicture
            avatarUrl={avatarUrl}
            onUpdated={(url) => console.log("New URL:", url)}
          />

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900">{fullName}</h2>
            <p className="text-gray-500">{user?.headline || "No headline yet"}</p>
          </div>

          <Link
            to="/profile/verify"
            className="bg-green-50 text-green-600 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-100"
          >
            Verify instructor
          </Link>

          <Link
            to="/profile/edit"
            className="bg-blue-50 text-blue-600 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-100"
          >
            Edit Profile
          </Link>

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
