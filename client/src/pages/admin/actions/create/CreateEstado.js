import { Button, Form } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../../../css/misBtns.css'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function CreateEstado() {
  
  const [idEstado, setId] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if(cookies.get('tipo') !== 'A'){
      window.location.href='/';
    }
  }, [])

  const postData = () => {
		axios.post(`http://localhost:4000/api/estadoCamiones/altaEstadoCamion`, {
			idEstado,
      descripcion
		},
    {
      headers: {
        Authorization: cookies.get('token'), 
      },
    })
    .then(() => {
      navigate('/abm/abmestadocamion')
    })
  }

  return (
    <div className="App">
      <Link to='/abm/abmestadocamion' className="Btn">
        Volver
      </Link>
      <div className="form-container">
        <h2 className="form-title">Registro de estado camión</h2>
        <Form className="create-form">
          <Form.Field required>
            <label>Id</label>
            <input placeholder='Ingrese un identificador' onChange={(e) => setId(e.target.value)}/>
          </Form.Field>
          <Form.Field required>
            <label>Descripción</label>
            <input type='text' placeholder='Ingrese descripción' onChange={(e) => setDescripcion(e.target.value)}/>
          </Form.Field>
          <Button className="submit-button" onClick={postData} type='submit'>Crear</Button>
        </Form>
      </div>
    </div>
  )
}