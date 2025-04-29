import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/PrestamosCreate.css";

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
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("https://crud-python-prestamos.onrender.com/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsuarios(res.data))
      .catch((err) => console.error("Error al obtener usuarios:", err));

    axios
      .get("https://crud-python-prestamos.onrender.com/materials", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMateriales(res.data))
      .catch((err) => console.error("Error al obtener materiales:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrestamo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://crud-python-prestamos.onrender.com/prestamosCreate", prestamo, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("Préstamo creado:", res.data);
        navigate("/prestamos");
      })
      .catch((err) => {
        console.error("Error al registrar el préstamo:", err);
      });
  };

  const getTodayDatetimeLocal = () => {
    const now = new Date();
    now.setSeconds(0, 0);
    const offset = now.getTimezoneOffset();
    const localDate = new Date(now.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 16);
  };

  return (
    <div className="create-prestamo-container">
      <div className="create-prestamo-box">
        <h2 className="create-prestamo-title">Registrar Nuevo Préstamo</h2>
        <form onSubmit={handleSubmit} className="create-prestamo-form">
          <div className="prestamo-field">
            <label htmlFor="id_material" className="prestamo-label">Material:</label>
            <select
              id="id_material"
              name="id_material"
              className="prestamo-input"
              value={prestamo.id_material}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un material</option>
              {materiales.map((material) => (
                <option key={material.id} value={material.id}>
                  {material.tipo_material}
                </option>
              ))}
            </select>
          </div>

          <div className="prestamo-field">
            <label htmlFor="id_usuario" className="prestamo-label">Usuario:</label>
            <select
              id="id_usuario"
              name="id_usuario"
              className="prestamo-input"
              value={prestamo.id_usuario}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un usuario</option>
              {usuarios.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="prestamo-field">
            <label htmlFor="fecha_prestamo" className="prestamo-label">Fecha de Préstamo:</label>
            <input
              type="datetime-local"
              id="fecha_prestamo"
              name="fecha_prestamo"
              className="prestamo-input"
              value={prestamo.fecha_prestamo}
              onChange={handleChange}
              min={getTodayDatetimeLocal()}
              required
            />
          </div>

          <div className="prestamo-field">
            <label htmlFor="fecha_devolucion" className="prestamo-label">Fecha de Devolución:</label>
            <input
              type="datetime-local"
              id="fecha_devolucion"
              name="fecha_devolucion"
              className="prestamo-input"
              value={prestamo.fecha_devolucion}
              onChange={handleChange}
              min={getTodayDatetimeLocal()}
              required
            />
          </div>

          <button type="submit" className="prestamo-button">
            Registrar Préstamo
          </button>
        </form>
      </div>
    </div>
  );
}
