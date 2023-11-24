import React, { useState, useEffect } from 'react';
import { Table, Button, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../../css/misBtns.css';
import ExcelExport from '../actions/ExcelExport';
import Cookies from 'universal-cookie';
import * as BsIcons from 'react-icons/bs';

const cookies = new Cookies();

export default function ListadoChoferesSinTransporte() {

  const [APIData, setAPIData] = useState([]);
  const [APIError, setAPIError] = useState([]);

  useEffect(() => {
    if(cookies.get('tipo') !== 'A'){
      window.location.href='/';
    }

    axios.get(`http://localhost:4000/api/empleados/listadoChoferesSinTransporteAsignado`, {
      headers: {
        Authorization: cookies.get('token'), 
      }})
      .then((response) => {
        if (response.data.listado){
          setAPIData(response.data.listado);
        } else {
          setAPIError(response.data.message)
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, [])

  const setData = (data) => {
    let { usuarioC } = data;
    localStorage.setItem('Usuario', usuarioC);
  }

  return (
    <div>
      <ExcelExport excelData={APIData} fileName={"Listado de choferes sin transporte"} />

      <Header as='h1' color='yellow'>
          {APIError}
      </Header>

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
                      <Button onClick={() => setData(data)}><BsIcons.BsFillPlusCircleFill /></Button>
                    </Table.Cell>
                  </Link>
                </Table.Row>
            )})}
        </Table.Body>
      </Table>
    </div>
  )
}