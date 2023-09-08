import { Button, Form } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../../../css/misBtns.css'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function UpdateTipo() {
  const [idTipo, setId] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [dimensiones, setDemensiones] = useState('');
  const [ejes, setEjes] = useState('');
  const [carga, setCarga] = useState('');
  const [combustible, setCombustible] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if(cookies.get('tipo') !== 'A'){
      window.location.href='/';
    }
    
    setId(localStorage.getItem('Id'))
    setDescripcion(localStorage.getItem('Desc'));
    setDemensiones(localStorage.getItem('Dimensiones'));
    setEjes(localStorage.getItem('Ejes'));
    setCarga(localStorage.getItem('Carga'));
    setCombustible(localStorage.getItem('Combustible'));
  }, []);

  const updateAPIData = () => {
    axios.post(`http://localhost:4000/api/tipoCamiones/modificarTipoCamion`, {
      idTipo,
      descripcion,
      dimensiones,
      ejes,
      carga,
      combustible
    },
    {
      headers: {
        Authorization: cookies.get('token'), 
      },
    }
    ).then(() => {
      navigate('/abm/abmtipocamion')
    })
  }

  return (
    <div>
      <Link to='/abm/abmtipocamion'>
        <button className='Btn'>Volver</button>
      </Link>
      &nbsp;
      <Form className="create-form">
        <Form.Field>
          <label>Id</label>
          <input readonly="readonly" value={idTipo} onChange={(e) => setId(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Descripción</label>
          <input type='text' value={descripcion} onChange={(e) => setDescripcion(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Dimensiones</label>
          <input type='text' value={dimensiones} onChange={(e) => setDemensiones(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Cantidad de ejes</label>
          <input type='number' value={ejes} onChange={(e) => setEjes(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Capacidad de carga (Kgs)</label>
          <input type='number' value={carga} onChange={(e) => setCarga(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Capacidad de combustible (Lts)</label>
          <input type='number' value={combustible} onChange={(e) => setCombustible(e.target.value)}/>
        </Form.Field>
        <Button type='submit' onClick={updateAPIData}>Modificar</Button>
      </Form>
    </div>
  )
}