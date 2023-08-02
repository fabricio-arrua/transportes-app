import { Button, Form } from 'semantic-ui-react'
import React, { useState } from 'react';
import axios from 'axios';

export default function CreateChofer() {
  const [usuario, setUsuario] = useState('');
	const [pass, setPassword] = useState('');
  const [licencia, setLicencia] = useState('');
  const [telefono, setTelefono] = useState('');
  const [nombre, setNombre] = useState('');

  const postData = () => {
		axios.post(`http://localhost:4000/api/empleados/altaChofer`, {
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
                  <input placeholder='Usuario' onChange={(e) => setUsuario(e.target.value)}/>
              </Form.Field>
							<Form.Field>
                  <label>Contraseña</label>
                  <input type='password' placeholder='Contraseña' onChange={(e) => setPassword(e.target.value)}/>
              </Form.Field>
							<Form.Field>
                  <label>Nombre completo</label>
                  <input placeholder='Nombre completo' onChange={(e) => setNombre(e.target.value)}/>
              </Form.Field>
              <Form.Field>
                  <label>Licencia</label>
                  <input placeholder='Licencia' onChange={(e) => setLicencia(e.target.value)}/>
              </Form.Field>
              <Form.Field>
                  <label>Telefono</label>
                  <input placeholder='Telefono' onChange={(e) => setTelefono(e.target.value)}/>
              </Form.Field>
              <Button onClick={postData} type='submit'>Crear</Button>
          </Form>
      </div>
  )
}