import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import "../styles/Global.css";
function Login2() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Si el usuario ya está logueado, lo redirigimos a la página principal
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación de autenticación
    if (
      (usuario === "admin" && password === "1234") ||
      (usuario === "user1" && password === "1234")
    ) {
      Swal.fire({
        title: "¡Bienvenido!",
        text: "Has iniciado sesión correctamente.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        login(usuario);
        navigate("/");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Credenciales incorrectas. Por favor, inténtalo de nuevo.",
      });
    }
  };
  return (
    <div className="formulario-container">
      <form className="formulario-producto" onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>
        <div className="formulario-grupo">
          <label>Usuario:</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>
        <div className="formulario-grupo">
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="formulario-boton" type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
}
export default Login2;
