import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useUser, UserRole } from './user-context'

interface ProtectedRouteProps {
  allowedRoles?: UserRole[]
  redirectTo?: string
}

export const ProtectedRoute = ({
                                 allowedRoles,
                                 redirectTo = '/login',
                               }: ProtectedRouteProps) => {
  const { user } = useUser()
  const location = useLocation()

  // ✅ Jika user belum login atau fallback user
  if (!user || user.id === 'fallback-user') {
    console.log("🚫 No authenticated user, redirecting to login")
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  const userRoles = Array.isArray(user.roles) ? user.roles : []

  // ✅ Jika ada role requirement, cek apakah user punya role yang sesuai
  if (allowedRoles && allowedRoles.length > 0) {
    const hasRequiredRole = userRoles.some((role) =>
      allowedRoles.includes(role),
    )

    if (!hasRequiredRole) {
      console.log(`🚫 User doesn't have required role. User roles:`, userRoles, "Required:", allowedRoles)

      // ✅ Redirect berdasarkan role user (dengan prioritas)
      if (userRoles.includes(UserRole.ADMIN)) {
        return <Navigate to="/dashboard/admin" replace />
      } else if (userRoles.includes(UserRole.INSTRUCTOR)) {
        return <Navigate to="/dashboard/instructor" replace />
      } else if (userRoles.includes(UserRole.STUDENT)) {
        return <Navigate to="/dashboard/student" replace />
      }

      // ✅ Fallback ke home jika role tidak dikenali
      return <Navigate to="/" replace />
    }
  }

  console.log("✅ Access granted to protected route")
  return <Outlet />
}

// Komponen khusus untuk masing-masing role
export const StudentRoute = () => (
  <ProtectedRoute allowedRoles={[UserRole.STUDENT]} />
)

export const InstructorRoute = () => (
  <ProtectedRoute allowedRoles={[UserRole.INSTRUCTOR]} />
)

export const AdminRoute = () => (
  <ProtectedRoute allowedRoles={[UserRole.ADMIN]} />
)

// Komponen untuk route yang bisa diakses oleh multiple roles
export const StudentOrInstructorRoute = () => (
  <ProtectedRoute allowedRoles={[UserRole.STUDENT, UserRole.INSTRUCTOR]} />
)

export const InstructorOrAdminRoute = () => (
  <ProtectedRoute allowedRoles={[UserRole.INSTRUCTOR, UserRole.ADMIN]} />
)

export const AnyAuthenticatedRoute = () => (
  <ProtectedRoute />
)