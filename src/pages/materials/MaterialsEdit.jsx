import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/MaterialsEdit.css";

export default function MaterialsEdit() {
  const [material, setMaterial] = useState({
    tipo_material: "",
    marca: "",
    modelo: "",
    estado: "Disponible",
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`https://crud-python-prestamos.onrender.com/materials/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMaterial(res.data))
      .catch((err) =>
        console.error("Hubo un error al obtener los datos del material:", err)
      );
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMaterial((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`https://crud-python-prestamos.onrender.com/materialsUpdate/${id}`, material, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("Material actualizado:", res.data);
        navigate("/materials");
      })
      .catch((err) =>
        console.error("Hubo un error al actualizar el material:", err)
      );
  };

  return (
    <div className="edit-material-container">
      <div className="create-prestamo-box">
        <h2 className="create-prestamo-title">Editar Material</h2>
        <form onSubmit={handleSubmit} className="edit-material-form">
          <div className="prestamo-field">
            <label htmlFor="tipo_material" className="prestamo-label">Tipo de Material:</label>
            <input
              type="text"
              id="tipo_material"
              name="tipo_material"
              className="prestamo-input"
              value={material.tipo_material}
              onChange={handleChange}
              required
            />
          </div>

          <div className="prestamo-field">
            <label htmlFor="marca" className="prestamo-label">Marca:</label>
            <input
              type="text"
              id="marca"
              name="marca"
              className="prestamo-input"
              value={material.marca}
              onChange={handleChange}
              required
            />
          </div>

          <div className="prestamo-field">
            <label htmlFor="modelo" className="prestamo-label">Modelo:</label>
            <input
              type="text"
              id="modelo"
              name="modelo"
              className="prestamo-input"
              value={material.modelo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="prestamo-field">
            <label htmlFor="estado" className="prestamo-label">Estado:</label>
            <select
              id="estado"
              name="estado"
              className="prestamo-input"
              value={material.estado}
              onChange={handleChange}
              required
            >
              <option value="Disponible">Disponible</option>
              <option value="Prestado">Prestado</option>
            </select>
          </div>

          <button type="submit" className="prestamo-button">
            Actualizar Material
          </button>
        </form>
      </div>
    </div>
  );
}
