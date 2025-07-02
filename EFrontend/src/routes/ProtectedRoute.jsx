import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // path must be correct

const ProtectedRoute = ({ role = "admin", redirectTo = "/401", children }) => {
  const { user, isAuthenticated } = useAuth();

  // 1. Not authenticated (user not logged in)
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;

  // 2. Authenticated but wrong role
  if (user?.role !== role) return <Navigate to={redirectTo} replace />;

  return children;
};

export default ProtectedRoute;

