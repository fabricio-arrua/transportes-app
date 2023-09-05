import React, { useState, useEffect } from 'react';
import { Table, Button } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../../css/misBtns.css';
import Cookies from 'universal-cookie';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';

const cookies = new Cookies();

export default function ABMClientes() {

  const [APIData, setAPIData] = useState([]);
  const [doc, setDoc] = useState('');
  
  useEffect(() => {
    if(cookies.get('tipo') !== 'A'){
      window.location.href='/';
    }

    axios.get(`http://localhost:4000/api/clientes/listarCliente`, {
      headers: {
        Authorization: cookies.get('token'), 
      }})
      .then((response) => {
          setAPIData(response.data.listado);
      })
  }, [])

  const setData = (data) => {
    let { documento, nombre_completo, direccion, telefono } = data;
    localStorage.setItem('Documento', documento);
    localStorage.setItem('Nombre', nombre_completo);
    localStorage.setItem('Direccion', direccion);
    localStorage.setItem('Telefono', telefono);
  }

  const onDelete = (data) => {
    let { documento } = data;
    localStorage.setItem('Documento', documento);
    setDoc(localStorage.getItem('Documento'))

    axios.post(`http://localhost:4000/api/clientes/eliminarCliente/`, {
      documento:doc
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
    axios.get(`http://localhost:4000/api/clientes/listarCliente`, {
      headers: {
        Authorization: cookies.get('token'), 
      }})
      .then((getData) => {
        setAPIData(getData.data.listado);
      })
  }

  return (
    <div>
      <Link to='/abm/abmclientes/createCliente'>
        <button className='Btn'>Crear</button>
      </Link>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Documento</Table.HeaderCell>
            <Table.HeaderCell>Nombre</Table.HeaderCell>
            <Table.HeaderCell>Direccion</Table.HeaderCell>
            <Table.HeaderCell>Telefono</Table.HeaderCell>
            <Table.HeaderCell>Modificar</Table.HeaderCell>
            <Table.HeaderCell>Eliminar</Table.HeaderCell>
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
                  <Link to='/abm/abmclientes/UpdateCliente'>
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