import { Button, Form } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../../../css/misBtns.css'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function CreateCliente() {
  
  const [documento, setDocumento] = useState('');
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if(cookies.get('tipo') !== 'A'){
      window.location.href='/';
    }
  }, [])

  const postData = () => {
		axios.post(`http://localhost:4000/api/clientes/altaCliente`, {
			documento,
			nombre,
			direccion,
			telefono
		},
    {
      headers: {
        Authorization: cookies.get('token'), 
      },
    })
    .then(() => {
      navigate('/abm/abmclientes')
    })
  }

  return (
    <div className="App">
      <Link to='/abm/abmclientes' className="Btn">
        Volver
      </Link>
      <div className="form-container">
        <h2 className="form-title">Registro de clientes</h2>
        <Form className="create-form">
          <Form.Field required>
            <label>Documento</label>
            <input placeholder='Ingrese el documento' onChange={(e) => setDocumento(e.target.value)}/>
          </Form.Field>
          <Form.Field required>
            <label>Nombre completo</label>
            <input type='text' placeholder='Ingrese nombre completo' onChange={(e) => setNombre(e.target.value)}/>
          </Form.Field>
          <Form.Field required>
            <label>Direccion</label>
            <input type='text' placeholder='Ingrese la dirección' onChange={(e) => setDireccion(e.target.value)}/>
          </Form.Field>
          <Form.Field required>
            <label>Teléfono</label>
            <input type='number' placeholder='Teléfono de contacto' onChange={(e) => setTelefono(e.target.value)}/>
          </Form.Field>
          <Button className="submit-button" onClick={postData} type='submit'>Crear</Button>
        </Form>
      </div>
    </div>
  )
}