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

  if (!user || user.id === 'fallback-user') {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  const userRoles = Array.isArray(user.roles) ? user.roles : []

  if (allowedRoles && allowedRoles.length > 0) {
    const hasRequiredRole = userRoles.some((role) =>
      allowedRoles.includes(role),
    )

    if (!hasRequiredRole) {
      if (userRoles.includes(UserRole.INSTRUCTOR)) {
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

export const StudentRoute = () => (
  <ProtectedRoute allowedRoles={[UserRole.STUDENT]} />
)

export const InstructorRoute = () => (
  <ProtectedRoute allowedRoles={[UserRole.INSTRUCTOR]} />
)

export const StudentOrInstructorRoute = () => (
  <ProtectedRoute allowedRoles={[UserRole.STUDENT, UserRole.INSTRUCTOR]} />
)

export const AnyAuthenticatedRoute = () => (
  <ProtectedRoute />
)