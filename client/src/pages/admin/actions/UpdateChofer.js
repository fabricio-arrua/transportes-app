import { Button, Form } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../../css/misBtns.css'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function UpdateChofer() {
  const [usuario, setUsuario] = useState('');
  const [licencia, setLicencia] = useState('');
  const [telefono, setTelefono] = useState('');
  const [nombre, setNombre] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if(cookies.get('tipo') !== 'A'){
      window.location.href='/';
    }
    
    setUsuario(localStorage.getItem('Usuario'))
    setLicencia(localStorage.getItem('Licencia'));
    setTelefono(localStorage.getItem('Telefono'));
    setNombre(localStorage.getItem('Nombre completo'))
  }, []);

  const updateAPIData = () => {
    axios.post(`http://localhost:4000/api/empleados/modificarChofer`, {
      usuario,
			nombre,
			licencia,
			telefono
    },
    {
      headers: {
        Authorization: cookies.get('token'), 
      },
    }
    ).then(() => {
      navigate('/abm/abmchoferes')
    })
  }

  return (
    <div>
      <Link to='/abm/abmchoferes'>
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
          <label>Licencia</label>
          <input placeholder='Licencia' value={licencia} onChange={(e) => setLicencia(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Telefono</label>
          <input placeholder='Telefono' value={telefono} onChange={(e) => setTelefono(e.target.value)}/>
        </Form.Field>
        <Button type='submit' onClick={updateAPIData}>Modificar</Button>
      </Form>
      &nbsp;
      <Link to='/abm/abmchoferes/modPassword'>
        <button className='Btn'>Cambiar contraseña</button>
      </Link>
    </div>
  )
}