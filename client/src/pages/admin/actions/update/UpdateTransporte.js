import { Button, Form } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../../../css/misBtns.css'
import Cookies from 'universal-cookie';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

const cookies = new Cookies();

export default function UpdateTransporte() {
  const [idTransporte, setId] = useState('');
  const [fechaInicio, setFechaInicio] = useState(new Date());
  const [fechaFin, setFechaFin] = useState();
  const [kmRecorridos, setKms] = useState('');
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [matricula, setMatricula] = useState('');
  const [cliente, setCliente] = useState('');
  const [idChofer, setChofer] = useState('');
  const [optMatricula, setOptMatricula] = useState([]);
  const [optCliente, setOptCliente] = useState([]);
  const [optChofer, setOptChofer] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if(cookies.get('tipo') !== 'A'){
      window.location.href='/';
    }
    
    setId(localStorage.getItem('Id'))
    setFechaInicio(new Date(localStorage.getItem('Inicio')));

    if(new Date(localStorage.getItem('Fin')).toString() === 'Invalid Date'){
      setFechaFin(new Date('2999-01-01 00:00:00'))
    } else {
      setFechaFin(new Date(localStorage.getItem('Fin')));
    }

    setKms(localStorage.getItem('Distancia'));
    setOrigen(localStorage.getItem('Origen'));
    setDestino(localStorage.getItem('Destino'));
    setMatricula(localStorage.getItem('Matricula'));
    setChofer(localStorage.getItem('Usuario'));
    setCliente(localStorage.getItem('Cliente'));

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
  }, []);

  const updateAPIData = () => {
    const fechaI = format(fechaInicio, 'yyyy-MM-dd HH:mm:ss');
    const fechaF = format(fechaFin, 'yyyy-MM-dd HH:mm:ss');

    axios.post(`http://localhost:4000/api/transportes/modificarTransporte`, {
      idTransporte,
      fechaInicio:fechaI,
      fechaFin:fechaF,
      kmRecorridos,
      origen,
      destino,
      matricula,
      cliente,
      idChofer
    },
    {
      headers: {
        Authorization: cookies.get('token'), 
      },
    }
    ).then(() => {
      navigate('/abm/abmtransportes')
    })
  }

  return (
    <div>
      <Link to='/abm/abmtransportes'>
        <button className='Btn'>Volver</button>
      </Link>
      &nbsp;
      <Form className="create-form">
        <Form.Field>
          <label>Id</label>
          <input readonly="readonly" value={idTransporte} onChange={(e) => setId(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Fecha Inicio</label>
          <DatePicker
            showTimeSelect
            minDate={new Date()}
            dateFormat="yyyy-MM-dd HH:mm:ss"
            selected={fechaInicio}
            onChange={fechaInicio => setFechaInicio(fechaInicio)}
          />
        </Form.Field>
        <Form.Field required>
          <label>Fecha Fin</label>
          <DatePicker
            showTimeSelect
            minDate={new Date()}
            dateFormat="yyyy-MM-dd HH:mm:ss"
            selected={fechaFin}
            onChange={fechaFin => setFechaFin(fechaFin)}
          />
        </Form.Field>
        <Form.Field>
          <label>Distancia</label>
          <input type='number' value={kmRecorridos} onChange={(e) => setKms(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Origen</label>
          <input type='text' value={origen} onChange={(e) => setOrigen(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Destino</label>
          <input type='text' value={destino} onChange={(e) => setDestino(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Matrícula</label>
          <div className="dropdown">
            <select
              value={matricula}
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
        <Form.Field>
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
          <Form.Field>
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
        <Button type='submit' onClick={updateAPIData}>Modificar</Button>
      </Form>
    </div>
  )
}