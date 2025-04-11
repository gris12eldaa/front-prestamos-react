import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/PrestamosCreate.css"; // Asegúrate de agregar la ruta del archivo de estilos


export default function PrestamosCreate() {
  const [prestamo, setPrestamo] = useState({
    id_material: "",
    id_usuario: "",
    fecha_prestamo: "",
    fecha_devolucion: "",
    estado_prestamo: "Activo",
  });

  const [usuarios, setUsuarios] = useState([]);
  const [materiales, setMateriales] = useState([]);
  const token = localStorage.getItem('token')

  const navigate = useNavigate();

  // Obtener lista de usuarios y materiales al cargar el componente
  useEffect(() => {
    axios
      .get("https://crud-python-prestamos.onrender.com/users",{
        headers: {
            Authorization: `Bearer ${token}`, 
          },
      })
      .then((response) => setUsuarios(response.data))
      .catch((error) => console.error("Error al obtener usuarios:", error));

    axios
      .get("https://crud-python-prestamos.onrender.com/materials",{
        headers: {
            Authorization: `Bearer ${token}`, 
          },
      })
      .then((response) => setMateriales(response.data))
      .catch((error) => console.error("Error al obtener materiales:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrestamo({
      ...prestamo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://crud-python-prestamos.onrender.com/prestamosCreate", prestamo, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Préstamo creado:", response.data);
        navigate("/prestamos");
      })
      .catch((error) => {
        console.error("Hubo un error al registrar el préstamo:", error);
      });
  };

  return (
    <div className="create-prestamo-container">
      <h2>Registrar Nuevo Préstamo</h2>
      <form onSubmit={handleSubmit} className="create-prestamo-form">
        <div className="form-group">
          <label htmlFor="id_material">Material:</label>
          <select id="id_material" name="id_material" value={prestamo.id_material} onChange={handleChange} required>
            <option value="">Seleccione un material</option>
            {materiales.map((material) => (
              <option key={material.id} value={material.id}>
                {material.tipo_material} 
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="id_usuario">Usuario:</label>
          <select id="id_usuario" name="id_usuario" value={prestamo.id_usuario} onChange={handleChange} required>
            <option value="">Seleccione un usuario</option>
            {usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.nombre} {/* Ajusta según la estructura de tu API */}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="fecha_prestamo">Fecha de Préstamo:</label>
          <input type="datetime-local" id="fecha_prestamo" name="fecha_prestamo" value={prestamo.fecha_prestamo} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="fecha_devolucion">Fecha de Devolución:</label>
          <input type="datetime-local" id="fecha_devolucion" name="fecha_devolucion" value={prestamo.fecha_devolucion} onChange={handleChange} required />
        </div>

        <div className="form-group">
  <label htmlFor="estado_prestamo">Estado del Préstamo:</label>
  <select
    id="estado_prestamo"
    name="estado_prestamo"
    value={prestamo.estado_prestamo}
    onChange={handleChange}
    required
  >
    <option value="Activo">Activo</option>
    <option value="Vencido">Inactivo</option>
    <option value="Devuelto">Devuelto</option>
  </select>
</div>

        <button type="submit" className="submit-button">Registrar Préstamo</button>
      </form>
    </div>
  );
}
