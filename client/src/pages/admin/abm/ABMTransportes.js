import React, { useState, useEffect } from 'react';
import { Table, Button } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../../css/misBtns.css';
import Cookies from 'universal-cookie';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const cookies = new Cookies();

export default function ABMTransportes() {

  const [APIData, setAPIData] = useState([]);
  const f = new Intl.DateTimeFormat("en-BG", {dateStyle: 'short', timeStyle: 'short'});
  
  useEffect(() => {
    if(cookies.get('tipo') !== 'A'){
      window.location.href='/';
    }

    axios.get(`http://localhost:4000/api/transportes/listarTransportes`, {
      headers: {
        Authorization: cookies.get('token'), 
      }})
      .then((response) => {
          setAPIData(response.data.listado);
      })
  }, [])

  const setData = (data) => {
    let { id_transporte, estado_transporte, fecha_hora_inicio, fecha_hora_fin, kms_distancia
      , origen, destino, matricula, usuarioC, documentoCliente } = data;
    localStorage.setItem('Id', id_transporte);
    localStorage.setItem('Estado', estado_transporte);
    localStorage.setItem('Inicio', fecha_hora_inicio);
    localStorage.setItem('Fin', fecha_hora_fin);
    localStorage.setItem('Distancia', kms_distancia);
    localStorage.setItem('Origen', origen);
    localStorage.setItem('Destino', destino);
    localStorage.setItem('Matricula', matricula);
    localStorage.setItem('Usuario', usuarioC);
    localStorage.setItem('Cliente', documentoCliente);
  }

  const onDelete = (data) => {
    let { id_transporte } = data;
    const idTransporte = id_transporte;

    axios.post(`http://localhost:4000/api/transportes/eliminarTransporte/`, {
      idTransporte
    },
    {
      headers: {
        Authorization: cookies.get('token'), 
      },
    }).then((response) => {

      if(response.data.message === 'Se eliminó el transporte exitosamente'){
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      } else {
        toast.error(response.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      }
      
        getData();
    })
  }

  const getData = () => {
    axios.get(`http://localhost:4000/api/transportes/listarTransportes/`, {
      headers: {
        Authorization: cookies.get('token'),
      }})
      .then((getData) => {
        setAPIData(getData.data.listado);
      })
  }

  return (
    <div>
      <Link to='/abm/abmtransportes/CreateTransporte'>
        <button className='Btn'>Crear</button>
      </Link>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        />

      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Estado</Table.HeaderCell>
            <Table.HeaderCell>Fecha/hora inicio</Table.HeaderCell>
            <Table.HeaderCell>Fecha/hora fin</Table.HeaderCell>
            <Table.HeaderCell>Distancia</Table.HeaderCell>
            <Table.HeaderCell>Origen</Table.HeaderCell>
            <Table.HeaderCell>Destino</Table.HeaderCell>
            <Table.HeaderCell>Matricula</Table.HeaderCell>
            <Table.HeaderCell>Chofer</Table.HeaderCell>
            <Table.HeaderCell>Cliente</Table.HeaderCell>
            <Table.HeaderCell>Modificar</Table.HeaderCell>
            <Table.HeaderCell>Eliminar</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Object.values(APIData).map((data) => {
            return (
              <Table.Row>
                  <Table.Cell>{data.id_transporte}</Table.Cell>
                  <Table.Cell>{data.estado_transporte}</Table.Cell>
                  <Table.Cell>{f.format(Date.parse(data.fecha_hora_inicio))}</Table.Cell>
                  <Table.Cell>{data.fecha_hora_fin == null ? '-' : f.format(Date.parse(data.fecha_hora_fin))}</Table.Cell>
                  <Table.Cell>{data.kms_distancia}</Table.Cell>
                  <Table.Cell>{data.origen}</Table.Cell>
                  <Table.Cell>{data.destino}</Table.Cell>
                  <Table.Cell>{data.matricula}</Table.Cell>
                  <Table.Cell>{data.usuarioC}</Table.Cell>
                  <Table.Cell>{data.documentoCliente}</Table.Cell>
                  <Link to='/abm/abmtransportes/UpdateTransporte'>
                    <Table.Cell> 
                      <Button onClick={() => setData(data)}><AiIcons.AiOutlineEdit /></Button>
                    </Table.Cell>
                  </Link>
                  <Table.Cell>
                    <Button onClick={() => {onDelete(data);}}><FaIcons.FaTrash /></Button>
                  </Table.Cell>
                </Table.Row>
          )})}
        </Table.Body>
      </Table>
    </div>
  )
}