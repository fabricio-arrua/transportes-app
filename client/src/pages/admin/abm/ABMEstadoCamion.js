import React, { useState, useEffect } from 'react';
import { Table, Button } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../../css/misBtns.css';
import Cookies from 'universal-cookie';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';

const cookies = new Cookies();

export default function ABMEstadoCamion() {

  const [APIData, setAPIData] = useState([]);
  const [idEstado, setId] = useState('');
  
  useEffect(() => {
    if(cookies.get('tipo') !== 'A'){
      window.location.href='/';
    }

    axios.get(`http://localhost:4000/api/estadoCamiones/listadoEstadoCamion`, {
      headers: {
        Authorization: cookies.get('token'), 
      }})
      .then((response) => {
          setAPIData(response.data.listado);
      })
  }, [])

  const setData = (data) => {
    let { id_estado, descripcion } = data;
    localStorage.setItem('Id', id_estado);
    localStorage.setItem('Desc', descripcion);
  }

  const onDelete = (data) => {
    let { id_estado } = data;
    localStorage.setItem('Id', id_estado);
    setId(localStorage.getItem('Id'))

    axios.post(`http://localhost:4000/api/estadoCamiones/eliminarEstadoCamion/`, {
      idEstado
    },
    {
      headers: {
        Authorization: cookies.get('token'), 
      },
    }
    ).then(() => {
      getData();
    })
  }

  const getData = () => {
    axios.get(`http://localhost:4000/api/estadoCamiones/listadoEstadoCamion`, {
      headers: {
        Authorization: cookies.get('token'), 
      }})
      .then((getData) => {
        setAPIData(getData.data.listado);
      })
  }

  return (
    <div>
      <Link to='/abm/abmestadocamion/CreateEstado'>
        <button className='Btn'>Crear</button>
      </Link>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Descripcion</Table.HeaderCell>
            <Table.HeaderCell>Modificar</Table.HeaderCell>
            <Table.HeaderCell>Eliminar</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Object.values(APIData).map((data) => {
            return (
              <Table.Row>
                  <Table.Cell>{data.id_estado}</Table.Cell>
                  <Table.Cell>{data.descripcion}</Table.Cell>
                  <Link to='/abm/abmestadocamion/UpdateEstado'>
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