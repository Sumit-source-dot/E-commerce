// src/routes/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ role = "admin", redirectTo = "/401", children }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkRole = async () => {
      try {
        const res = await axios.get("/api/auth/checkRole", {
          withCredentials: true,
        });

        if (res.data?.role === role) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch (err) {
        console.error("Authorization check failed:", err);
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    checkRole();
  }, [role]);

  if (loading) return <div>Loading...</div>;

  if (!authorized) return <Navigate to={redirectTo} replace />;

  return children;
};

export default ProtectedRoute;
