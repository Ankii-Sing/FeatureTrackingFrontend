import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";

const PrivateRoute = () => {

  // If the user is not authenticated, redirect to login
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;