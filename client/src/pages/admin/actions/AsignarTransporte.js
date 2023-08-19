import { Button, Form } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../../css/misBtns.css'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function AsignarTransporte() {
  const [usuario, setUsuario] = useState('');
  const [transporte, setTransporte] = useState('');
  const [camion, setCamion] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if(cookies.get('tipo') !== 'A'){
      window.location.href='/';
    }
    
    setUsuario(localStorage.getItem('Usuario'))
  }, []);

  const updateAPIData = () => {
    axios.post(`http://localhost:4000/api/transportes/asignarTransporte`, {
			transporte,
      usuario,
			camion
    },
    {
      headers: {
        Authorization: cookies.get('token'), 
      },
    }
    ).then(() => {
      navigate('/listadochoferessintransporte')
    })
  }

  return (
    <div>
      <Link to='/listadochoferessintransporte'>
        <button className='Btn'>Volver</button>
      </Link>
      &nbsp;
      <Form className="create-form">
        <Form.Field>
          <label>Usuario</label>
          <input placeholder='Usuario' readonly="readonly" value={usuario} onChange={(e) => setUsuario(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Transporte</label>
          <input placeholder='Ingrese id transporte' onChange={(e) => setTransporte(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Camión</label>
          <input placeholder='Ingrese matricula de camión' onChange={(e) => setCamion(e.target.value)}/>
        </Form.Field>
        <Button type='submit' onClick={updateAPIData}>Asignar</Button>
      </Form>
    </div>
  )
}