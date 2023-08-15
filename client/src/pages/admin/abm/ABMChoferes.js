import React, { useState, useEffect } from 'react';
import { Table, Button } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../../css/misBtns.css';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function ABMChoferes() {

  const [APIData, setAPIData] = useState([]);
  const [usuario, setUsuario] = useState('');
  
  useEffect(() => {
    if(cookies.get('tipo') !== 'A'){
      window.location.href='/';
    }

    axios.get(`http://localhost:4000/api/empleados/listadoChofer`, {
      headers: {
        Authorization: cookies.get('token'), 
      }})
      .then((response) => {
          setAPIData(response.data.listado);
      })
  }, [])

  const setData = (data) => {
    let { usuarioC, nro_licencia, telefono, nombre_completo } = data;
    localStorage.setItem('Usuario', usuarioC);
    localStorage.setItem('Licencia', nro_licencia);
    localStorage.setItem('Telefono', telefono);
    localStorage.setItem('Nombre completo', nombre_completo)
  }

  const onDelete = (data) => {
    let { usuarioC } = data;
    localStorage.setItem('Usuario', usuarioC);
    setUsuario(localStorage.getItem('Usuario'))

    axios.post(`http://localhost:4000/api/empleados/bajaChofer/`, {
      usuario
    },
    {
      headers: {
        Authorization: cookies.get('token'), 
      },
    }
    ).then(() => {
      getData();
    })
  }

  const getData = () => {
    axios.get(`http://localhost:4000/api/empleados/listadoChofer`, {
      headers: {
        Authorization: cookies.get('token'), 
      }})
      .then((getData) => {
        setAPIData(getData.data.listado);
      })
  }

  return (
    <div>
      <Link to='/abm/abmchoferes/createChofer'>
        <button className='Btn'>Crear</button>
      </Link>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Usuario</Table.HeaderCell>
            <Table.HeaderCell>Licencia</Table.HeaderCell>
            <Table.HeaderCell>Telefono</Table.HeaderCell>
            <Table.HeaderCell>Nombre completo</Table.HeaderCell>
            <Table.HeaderCell>Modificar</Table.HeaderCell>
            <Table.HeaderCell>Eliminar</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Object.values(APIData).map((data) => {
            return (
              <Table.Row>
                  <Table.Cell>{data.usuarioC}</Table.Cell>
                  <Table.Cell>{data.nro_licencia}</Table.Cell>
                  <Table.Cell>{data.telefono}</Table.Cell>
                  <Table.Cell>{data.nombre_completo}</Table.Cell>
                  <Link to='/abm/abmchoferes/UpdateChofer'>
                    <Table.Cell> 
                      <Button onClick={() => setData(data)}>Modificar</Button>
                    </Table.Cell>
                  </Link>
                  <Table.Cell>
                    <Button onClick={() => {onDelete(data);}}>Eliminar</Button>
                  </Table.Cell>
                </Table.Row>
          )})}
        </Table.Body>
      </Table>
    </div>
  )
}