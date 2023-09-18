import { Button, Form } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../../../css/misBtns.css'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function CreateTecnico() {
  const [usuario, setUsuario] = useState('');
  const [pass, setPass] = useState('');
  const [nombre, setNombre] = useState('');
  const [especializacion, setEspecializacion] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if(cookies.get('tipo') !== 'A'){
      window.location.href='/';
    }
  }, [])

  const postData = () => {
		axios.post(`http://localhost:4000/api/empleados/altaTecnico`, {
			usuario,
			pass,
			nombre,
      especializacion
		},
    {
      headers: {
        Authorization: cookies.get('token'), 
      },
    }).then(() => {
      navigate('/abm/abmtecnicos')
    }).catch(error => {
      console.error('Ha ocurrido un error:', error);
    })
  }

  return (
    <div className="App">
      <Link to='/abm/abmtecnicos' className="Btn">
        Volver
      </Link>
      <div className="form-container">
        <h2 className="form-title">Registro de tecnicos</h2>
        <Form className="create-form">
          <Form.Field required>
            <label>Usuario</label>
            <input placeholder='Usuario' onChange={(e) => setUsuario(e.target.value)}/>
          </Form.Field>
          <Form.Field required>
            <label>Contraseña</label>
            <input type='password' placeholder='Contraseña' onChange={(e) => setPass(e.target.value)}/>
          </Form.Field>
          <Form.Field required>
            <label>Nombre completo</label>
            <input placeholder='Nombre completo' onChange={(e) => setNombre(e.target.value)}/>
          </Form.Field>
          <Form.Field required>
            <label>Especialización</label>
            <input placeholder='Especialización' onChange={(e) => setEspecializacion(e.target.value)}/>
          </Form.Field>
          <Button className="submit-button" onClick={postData} type='submit'>Crear</Button>
        </Form>
      </div>
    </div>
  )
}