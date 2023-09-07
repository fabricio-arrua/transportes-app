import { Button, Form } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../../../css/misBtns.css'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function UpdateEstado() {
  const [idEstado, setId] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if(cookies.get('tipo') !== 'A'){
      window.location.href='/';
    }
    
    setId(localStorage.getItem('Id'))
    setDescripcion(localStorage.getItem('Desc'));
  }, []);

  const updateAPIData = () => {
    axios.post(`http://localhost:4000/api/estadoCamiones/modificarEstadoCamion`, {
      idEstado,
			descripcion
    },
    {
      headers: {
        Authorization: cookies.get('token'), 
      },
    }
    ).then(() => {
      navigate('/abm/abmestadocamion')
    })
  }

  return (
    <div>
      <Link to='/abm/abmestadocamion'>
        <button className='Btn'>Volver</button>
      </Link>
      &nbsp;
      <Form className="create-form">
        <Form.Field>
          <label>Id</label>
          <input readonly="readonly" value={idEstado} onChange={(e) => setId(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Descripción</label>
          <input type='text' value={descripcion} onChange={(e) => setDescripcion(e.target.value)}/>
        </Form.Field>
        <Button type='submit' onClick={updateAPIData}>Modificar</Button>
      </Form>
    </div>
  )
}