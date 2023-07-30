import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, {useState} from "react";
import '../../../css/ABMChoferes.css'

const listadoURL = "http://localhost:4000/api/empleados/listadoChofer";

export default function ABMChoferes() {
  const navigate = useNavigate();
  const [choferes, setChoferes] = useState(null);

  React.useEffect(() => {
    axios.get(listadoURL).then((response) => {
      setChoferes(response.data.listado);
    });
  }, []);

  if (!choferes) return null;

  return (
  <div className="App">
    <table>
      <tr>
        <th>Usuario</th>
        <th>Licencia</th>
        <th>Telefono</th>
        <th>Nombre Completo</th>
        <th>Modificar</th>
        <th>Eliminar</th>
      </tr>
      {Object.values(choferes).map((val, key) => {
        return (
          <tr key={key}>
            <td>{val.usuarioC}</td>
            <td>{val.nro_licencia}</td>
            <td>{val.telefono}</td>
            <td>{val.nombre_completo}</td>
            <td>
              <button
                onClick={() => navigate(`/abm/abmchoferes/ModChofer`)}
                className="btn btn-primary"
              >
                Modificar
              </button>
            </td>
            <td>
              <button
                /*onClick={() => handleDelete(val)}*/
                className="btn btn-danger"
              >
                Eliminar
              </button>
            </td>
          </tr>
        )
      })}
    </table>
  </div>
  );
}