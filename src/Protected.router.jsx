import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ Component }) => {
  const token = localStorage.getItem("ack-tk");
  const userDetails = jwtDecode(token);
  if (userDetails?.email) {
    return Component;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
