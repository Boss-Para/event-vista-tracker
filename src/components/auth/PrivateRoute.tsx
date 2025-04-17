
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  // For now, we'll use a simple localStorage check. In a real app, you'd want to use a proper auth system
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
