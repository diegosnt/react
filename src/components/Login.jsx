import "../styles/Global.css";
import { useAuthContext } from "../contexts/AuthContext.jsx";
import { Navigate } from "react-router-dom";

export default function Login() {
  const {user} = useAuthContext(); 

  if (!user) {
    //console.log("No logueado!!!")
    return <Navigate to="/login2" replace />;
  }
  return (
    <div className="login">
      <p>Componente Login</p>
    </div>
  );
}
