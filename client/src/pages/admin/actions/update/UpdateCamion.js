import { Button, Form } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../../../css/misBtns.css'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function UpdateCamion() {
  const [matricula, setMatricula] = useState('');
  const [anio, setAnio] = useState('');
  const [marca, setMarca] = useState('');
  const [kilometros, setKilometros] = useState('');
  const [idEstado, setEstado] = useState('');
  const [idTipoCamion, setTipo] = useState('');
  const [optEstado, setOptEstado] = useState([]);
  const [optTipo, setOptTipo] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if(cookies.get('tipo') !== 'A'){
      window.location.href='/';
    }
    
    setMatricula(localStorage.getItem('Matricula'))
    setAnio(localStorage.getItem('Año'));
    setMarca(localStorage.getItem('Marca'));
    setKilometros(localStorage.getItem('Kilometros'));
    setEstado(localStorage.getItem('Estado'));
    setTipo(localStorage.getItem('Tipo'));

    axios.get(`http://localhost:4000/api/estadoCamiones/listadoEstadoCamion`, {
      headers: {
        Authorization: cookies.get('token'), 
      }})
    .then((response) => {
      setOptEstado(response.data.listado);
    })
    .catch((error) => {
      console.error('Error obteniendo datos desde API:', error);
    });

    axios.get(`http://localhost:4000/api/tipoCamiones/listadoTipoCamion`, {
      headers: {
        Authorization: cookies.get('token'), 
      }})
    .then((response) => {
      setOptTipo(response.data.listado);
    })
    .catch((error) => {
      console.error('Error obteniendo datos desde API:', error);
    });
  }, []);

  const updateAPIData = () => {
    axios.post(`http://localhost:4000/api/camiones/modificarCamion`, {
      matricula,
			anio,
			marca,
      kilometros,
      idEstado,
			idTipoCamion
    },
    {
      headers: {
        Authorization: cookies.get('token'), 
      },
    }
    ).then(() => {
      navigate('/abm/abmcamiones')
    })
  }

  return (
    <div>
      <Link to='/abm/abmcamiones'>
        <button className='Btn'>Volver</button>
      </Link>
      &nbsp;
      <Form className="create-form">
        <Form.Field>
          <label>Matricula</label>
          <input placeholder='Matricula' readonly="readonly" value={matricula} onChange={(e) => setMatricula(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Año</label>
          <input type='number' placeholder='Año' value={anio} onChange={(e) => setAnio(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Marca</label>
          <input placeholder='Marca' value={marca} onChange={(e) => setMarca(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Kilometros</label>
          <input type='number' placeholder='Kilometros' value={kilometros} onChange={(e) => setKilometros(e.target.value)}/>
        </Form.Field>
        <Form.Field required>
            <label>Estado</label>
            <div className="dropdown">
              <select
                value={idEstado}
                onChange={(e) => setEstado(e.target.value)}
              >
                <option value="">Seleccione un estado</option>
                {optEstado.map((option) => (
                  <option key={option.id_estado} value={option.id_estado}>
                    {option.descripcion}
                  </option>
                ))}
              </select>
            </div>
          </Form.Field>
          <Form.Field required>
            <label>Tipo</label>
            <div className="dropdown">
              <select
                value={idTipoCamion}
                onChange={(e) => setTipo(e.target.value)}
              >
                <option value="">Seleccione un tipo</option>
                {optTipo.map((option) => (
                  <option key={option.id_estado} value={option.id_tipo}>
                    {option.descripcion}
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