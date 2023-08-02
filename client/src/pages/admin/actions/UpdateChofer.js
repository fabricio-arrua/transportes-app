import { Button, Form } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UpdateChofer() {
  const [usuario, setUsuario] = useState('');
	const [pass, setPassword] = useState('');
  const [licencia, setLicencia] = useState('');
  const [telefono, setTelefono] = useState('');
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    setUsuario(localStorage.getItem('Usuario'))
    setLicencia(localStorage.getItem('Licencia'));
    setTelefono(localStorage.getItem('Telefono'));
    setNombre(localStorage.getItem('Nombre completo'))
  }, []);

  const updateAPIData = () => {
    axios.post(`http://localhost:4000/api/empleados/modificarChofer`, {
      usuario,
			pass,
			nombre,
			licencia,
			telefono
    })
  }

  return (
      <div>
          <Form className="create-form">
              <Form.Field>
                  <label>Usuario</label>
                  <input placeholder='Usuario' value={usuario} onChange={(e) => setUsuario(e.target.value)}/>
              </Form.Field>
							<Form.Field>
                  <label>Contraseña</label>
                  <input type='password' placeholder='Contraseña' value={pass} onChange={(e) => setPassword(e.target.value)}/>
              </Form.Field>
							<Form.Field>
                  <label>Nombre completo</label>
                  <input placeholder='Nombre completo' value={nombre} onChange={(e) => setNombre(e.target.value)}/>
              </Form.Field>
              <Form.Field>
                  <label>Licencia</label>
                  <input placeholder='Licencia' value={licencia} onChange={(e) => setLicencia(e.target.value)}/>
              </Form.Field>
              <Form.Field>
                  <label>Telefono</label>
                  <input placeholder='Telefono' value={telefono} onChange={(e) => setTelefono(e.target.value)}/>
              </Form.Field>
              <Button type='submit' onClick={updateAPIData}>Modificar</Button>
          </Form>
      </div>
  )
}