import { Navigate } from "react-router-dom";
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/auth" replace />;
};

export default PrivateRoute;