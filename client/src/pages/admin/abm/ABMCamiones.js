import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Table, Button, Header } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../../css/misBtns.css';
import Cookies from 'universal-cookie';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';

const cookies = new Cookies();

export default function ABMCamiones() {

  const [APIData, setAPIData] = useState([]);
  const [Error, setError] = useState([]);
  const [errorExists, setErrorExists] = useState(false);
  
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
        setError(response.data.message);
        setErrorExists(true);
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

  const clearError = () => {
      setError(null);
      setErrorExists(false);
  }

  return (
    <div>
      <Link to='/abm/abmcamiones/createCamion'>
        <button className='Btn'>Crear</button>
      </Link>

      <div>
        {errorExists
        ? <a>{Error}<button type='button' onClick={() => clearError()}><AiIcons.AiOutlineClose /></button></a>
        : <a></a>
        }
      </div>

      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Matricula</Table.HeaderCell>
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