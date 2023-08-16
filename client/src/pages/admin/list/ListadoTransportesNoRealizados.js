import React, { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import axios from 'axios';
import '../../../css/misBtns.css';
import ExcelExport from '../actions/ExcelExport';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function ListadoTransportesNoRealizados() {

  const [APIData, setAPIData] = useState([]);
  const f = new Intl.DateTimeFormat("en-BG", {dateStyle: 'short', timeStyle: 'short'});

  useEffect(() => {
    if(cookies.get('tipo') !== 'A'){
      window.location.href='/';
    }

    axios.get(`http://localhost:4000/api/transportes/listadoTransportesNoRealizados`, {
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
      <ExcelExport excelData={APIData} fileName={"Transportes no realizados"} />
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Origen</Table.HeaderCell>
            <Table.HeaderCell>Destino</Table.HeaderCell>
            <Table.HeaderCell>Estado</Table.HeaderCell>
            <Table.HeaderCell>Fecha inicio</Table.HeaderCell>
            <Table.HeaderCell>Documento cliente</Table.HeaderCell>
            <Table.HeaderCell>ID Transporte</Table.HeaderCell>
            <Table.HeaderCell>Kms Distancia</Table.HeaderCell>
            <Table.HeaderCell>Matricula</Table.HeaderCell>
            <Table.HeaderCell>Chofer</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Object.values(APIData).map((data) => {
            return (
              <Table.Row>
                  <Table.Cell>{data.origen}</Table.Cell>
                  <Table.Cell>{data.destino}</Table.Cell>
                  <Table.Cell>{data.estado_transporte}</Table.Cell>
                  <Table.Cell>{f.format(Date.parse(data.fecha_hora_inicio))}</Table.Cell>
                  <Table.Cell>{data.documentoCliente}</Table.Cell>
                  <Table.Cell>{data.id_transporte}</Table.Cell>
                  <Table.Cell>{data.kms_distancia}</Table.Cell>
                  <Table.Cell>{data.matricula}</Table.Cell>
                  <Table.Cell>{data.usuarioC}</Table.Cell>
                </Table.Row>
          )})}
        </Table.Body>
      </Table>
    </div>
  )
}