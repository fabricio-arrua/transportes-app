import { Button, Form } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../../../css/misBtns.css'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function CreateCamion() {
  
  const [matricula, setMatricula] = useState('');
  const [anio, setAnio] = useState('');
  const [marca, setMarca] = useState('');
  const [kilometros, setKilometros] = useState('');
  const [idEstado, setEstado] = useState('');
  const [idTipoCamion, setTipo] = useState('');
  const [optEstado, setOptEstado] = useState([]);
  const [optTipo, setOptTipo] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if(cookies.get('tipo') !== 'A'){
      window.location.href='/';
    }

    axios.get(`http://localhost:4000/api/estadoCamiones/listadoEstadoCamion`, {
      headers: {
        Authorization: cookies.get('token'), 
      }})
    .then((response) => {
      setOptEstado(response.data.listado);
    })
    .catch((error) => {
      console.error('Error obteniendo datos desde API:', error);
    });

    axios.get(`http://localhost:4000/api/tipoCamiones/listadoTipoCamion`, {
      headers: {
        Authorization: cookies.get('token'), 
      }})
    .then((response) => {
      setOptTipo(response.data.listado);
    })
    .catch((error) => {
      console.error('Error obteniendo datos desde API:', error);
    });
  }, [])

  const postData = () => {
		axios.post(`http://localhost:4000/api/camiones/altaCamion`, {
			matricula,
			anio,
			marca,
			kilometros,
			idEstado,
      idTipoCamion
		},
    {
      headers: {
        Authorization: cookies.get('token'), 
      },
    })
    .then(() => {
      navigate('/abm/abmcamiones')
    })
  }

  return (
    <div className="App">
      <Link to='/abm/abmcamiones' className="Btn">
        Volver
      </Link>
      <div className="form-container">
        <h2 className="form-title">Registro de camiones</h2>
        <Form className="create-form">
          <Form.Field required>
            <label>Matricula</label>
            <input placeholder='ej: ABC1234' onChange={(e) => setMatricula(e.target.value.toUpperCase())}/>
          </Form.Field>
          <Form.Field required>
            <label>Año</label>
            <input type='number' min='1950' placeholder='2023' onChange={(e) => setAnio(e.target.value)}/>
          </Form.Field>
          <Form.Field required>
            <label>Marca</label>
            <input type='text' placeholder='Ingrese una marca' onChange={(e) => setMarca(e.target.value)}/>
          </Form.Field>
          <Form.Field required>
            <label>Kilometros</label>
            <input type='number' min='0' placeholder='Cantidad de kilometros' onChange={(e) => setKilometros(e.target.value)}/>
          </Form.Field>
          <Form.Field required>
            <label>Estado</label>
            <div className="dropdown">
              <select
                value={idEstado}
                onChange={(e) => setEstado(e.target.value)}
              >
                <option value="">Seleccione un estado</option>
                {optEstado.map((option) => (
                  <option key={option.id_estado} value={option.id_estado}>
                    {option.descripcion}
                  </option>
                ))}
              </select>
            </div>
          </Form.Field>
          <Form.Field required>
            <label>Tipo</label>
            <div className="dropdown">
              <select
                value={idTipoCamion}
                onChange={(e) => setTipo(e.target.value)}
              >
                <option value="">Seleccione un tipo</option>
                {optTipo.map((option) => (
                  <option key={option.id_estado} value={option.id_tipo}>
                    {option.descripcion}
                  </option>
                ))}
              </select>
            </div>
          </Form.Field>
          <Button className="submit-button" onClick={postData} type='submit'>Crear</Button>
        </Form>
      </div>
    </div>
  )
}