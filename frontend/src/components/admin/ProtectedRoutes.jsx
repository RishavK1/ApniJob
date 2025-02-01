import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children, role, isPublic = false }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isPublic) {
      // Public route: Allow access to everyone except users with restricted roles
      if (user !== null && user.role === "recruiter") {
        navigate("/"); // Redirect recruiters away from public routes
      }
    } else {
      // Protected route: Allow access only to users with the specified role
      if (user === null || user.role !== role) {
        navigate("/"); // Redirect if the user is not authenticated or doesn't have the required role
      }
    }
  }, [user, navigate, role, isPublic]);

  return <>{children}</>;
};

export default ProtectedRoutes;
