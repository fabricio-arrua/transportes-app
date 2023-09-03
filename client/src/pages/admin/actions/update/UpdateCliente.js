import { Button, Form } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../../../css/misBtns.css'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function UpdateCliente() {
  const [documento, setDocumento] = useState('');
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if(cookies.get('tipo') !== 'A'){
      window.location.href='/';
    }
    
    setDocumento(localStorage.getItem('Documento'))
    setNombre(localStorage.getItem('Nombre'));
    setDireccion(localStorage.getItem('Direccion'));
    setTelefono(localStorage.getItem('Telefono'));
  }, []);

  const updateAPIData = () => {
    axios.post(`http://localhost:4000/api/clientes/modificarCliente`, {
      documento,
			nombre,
			direccion,
      telefono
    },
    {
      headers: {
        Authorization: cookies.get('token'), 
      },
    }
    ).then(() => {
      navigate('/abm/abmclientes')
    })
  }

  return (
    <div>
      <Link to='/abm/abmclientes'>
        <button className='Btn'>Volver</button>
      </Link>
      &nbsp;
      <Form className="create-form">
        <Form.Field>
          <label>Documento</label>
          <input readonly="readonly" value={documento} onChange={(e) => setDocumento(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Nombre completo</label>
          <input type='text' placeholder='Ingrese nombre completo' value={nombre} onChange={(e) => setNombre(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Dirección</label>
          <input placeholder='Ingrese la dirección' value={direccion} onChange={(e) => setDireccion(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Teléfono</label>
          <input type='number' placeholder='Teléfono de contacto' value={telefono} onChange={(e) => setTelefono(e.target.value)}/>
        </Form.Field>
        <Button type='submit' onClick={updateAPIData}>Modificar</Button>
      </Form>
    </div>
  )
}