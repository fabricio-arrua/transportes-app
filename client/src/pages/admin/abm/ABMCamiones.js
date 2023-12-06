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

export default function ABMCamiones() {

  const [APIData, setAPIData] = useState([]);
  
  useEffect(() => {
    if(cookies.get('tipo') !== 'A'){
      window.location.href='/';
    }

    axios.get(`http://localhost:4000/api/camiones/listarCamion`, {
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
    let { matricula, anio, marca, kilometros, id_estado, id_tipo } = data;
    localStorage.setItem('Matricula', matricula);
    localStorage.setItem('Año', anio);
    localStorage.setItem('Marca', marca);
    localStorage.setItem('Kilometros', kilometros)
    localStorage.setItem('Estado', id_estado)
    localStorage.setItem('Tipo', id_tipo)
  }

  const onDelete = (data) => {

    let { matricula } = data;
    const mat = matricula;

    axios.post(`http://localhost:4000/api/camiones/eliminarCamion`, {
      matricula:mat
    },
    {
      headers: {
        Authorization: cookies.get('token'), 
      },
    })
    .then((response) => {

      if(response.data.message === 'Baja realizada con éxito'){
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
    axios.get(`http://localhost:4000/api/camiones/listarCamion`, {
      headers: {
        Authorization: cookies.get('token'), 
      }})
      .then((getData) => {
        setAPIData(getData.data.listado);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div>
      <Link to='/abm/abmcamiones/createCamion'>
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
            <Table.HeaderCell>Matrícula</Table.HeaderCell>
            <Table.HeaderCell>Año</Table.HeaderCell>
            <Table.HeaderCell>Marca</Table.HeaderCell>
            <Table.HeaderCell>Kilometros</Table.HeaderCell>
            <Table.HeaderCell>Estado</Table.HeaderCell>
            <Table.HeaderCell>Tipo</Table.HeaderCell>
            <Table.HeaderCell>Modificar</Table.HeaderCell>
            <Table.HeaderCell>Eliminar</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Object.values(APIData).map((data) => {
            return (
              <Table.Row>
                  <Table.Cell>{data.matricula}</Table.Cell>
                  <Table.Cell>{data.anio}</Table.Cell>
                  <Table.Cell>{data.marca}</Table.Cell>
                  <Table.Cell>{data.kilometros}</Table.Cell>
                  <Table.Cell>{data.id_estado}</Table.Cell>
                  <Table.Cell>{data.id_tipo}</Table.Cell>
                  <Link to='/abm/abmcamiones/UpdateCamion'>
                    <Table.Cell> 
                      <Button onClick={() => setData(data)}><AiIcons.AiOutlineEdit /></Button>
                    </Table.Cell>
                  </Link>
                  <Table.Cell>
                    <Button onClick={() => onDelete(data)}><FaIcons.FaTrash /></Button>
                  </Table.Cell>
                </Table.Row>
          )})}
        </Table.Body>
      </Table>
    </div>
  )
}