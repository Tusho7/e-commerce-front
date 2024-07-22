import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateAdminRoutes = ({ children }: PrivateRouteProps) => {
  const isAuth = localStorage.getItem("isAdminLogin") === "true";

  return isAuth ? children : <Navigate to="/admin_login" />;
};

export default PrivateAdminRoutes;
