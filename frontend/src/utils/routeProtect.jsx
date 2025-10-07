import { Navigate } from "react-router-dom";

export const PrivateRoute=({ children }) =>{
  const token = JSON.parse(sessionStorage.getItem("auth-storage"))?.state?.token;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
