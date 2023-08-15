import React, { useState, useEffect } from 'react';
import { Table, Button } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../../css/misBtns.css';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function ListadoChoferesSinTransporte() {

  const [APIData, setAPIData] = useState([]);

  useEffect(() => {
    if(cookies.get('tipo') !== 'A'){
      window.location.href='/';
    }

    axios.get(`http://localhost:4000/api/empleados/listadoChoferesSinTransporteAsignado`, {
      headers: {
        Authorization: cookies.get('token'), 
      }})
      .then((response) => {
        console.log(response.data);
        setAPIData(response.data.listado);
      })
      .catch(error => {
        console.log(error);
      });
  }, [])

  return (
    <div>
      <Link to='/listExport'>
        <Button className='Btn'>Exportar</Button>
      </Link>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Usuario</Table.HeaderCell>
            <Table.HeaderCell>Licencia</Table.HeaderCell>
            <Table.HeaderCell>Telefono</Table.HeaderCell>
            <Table.HeaderCell>Nombre completo</Table.HeaderCell>
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
                </Table.Row>
          )})}
        </Table.Body>
      </Table>
    </div>
  )
}