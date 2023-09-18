import React, { useState, useEffect } from 'react';
import { Table, Button } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../../css/misBtns.css';
import Cookies from 'universal-cookie';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';

const cookies = new Cookies();

export default function ABMTecnicos() {

  const [APIData, setAPIData] = useState([]);
  const [usuario, setUsuario] = useState('');
  
  useEffect(() => {
    if(cookies.get('tipo') !== 'A'){
      window.location.href='/';
    }

    console.log(cookies.get('token'));

    axios.get(`http://localhost:4000/api/empleados/listadoTecnico`, {
      headers: {
        Authorization: cookies.get('token'), 
      }})
      .then((response) => {
          setAPIData(response.data.listado);
      })
  }, [])

  const setData = (data) => {
    let { usuarioT, especializacion, nombre_completo } = data;
    localStorage.setItem('Usuario', usuarioT);
    localStorage.setItem('Especializacion', especializacion);
    localStorage.setItem('Nombre completo', nombre_completo)
  }

  const onDelete = (data) => {
    let { usuarioT } = data;
    localStorage.setItem('Usuario', usuarioT);
    setUsuario(localStorage.getItem('Usuario'))

    axios.post(`http://localhost:4000/api/empleados/bajaTecnico/`, {
      usuario
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
    axios.get(`http://localhost:4000/api/empleados/listadoTecnico`, {
      headers: {
        Authorization: cookies.get('token'), 
      }})
      .then((getData) => {
        setAPIData(getData.data.listado);
      })
  }

  return (
    <div>
      <Link to='/abm/abmtecnicos/createTecnico'>
        <button className='Btn'>Crear</button>
      </Link>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Usuario</Table.HeaderCell>
            <Table.HeaderCell>Especialización</Table.HeaderCell>
            <Table.HeaderCell>Nombre completo</Table.HeaderCell>
            <Table.HeaderCell>Modificar</Table.HeaderCell>
            <Table.HeaderCell>Eliminar</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Object.values(APIData).map((data) => {
            return (
              <Table.Row>
                  <Table.Cell>{data.usuarioT}</Table.Cell>
                  <Table.Cell>{data.especializacion}</Table.Cell>
                  <Table.Cell>{data.nombre_completo}</Table.Cell>
                  <Link to='/abm/abmtecnicos/UpdateTecnico'>
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