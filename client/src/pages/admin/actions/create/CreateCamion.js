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
  const [id_estado, setEstado] = useState('');
  const [id_tipo, setTipo] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if(cookies.get('tipo') !== 'A'){
      window.location.href='/';
    }
  }, [])

  const postData = () => {
		axios.post(`http://localhost:4000/api/camiones/altaCamion`, {
			matricula,
			anio,
			marca,
			kilometros,
			id_estado,
      id_tipo
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
            <input placeholder='Matricula' onChange={(e) => setMatricula(e.target.value)}/>
          </Form.Field>
          <Form.Field required>
            <label>Año</label>
            <input placeholder='Año' onChange={(e) => setAnio(e.target.value)}/>
          </Form.Field>
          <Form.Field required>
            <label>Marca</label>
            <input placeholder='Marca' onChange={(e) => setMarca(e.target.value)}/>
          </Form.Field>
          <Form.Field required>
            <label>Kilometros</label>
            <input placeholder='Kilometros' onChange={(e) => setKilometros(e.target.value)}/>
          </Form.Field>
          <Form.Field required>
            <label>Estado</label>
            <input placeholder='Estado' onChange={(e) => setEstado(e.target.value)}/>
          </Form.Field>
          <Form.Field required>
            <label>Tipo</label>
            <input placeholder='Tipo' onChange={(e) => setTipo(e.target.value)}/>
          </Form.Field>
          <Button className="submit-button" onClick={postData} type='submit'>Crear</Button>
        </Form>
      </div>
    </div>
  )
}