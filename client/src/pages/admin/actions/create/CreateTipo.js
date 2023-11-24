import { Button, Form } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../../../css/misBtns.css'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function CreateTipo() {
  
  const [idTipo, setId] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [dimensiones, setDemensiones] = useState('');
  const [ejes, setEjes] = useState('');
  const [carga, setCarga] = useState('');
  const [combustible, setCombustible] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if(cookies.get('tipo') !== 'A'){
      window.location.href='/';
    }
  }, [])

  const postData = () => {
		axios.post(`http://localhost:4000/api/tipoCamiones/altaTipoCamion`, {
			idTipo,
      descripcion,
      dimensiones,
      ejes,
      carga,
      combustible
		},
    {
      headers: {
        Authorization: cookies.get('token'), 
      },
    })
    .then(() => {
      navigate('/abm/abmtipocamion')
    })
  }

  return (
    <div className="App">
      <Link to='/abm/abmtipocamion' className="Btn">
        Volver
      </Link>
      <div className="form-container">
        <h2 className="form-title">Registro de estado camión</h2>
        <Form className="create-form">
          <Form.Field required>
            <label>Id</label>
            <input placeholder='Ingrese un identificador' onChange={(e) => setId(e.target.value.toUpperCase())}/>
          </Form.Field>
          <Form.Field required>
            <label>Descripción</label>
            <input type='text' placeholder='Ingrese descripción' onChange={(e) => setDescripcion(e.target.value)}/>
          </Form.Field>
          <Form.Field required>
            <label>Dimensiones</label>
            <input type='text' placeholder='Ingrese dimensiones' onChange={(e) => setDemensiones(e.target.value)}/>
          </Form.Field>
          <Form.Field required>
            <label>Cantidad de ejes</label>
            <input type='number' placeholder='Ingrese cantidad de ejes' onChange={(e) => setEjes(e.target.value)}/>
          </Form.Field>
          <Form.Field required>
            <label>Capacidad de carga (Kgs)</label>
            <input type='number' placeholder='Ingrese capacidad de carga en kilogramos' onChange={(e) => setCarga(e.target.value)}/>
          </Form.Field>
          <Form.Field required>
            <label>Capacidad de combustible (Lts)</label>
            <input type='number' placeholder='Ingrese capacidad de combustible en litros' onChange={(e) => setCombustible(e.target.value)}/>
          </Form.Field>
          <Button className="submit-button" onClick={postData} type='submit'>Crear</Button>
        </Form>
      </div>
    </div>
  )
}