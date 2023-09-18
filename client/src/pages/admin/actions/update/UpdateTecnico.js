import { Button, Form } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../../../css/misBtns.css'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function UpdateTecnico() {
  const [usuario, setUsuario] = useState('');
  const [especializacion, setEspecializacion] = useState('');
  const [nombre, setNombre] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if(cookies.get('tipo') !== 'A'){
      window.location.href='/';
    }
    
    setUsuario(localStorage.getItem('Usuario'))
    setEspecializacion(localStorage.getItem('Especializacion'));
    setNombre(localStorage.getItem('Nombre completo'))
  }, []);

  const updateAPIData = () => {
    axios.post(`http://localhost:4000/api/empleados/modificarTecnico`, {
      usuario,
			nombre,
			especializacion
    },
    {
      headers: {
        Authorization: cookies.get('token'), 
      },
    }
    ).then(() => {
      navigate('/abm/abmtecnicos')
    })
  }

  return (
    <div>
      <Link to='/abm/abmtecnicos'>
        <button className='Btn'>Volver</button>
      </Link>
      &nbsp;
      <Form className="create-form">
        <Form.Field>
          <label>Usuario</label>
          <input placeholder='Usuario' readonly="readonly" value={usuario} onChange={(e) => setUsuario(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Nombre completo</label>
          <input placeholder='Nombre completo' value={nombre} onChange={(e) => setNombre(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Especialización</label>
          <input placeholder='Especialización' value={especializacion} onChange={(e) => setEspecializacion(e.target.value)}/>
        </Form.Field>
        <Button type='submit' onClick={updateAPIData}>Modificar</Button>
      </Form>
      &nbsp;
      <Link to='/abm/modPassword'>
        <button className='Btn'>Cambiar contraseña</button>
      </Link>
    </div>
  )
}