import React, { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import axios from 'axios';
import '../../../css/misBtns.css';
import ExcelExport from '../actions/ExcelExport';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function ListadoDeClientes() {

  const [APIData, setAPIData] = useState([]);
  const [APIError, setAPIError] = useState([]);

  useEffect(() => {
    if(cookies.get('tipo') !== 'A'){
      window.location.href='/';
    }

    axios.get(`http://localhost:4000/api/clientes/listarCliente`, {
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
      .catch(error => {
        console.log(error);
      });
  }, [])

  return (
    <div>
      <ExcelExport excelData={APIData} fileName={"Listado de clientes"} />

      <Header as='h1' color='yellow'>
          {APIError}
      </Header>
      
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Documento</Table.HeaderCell>
            <Table.HeaderCell>Nombre Completo</Table.HeaderCell>
            <Table.HeaderCell>Dirección</Table.HeaderCell>
            <Table.HeaderCell>Telefono</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Object.values(APIData).map((data) => {
            return (
              <Table.Row>
                  <Table.Cell>{data.documento}</Table.Cell>
                  <Table.Cell>{data.nombre_completo}</Table.Cell>
                  <Table.Cell>{data.direccion}</Table.Cell>
                  <Table.Cell>{data.telefono}</Table.Cell>
                </Table.Row>
          )})}
        </Table.Body>
      </Table>
    </div>
  )
}