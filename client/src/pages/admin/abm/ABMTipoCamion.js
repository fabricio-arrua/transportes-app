import React, { useState, useEffect } from 'react';
import { Table, Button, Header } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../../css/misBtns.css';
import Cookies from 'universal-cookie';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const cookies = new Cookies();

export default function ABMTipoCamion() {

  const [APIData, setAPIData] = useState([]);
  const [APIError, setAPIError] = useState([]);
  
  useEffect(() => {
    if(cookies.get('tipo') !== 'A'){
      window.location.href='/';
    }

    axios.get(`http://localhost:4000/api/tipoCamiones/listadoTipoCamion`, {
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
    let { id_tipo, descripcion, dimensiones, cantidad_ejes, capacidad_carga, capacidad_combustible } = data;
    localStorage.setItem('Id', id_tipo);
    localStorage.setItem('Desc', descripcion);
    localStorage.setItem('Dimensiones', dimensiones);
    localStorage.setItem('Ejes', cantidad_ejes);
    localStorage.setItem('Carga', capacidad_carga);
    localStorage.setItem('Combustible', capacidad_combustible);
  }

  const onDelete = (data) => {
    let { id_tipo } = data;
    const idTipo = id_tipo;

    axios.post(`http://localhost:4000/api/tipoCamiones/eliminarTipoCamion/`, {
      idTipo
    },
    {
      headers: {
        Authorization: cookies.get('token'), 
      },
    }).then((response) => {

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
    axios.get(`http://localhost:4000/api/tipoCamiones/listadoTipoCamion`, {
      headers: {
        Authorization: cookies.get('token'), 
      }})
      .then((getData) => {
        setAPIData(getData.data.listado);
      })
  }

  return (
    <div>
      <Link to='/abm/abmtipocamion/CreateTipo'>
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
      
      <Header as='h1' color='yellow'>
          {APIError}
      </Header>
        
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Descripcion</Table.HeaderCell>
            <Table.HeaderCell>Dimensiones</Table.HeaderCell>
            <Table.HeaderCell>Cantidad ejes</Table.HeaderCell>
            <Table.HeaderCell>Capacidad carga (Kgs)</Table.HeaderCell>
            <Table.HeaderCell>Capacidad combustible (Lts)</Table.HeaderCell>
            <Table.HeaderCell>Modificar</Table.HeaderCell>
            <Table.HeaderCell>Eliminar</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Object.values(APIData).map((data) => {
            return (
              <Table.Row>
                  <Table.Cell>{data.id_tipo}</Table.Cell>
                  <Table.Cell>{data.descripcion}</Table.Cell>
                  <Table.Cell>{data.dimensiones}</Table.Cell>
                  <Table.Cell>{data.cantidad_ejes}</Table.Cell>
                  <Table.Cell>{data.capacidad_carga}</Table.Cell>
                  <Table.Cell>{data.capacidad_combustible}</Table.Cell>
                  <Link to='/abm/abmtipocamion/UpdateTipo'>
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