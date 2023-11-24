import { Button, Form } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../../css/misBtns.css'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function AsignarTransporte() {
  const [usuario, setUsuario] = useState('');
  const [id_transporte, setTransporte] = useState('');
  const [matricula, setMatricula] = useState('');
  const [optTransporte, setOptTransporte] = useState([]);
  const [optMatricula, setOptMatricula] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if(cookies.get('tipo') !== 'A'){
      window.location.href='/';
    }
    
    setUsuario(localStorage.getItem('Usuario'))

    axios.get(`http://localhost:4000/api/transportes/listadoTransporteSinChofer`, {
      headers: {
        Authorization: cookies.get('token'), 
      }})
      .then((response) => {
        setOptTransporte(response.data.listado);
      })
      .catch((error) => {
        console.error('Error obteniendo datos desde API:', error);
      });
    
    axios.get(`http://localhost:4000/api/camiones/listarCamion`, {
      headers: {
        Authorization: cookies.get('token'), 
      }})
      .then((response) => {
        setOptMatricula(response.data.listado);
      })
      .catch((error) => {
        console.error('Error obteniendo datos desde API:', error);
      });
  }, []);

  const updateAPIData = () => {
    axios.post(`http://localhost:4000/api/transportes/asignarTransporte`, {
			idTransporte:id_transporte,
      idChofer:usuario,
			idCamion:matricula
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
          <div className="dropdown">
            <select
              value={id_transporte}
              onChange={(e) => setTransporte(e.target.value)}
            >
              <option value="">Seleccione un Transporte</option>
              {optTransporte.map((option) => (
                <option key={option.id_transporte} value={option.id_transporte}>
                  Origen:{option.origen} / Destino:{option.destino} / Cliente:{option.documentoCliente}
                </option>
              ))}
            </select>
          </div>
        </Form.Field>
        <Form.Field>
          <label>Matrícula</label>
          <div className="dropdown">
            <select
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
            >
              <option value="">Seleccione un camión</option>
              {optMatricula.map((option) => (
                <option key={option.matricula} value={option.matricula}>
                  Matrícula:{option.matricula} / Marca:{option.marca} / Tipo:{option.id_tipo}
                </option>
              ))}
            </select>
          </div>
        </Form.Field>
        <Button type='submit' onClick={updateAPIData}>Asignar</Button>
      </Form>
    </div>
  )
}