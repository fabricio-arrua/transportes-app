import React, { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import axios from 'axios';
import '../../../css/misBtns.css';
import ExcelExport from '../actions/ExcelExport';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function ListadoDeGastos() {

  const [APIData, setAPIData] = useState([]);
  const f = new Intl.DateTimeFormat("en-BG", {dateStyle: "short"});

  useEffect(() => {
    if(cookies.get('tipo') !== 'A'){
      window.location.href='/';
    }

    axios.get(`http://localhost:4000/api/gastos/listarGastos`, {
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
      <ExcelExport excelData={APIData} fileName={"Listado de gastos"} />
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Fecha</Table.HeaderCell>
            <Table.HeaderCell>ID Gasto</Table.HeaderCell>
            <Table.HeaderCell>ID Transporte</Table.HeaderCell>
            <Table.HeaderCell>Monto</Table.HeaderCell>
            <Table.HeaderCell>Observaciones</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Object.values(APIData).map((data) => {
            return (
              <Table.Row>
                  <Table.Cell>{f.format(Date.parse(data.fecha_gasto))}</Table.Cell>
                  <Table.Cell>{data.id_gasto}</Table.Cell>
                  <Table.Cell>{data.id_transporte}</Table.Cell>
                  <Table.Cell>$ {data.monto_gasto}</Table.Cell>
                  <Table.Cell>{data.observaciones}</Table.Cell>
                </Table.Row>
          )})}
        </Table.Body>
      </Table>
    </div>
  )
}
