import axios from "axios";
import React from "react";
import '../../../css/ABMChoferes.css'

const baseURL = "http://localhost:4000/api/empleados/listadoChofer";

export default function ABMChoferes() {
  const [choferes, setChoferes] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
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
                /*onClick={() => navigate(`/post/${val.key}`)}*/
                className="btn btn-primary"
              >
                Actualizar
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