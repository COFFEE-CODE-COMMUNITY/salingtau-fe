import { Navigate } from "react-router-dom";
import useAuthCheck from "../hooks/useAuthCheck.ts";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuthCheck();

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
}
