import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/PrestamosEdit.css";

export default function PrestamosEdit() {
  const [prestamo, setPrestamo] = useState({
    id_material: 0,
    id_usuario: 0,
    fecha_prestamo: "",
    fecha_devolucion: "",
    estado_prestamo: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://crud-python-prestamos.onrender.com/prestamos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setPrestamo(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener el préstamo:", error);
      });
  }, [id]);

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
      .put(`https://crud-python-prestamos.onrender.com/prestamosUpdate/${id}`, prestamo, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => navigate("/prestamos"))
      .catch((error) => {
        console.error("Error al actualizar el préstamo:", error);
      });
  };

  return (
    <div className="edit-prestamo-container">
      <div className="edit-prestamo-box">
        <h2 className="edit-prestamo-title">Editar Préstamo</h2>
        <form onSubmit={handleSubmit} className="edit-prestamo-form">
          <div className="prestamo-field">
            <label htmlFor="id_material" className="prestamo-label">ID del Material:</label>
            <input
              type="number"
              id="id_material"
              name="id_material"
              value={prestamo.id_material}
              onChange={handleChange}
              className="prestamo-input"
              required
            />
          </div>

          <div className="prestamo-field">
            <label htmlFor="id_usuario" className="prestamo-label">ID del Usuario:</label>
            <input
              type="number"
              id="id_usuario"
              name="id_usuario"
              value={prestamo.id_usuario}
              onChange={handleChange}
              className="prestamo-input"
              required
            />
          </div>

          <div className="prestamo-field">
            <label htmlFor="fecha_prestamo" className="prestamo-label">Fecha de Préstamo:</label>
            <input
              type="datetime-local"
              id="fecha_prestamo"
              name="fecha_prestamo"
              value={prestamo.fecha_prestamo}
              onChange={handleChange}
              className="prestamo-input"
              required
            />
          </div>

          <div className="prestamo-field">
            <label htmlFor="fecha_devolucion" className="prestamo-label">Fecha de Devolución:</label>
            <input
              type="datetime-local"
              id="fecha_devolucion"
              name="fecha_devolucion"
              value={prestamo.fecha_devolucion}
              onChange={handleChange}
              className="prestamo-input"
              required
            />
          </div>

          <div className="prestamo-field">
            <label htmlFor="estado_prestamo" className="prestamo-label">Estado del Préstamo:</label>
            <input
              type="text"
              id="estado_prestamo"
              name="estado_prestamo"
              value={prestamo.estado_prestamo}
              onChange={handleChange}
              className="prestamo-input"
              required
            />
          </div>

          <button type="submit" className="prestamo-button">Actualizar Préstamo</button>
        </form>
      </div>
    </div>
  );
}
