import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import '../css/Login2.css'

export default function Login2() {
  const [usuario, setUsuario] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [navAdmin, setNavAdmin] = useState(false);
  const [navTec, setNavTec] = useState(false);
  const [msgError, setMsgError] = useState('');
  const navigate = useNavigate();
  const cookies = new Cookies();
  
  const handleSubmit = e => {
    // Prevent the default submit and page reload
    e.preventDefault()

    // Handle validations
    axios
      .post("http://localhost:4000/api/empleados/logueo", { usuario, contrasenia })
      .then(response => {    
        if (response.data.length > 0) {
          cookies.set('usuario', response.data[0].usuario, {path: '/'});
          cookies.set('nombre_completo', response.data[0].nombre_completo, {path: '/'});
          cookies.set('tipo', response.data[0].Tipo, {path: '/'})
          
          if (response.data[0].Tipo === 'A'){
            setNavAdmin(!navAdmin);
          }
          else if(response.data[0].Tipo === 'T'){
            setNavTec(!navTec);
          }
        } else {
          setMsgError("El usuario o la contraseña no son correctos.");
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    if(navAdmin){
      navigate('/homeadmin');
    } else if (navTec) {
      navigate('/hometecnico');
    }
  });

  return (
    <div class="login-box">
      <h2>Iniciar sesión</h2>
      <form action="" id="login" method="post" onSubmit={handleSubmit}>
        <div class="user-box">
          <input
        type="text"
        name="usuario"
        id="usuario"
        required=""
        placeholder='Ingrese su usuario'
        value={usuario}
        onChange={e => setUsuario(e.target.value)}
        />
          <label for="usuario">Usuario</label>
        </div>
        <div class="user-box">
          <input
        type="password"
        name="contrasenia"
        id="contrasenia"
        placeholder='*********'
        required=""
        value={contrasenia}
        onChange={e => setContrasenia(e.target.value)}
        />
          <label for="contrasenia">Contraseña</label>
        </div>
        <button type="submit" href="#">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Ingresar
        </button>
      </form>
    </div>
  )
}