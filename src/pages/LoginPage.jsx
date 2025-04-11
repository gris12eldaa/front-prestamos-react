import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css"; // Asegúrate de que la ruta sea correcta
import axios from "axios"; // Importamos Axios

export default function LoginPage({onLoginSuccess}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Crear objeto con los datos de login
    const loginData = {
      correoElectronico: email,
      contrasena: password,
    };

    console.log("Login Data:", loginData);

    // Enviar los datos de login al backend usando axios
    axios
      .post("https://crud-python-prestamos.onrender.com/users/login", loginData, {
        headers: {
          "Content-Type": "application/json", // Indicamos que enviamos un JSON
        },
      })
      .then((response) => {
        if (response.data.access_token) {
          console.log("Login exitoso, token recibido:", response.data.access_token);
          localStorage.setItem("token", response.data.access_token);
          onLoginSuccess(response.data.access_token); // Pasamos el token al componente App
          navigate("/dashboard");
        } else {
          console.error("Credenciales incorrectas o error en el login");
        }
      })
      .catch((error) => {
        console.error("Hubo un error al enviar los datos:", error);
      });
  };

  return (
    <>
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">¡Bienvenido!</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Correo electrónico"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="login-button">
              Entrar
            </button>
          </form>
          <p className="login-register-text">
            ¿No tienes cuenta?{" "}
            <span
              className="login-register-link"
              onClick={() => navigate("/register")}
            >
              Regístrate
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
