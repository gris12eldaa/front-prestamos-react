import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/UsersEdit.css"; // Asegúrate de agregar la ruta del archivo de estilos

export default function UsersEdit() {
  const [usuario, setUsuario] = useState({
    nombre: "",
    primerApellido: "",
    segundoApellido: "",
    tipoUsuario: "",
    nombreUsuario: "",
    correoElectronico: "",
    contrasena: "",
    numeroTelefono: "",
    estatus: "",
  });

  const { id } = useParams();  // Obtiene el ID de la URL
  const navigate = useNavigate();

  // Obtener los datos del usuario al cargar el componente
  useEffect(() => {
    // Obtén los datos del usuario desde la API
    axios
      .get(`https://crud-python-prestamos.onrender.com/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUsuario(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los datos del usuario:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({
      ...usuario,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`https://crud-python-prestamos.onrender.com/usersUpdate/${id}`, usuario, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Usuario actualizado:", response.data);
        navigate("/users");  
      })
      .catch((error) => {
        console.error("Hubo un error al actualizar el usuario:", error);
      });
  };

  return (
    <div className="edit-user-container">
      <h2>Editar Usuario</h2>
      <form onSubmit={handleSubmit} className="edit-user-form">
        <div className="user-field">
          <label htmlFor="nombre" className="user-label">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            value={usuario.nombre}
            onChange={handleChange}
            className="user-input"
            required
          />
        </div>
        
        <div className="user-field">
          <label htmlFor="primerApellido" className="user-label">Apellido Paterno:</label>
          <input
            type="text"
            id="primerApellido"
            name="primerApellido"
            placeholder="Apellido Paterno"
            value={usuario.primerApellido}
            onChange={handleChange}
            className="user-input"
            required
          />
        </div>
        
        <div className="user-field">
          <label htmlFor="segundoApellido" className="user-label">Apellido Materno:</label>
          <input
            type="text"
            id="segundoApellido"
            name="segundoApellido"
            placeholder="Apellido Materno"
            value={usuario.segundoApellido}
            onChange={handleChange}
            className="user-input"
            required
          />
        </div>
        
        <div className="user-field">
          <label htmlFor="tipoUsuario" className="user-label">Tipo de Usuario:</label>
          <select
            id="tipoUsuario"
            name="tipoUsuario"
            value={usuario.tipoUsuario}
            onChange={handleChange}
            className="user-input"
            required
          >
            <option value="">-- Selecciona el tipo de usuario --</option>
            <option value="Alumno">Alumno</option>
            <option value="Profesor">Profesor</option>
          </select>
        </div>
        
        <div className="user-field">
          <label htmlFor="nombreUsuario" className="user-label">Nombre de Usuario:</label>
          <input
            type="text"
            id="nombreUsuario"
            name="nombreUsuario"
            placeholder="Nombre de Usuario"
            value={usuario.nombreUsuario}
            onChange={handleChange}
            className="user-input"
            required
          />
        </div>
        
        <div className="user-field">
          <label htmlFor="correoElectronico" className="user-label">Correo Electrónico:</label>
          <input
            type="email"
            id="correoElectronico"
            name="correoElectronico"
            placeholder="Correo Electrónico"
            value={usuario.correoElectronico}
            onChange={handleChange}
            className="user-input"
            required
          />
        </div>
        
        <div className="user-field">
          <label htmlFor="numeroTelefono" className="user-label">Número de Teléfono:</label>
          <input
            type="text"
            id="numeroTelefono"
            name="numeroTelefono"
            placeholder="Número de Teléfono"
            value={usuario.numeroTelefono}
            onChange={handleChange}
            className="user-input"
            required
          />
        </div>
        
        <div className="user-field">
          <label htmlFor="estatus" className="user-label">Estatus:</label>
          <select
            id="estatus"
            name="estatus"
            value={usuario.estatus}
            onChange={handleChange}
            className="user-input"
            required
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>
        
        <button type="submit" className="user-button">Actualizar Usuario</button>
      </form>
    </div>
  );
}
