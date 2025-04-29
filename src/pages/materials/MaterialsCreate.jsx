import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/MaterialsCreate.css"; // Usa el nuevo estilo aquí

const TipoMaterial = {
  Proyector: "Proyector",
  Extencion: "Extencion",
  Computadora: "Computadora",
  HDMI: "HDMI",
};

export default function MaterialsCreate() {
  const [material, setMaterial] = useState({
    tipo_material: "",
    marca: "",
    modelo: "",
    estado: "Disponible",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMaterial({
      ...material,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://crud-python-prestamos.onrender.com/materialsCreate", material, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Material creado:", response.data);
        navigate("/materials");
      })
      .catch((error) => {
        console.error("Hubo un error al crear el material:", error);
      });
  };

  return (
    <div className="create-material-container">
      <div className="create-material-box">
        <h2 className="create-material-title">Registrar Nuevo Material</h2>
        <form onSubmit={handleSubmit} className="create-material-form">
          <div className="material-field">
            <label className="material-label" htmlFor="tipo_material">Tipo de Material:</label>
            <select
              className="material-input"
              id="tipo_material"
              name="tipo_material"
              value={material.tipo_material}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un tipo de material</option>
              {Object.keys(TipoMaterial).map((key) => (
                <option key={key} value={TipoMaterial[key]}>
                  {TipoMaterial[key]}
                </option>
              ))}
            </select>
          </div>

          <div className="material-field">
            <label className="material-label" htmlFor="marca">Marca:</label>
            <input
              className="material-input"
              type="text"
              id="marca"
              name="marca"
              value={material.marca}
              onChange={handleChange}
              required
            />
          </div>

          <div className="material-field">
            <label className="material-label" htmlFor="modelo">Modelo:</label>
            <input
              className="material-input"
              type="text"
              id="modelo"
              name="modelo"
              value={material.modelo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="material-field">
            <label className="material-label" htmlFor="estado">Estado:</label>
            <select
              className="material-input"
              id="estado"
              name="estado"
              value={material.estado}
              onChange={handleChange}
              required
            >
              <option value="Disponible">Disponible</option>
              <option value="No Disponible">No Disponible</option>
            </select>
          </div>

          <button type="submit" className="material-button">
            Registrar Material
          </button>
        </form>
      </div>
    </div>
  );
}
