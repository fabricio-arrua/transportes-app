import React, { useState, useEffect } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../../css/misBtns.css';
import ExcelExport from '../actions/ExcelExport';
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
        setAPIData(response.data.listado);
      })
      .catch(error => {
        console.log(error);
      });
  }, [])

  const setData = (data) => {
    let { usuarioC } = data;
    localStorage.setItem('Usuario', usuarioC);
  }

  return (
    <div>
      <ExcelExport excelData={APIData} fileName={"Listado de choferes sin transporte"} />
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Usuario</Table.HeaderCell>
            <Table.HeaderCell>Licencia</Table.HeaderCell>
            <Table.HeaderCell>Telefono</Table.HeaderCell>
            <Table.HeaderCell>Nombre completo</Table.HeaderCell>
            <Table.HeaderCell>Asignar transporte</Table.HeaderCell>
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
                  <Link to='/asignartransporte'>
                    <Table.Cell> 
                      <Button onClick={() => setData(data)}>Asignar</Button>
                    </Table.Cell>
                  </Link>
                </Table.Row>
          )})}
        </Table.Body>
      </Table>
    </div>
  )
}