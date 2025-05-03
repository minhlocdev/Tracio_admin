import { Navigate } from "react-router-dom";
import useAuthStore, { AuthState } from "../../store/auth/useAuthStore";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useAuthStore(
    (state: AuthState) => state.isAuthenticated
  );

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
