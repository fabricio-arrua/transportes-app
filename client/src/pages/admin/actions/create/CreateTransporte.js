import { Button, Form } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../../../css/misBtns.css'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function CreateTransporte() {
  
  const [fechaInicio, setFechaInicio] = useState('');
  const [kmRecorridos, setKms] = useState('');
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [matric, setMatricula] = useState('');
  const [cliente, setCliente] = useState('');
  const [idChofer, setChofer] = useState('');
  const [idAdmin, setAdmin] = useState('');
  const [optMatricula, setOptMatricula] = useState([]);
  const [optCliente, setOptCliente] = useState([]);
  const [optChofer, setOptChofer] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if(cookies.get('tipo') !== 'A'){
      window.location.href='/';
    }

    setAdmin(cookies.get('usuario'));

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

    axios.get(`http://localhost:4000/api/clientes/listarCliente`, {
      headers: {
        Authorization: cookies.get('token'),
      }})
    .then((response) => {
      setOptCliente(response.data.listado);
    })
    .catch((error) => {
      console.error('Error obteniendo datos desde API:', error);
    });

    axios.get(`http://localhost:4000/api/empleados/listadoChofer`, {
      headers: {
        Authorization: cookies.get('token'),
      }})
    .then((response) => {
      setOptChofer(response.data.listado);
    })
    .catch((error) => {
      console.error('Error obteniendo datos desde API:', error);
    });
  }, [])

  const postData = () => {
    if(idChofer == '') {
      axios.post(`http://localhost:4000/api/transportes/altaTransporteSinChofer`, {
        fechaInicio,
        kmRecorridos,
        origen,
        destino,
        matricula:matric,
        cliente,
        idAdmin
      },
      {
        headers: {
          Authorization: cookies.get('token'), 
        },
      })
      .then(() => {
        navigate('/abm/abmtransportes')
      })
    } else {
      axios.post(`http://localhost:4000/api/transportes/altaTransporteConChofer`, {
        fechaInicio,
        kmRecorridos,
        origen,
        destino,
        matricula:matric,
        cliente,
        idChofer,
        idAdmin
      },
      {
        headers: {
          Authorization: cookies.get('token'), 
        },
      })
      .then(() => {
        navigate('/abm/abmtransportes')
      })
    }
  }

  return (
    <div className="App">
      <Link to='/abm/abmtransportes' className="Btn">
        Volver
      </Link>
      <div className="form-container">
        <h2 className="form-title">Registro de transportes</h2>
        <Form className="create-form">
          <Form.Field required>
            <label>Fecha/Hora Inicio</label>
            <input type='text' placeholder='Ingrese fecha y hora de inicio' onChange={(e) => setFechaInicio(e.target.value)}/>
          </Form.Field>
          <Form.Field required>
            <label>Kms a recorrer</label>
            <input type='text' placeholder='Ingrese cantidad de kilometros a recorrer' onChange={(e) => setKms(e.target.value)}/>
          </Form.Field>
          <Form.Field required>
            <label>Origen</label>
            <input type='text' placeholder='Ingrese origen de transporte' onChange={(e) => setOrigen(e.target.value)}/>
          </Form.Field>
          <Form.Field required>
            <label>Destino</label>
            <input type='text' placeholder='Ingrese destino de transporte' onChange={(e) => setDestino(e.target.value)}/>
          </Form.Field>
          <Form.Field required>
            <label>Matrícula</label>
            <div className="dropdown">
              <select
                value={matric}
                onChange={(e) => setMatricula(e.target.value)}
              >
                <option value="">Seleccione una matrícula</option>
                {optMatricula.map((option) => (
                  <option key={option.matricula} value={option.matricula}>
                    {option.matricula}
                  </option>
                ))}
              </select>
            </div>
          </Form.Field>
          <Form.Field required>
            <label>Cliente</label>
            <div className="dropdown">
              <select
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
              >
                <option value="">Seleccione un cliente</option>
                {optCliente.map((option) => (
                  <option key={option.documento} value={option.documento}>
                    {option.nombre_completo}
                  </option>
                ))}
              </select>
            </div>
          </Form.Field>
          <Form.Field required>
            <label>Chofer</label>
            <div className="dropdown">
              <select
                value={idChofer}
                onChange={(e) => setChofer(e.target.value)}
              >
                <option value="">Seleccione un chofer</option>
                {optChofer.map((option) => (
                  <option key={option.usuarioC} value={option.usuarioC}>
                    {option.nombre_completo}
                  </option>
                ))}
              </select>
            </div>
          </Form.Field>
          <Button className="submit-button" onClick={postData} type='submit'>Crear</Button>
        </Form>
      </div>
    </div>
  )
}