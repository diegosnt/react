import "../styles/Global.css";
import { useAuthContext } from "../contexts/AuthContext.jsx";
import { Navigate } from "react-router-dom";

export default function Admin() {
  const { user } = useAuthContext();
  if (user !== "admin") {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="admin">
      <p>Componente Admin</p>
    </div>
  );
}
