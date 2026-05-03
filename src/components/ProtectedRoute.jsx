import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// No longer restricts access — guests can use cart, checkout, orders freely
export const ProtectedRoute = ({ children }) => {
  return children;
};

// Admin route unchanged — still requires login and admin role
export const AdminRoute = ({ children }) => {
  const { user, isAdmin } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return children;
};
