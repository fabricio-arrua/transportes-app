import { Button, Form } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../../css/misBtns.css'

export default function ModPassword() {
  const [usuario, setUsuario] = useState('');
	const [pass, setPassword] = useState('');
  const [pass2, setPassword2] = useState('');
  const [msgError, setMsgError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    setUsuario(localStorage.getItem('Usuario'))
  }, []);

  const updateAPIData = () => {
    if(pass === pass2) {
      axios.post(`http://localhost:4000/api/empleados/ModificarContrasenia`, {
        usuario,
        pass
      }).then(() => {
        navigate('/abm/abmchoferes')
      }).catch(error => {
        console.log(error);
      })
    } else {
      setMsgError("Las contraseñas no coinciden, vuelva a intentarlo.");
    }
  }

  return (
    <div>
      <Link to='/abm/abmchoferes'>
        <button className='Btn'>Volver</button>
      </Link>
      &nbsp;
      <Form className="create-form">
        <Form.Field>
          <label>Usuario</label>
          <input placeholder='Usuario' readonly="readonly" value={usuario} onChange={(e) => setUsuario(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Nueva contraseña</label>
          <input placeholder='Nueva contraseña' value={pass} onChange={(e) => setPassword(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Confirmar contraseña</label>
          <input placeholder='Confirmar contraseña' value={pass2} onChange={(e) => setPassword2(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <span className="texto-error">{msgError}</span>
        </Form.Field>
        <Button type='submit' onClick={updateAPIData}>Modificar</Button>
      </Form>
    </div>
  )
}