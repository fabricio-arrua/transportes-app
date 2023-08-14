import { Button, Form } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../../css/misBtns.css'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function CreateChofer() {
  const [usuario, setUsuario] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [licencia, setLicencia] = useState('');
  const [telefono, setTelefono] = useState('');
  const [nombre, setNombre] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if(cookies.get('tipo') !== 'A'){
      window.location.href='/';
    }
  }, [])

  const postData = () => {
		axios.post(`http://localhost:4000/api/empleados/altaChofer`, {
			usuario,
			contrasenia,
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
    <div className="App">
      <Link to='/abm/abmchoferes' className="Btn">
        Volver
      </Link>
      <div className="form-container">
        <h2 className="form-title">Registro de choferes</h2>
        <Form className="create-form">
          <Form.Field required>
            <label>Usuario</label>
            <input placeholder='Usuario' onChange={(e) => setUsuario(e.target.value)}/>
          </Form.Field>
          <Form.Field required>
            <label>Contraseña</label>
            <input type='password' placeholder='Contraseña' onChange={(e) => setContrasenia(e.target.value)}/>
          </Form.Field>
          <Form.Field required>
            <label>Nombre completo</label>
            <input placeholder='Nombre completo' onChange={(e) => setNombre(e.target.value)}/>
          </Form.Field>
          <Form.Field required>
            <label>Licencia</label>
            <input placeholder='Licencia' onChange={(e) => setLicencia(e.target.value)}/>
          </Form.Field>
          <Form.Field required>
            <label>Telefono</label>
            <input placeholder='Telefono' onChange={(e) => setTelefono(e.target.value)}/>
          </Form.Field>
          <Button className="submit-button" onClick={postData} type='submit'>Crear</Button>
        </Form>
      </div>
    </div>
  )
}