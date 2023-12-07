import { Button, Form } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../../../css/misBtns.css'
import Cookies from 'universal-cookie';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const cookies = new Cookies();

export default function CreateCamion() {
  
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
  }, [])

  const postData = () => {
		axios.post(`http://localhost:4000/api/camiones/altaCamion`, {
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
    }).then((response) => {

      if(response.data.message === 'Alta realizada con éxito'){
          navigate('/abm/abmcamiones');
      } else {
        toast.error(response.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      }

    }).catch(function (error) {
      if (error.response) {
        console.log(error.response.data + 'error.response.data');
        toast.error(error.response.data, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
        console.log(error.response.status + 'error.response.status');
        toast.error('Error comuniquese con sistemas', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
        console.log(error.response.header + 'error.response.header');
        toast.error(error.response.headers, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      } else if (error.request) {
        console.log(error.request + 'error.request');
        toast.error(error.request, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      } else {
        console.log(error.message + 'error.message');
        toast.error(error.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      }
      console.log(error.config + 'error.config');
      toast.error(error.config, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    });
  }

  return (
    <div className="App">
      <Link to='/abm/abmcamiones' className="Btn">
        Volver
      </Link>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        />

      <div className="form-container">
        <h2 className="form-title">Registro de camiones</h2>
        <Form className="create-form">
          <Form.Field required>
            <label>Matricula</label>
            <input placeholder='ej: ABC1234'
              pattern='[A-Za-z]{3}[0-9]{4}'
              maxLength={7}
              title='Debe contener 3 letras y 4 números'
              onChange={(e) => setMatricula(e.target.value.toUpperCase())
            }/>
          </Form.Field>
          <Form.Field required>
            <label>Año</label>
            <input type='number' 
              required min='1950'
              placeholder='2023'
              onChange={(e) => setAnio(e.target.value)
            }/>
          </Form.Field>
          <Form.Field required>
            <label>Marca</label>
            <input type='text'
              placeholder='Ingrese una marca'
              onChange={(e) => setMarca(e.target.value)
            }/>
          </Form.Field>
          <Form.Field required>
            <label>Kilometros</label>
            <input type='number'
              required min='0'
              placeholder='Cantidad de kilometros'
              onChange={(e) => setKilometros(e.target.value)
            }/>
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
          <Button className="submit-button" onClick={postData} type='submit'>Crear</Button>
        </Form>
      </div>
    </div>
  )
}