import React, { useState, useEffect } from 'react';
import { Table, Button } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../../css/misBtns.css';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function ABMCamiones() {

  const [APIData, setAPIData] = useState([]);
  const [matric, setMatricula] = useState('');
  
  useEffect(() => {
    if(cookies.get('tipo') !== 'A'){
      window.location.href='/';
    }

    axios.get(`http://localhost:4000/api/camiones/listarCamion`, {
      headers: {
        Authorization: cookies.get('token'), 
      }})
      .then((response) => {
          console.log(response.data.listado);
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
    localStorage.setItem('Matricula', matricula);
    setMatricula(localStorage.getItem('Matricula'))

    axios.post(`http://localhost:4000/api/camiones/eliminarCamion/`, {
      matric
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
                      <Button onClick={() => setData(data)}>Modificar</Button>
                    </Table.Cell>
                  </Link>
                  <Table.Cell>
                    <Button onClick={() => {onDelete(data);}}>Eliminar</Button>
                  </Table.Cell>
                </Table.Row>
          )})}
        </Table.Body>
      </Table>
    </div>
  )
}