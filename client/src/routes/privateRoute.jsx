import { Navigate } from "react-router-dom";
function PrivateRoute({children}) {
  const isAuthenticated = localStorage.getItem("token");
  console.log("-token->", isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
export default PrivateRoute;