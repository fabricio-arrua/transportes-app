import React, { Component } from 'react'
import "../css/Login.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Cookies from 'universal-cookie';

const baseUrl = 'http://localhost:4000/api/empleados/logueo';
const cookies = new Cookies();

class Login extends Component {
  state = {
    form: {
      username: '',
      password: ''
    }
  }

  handleChange = async e => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    })
    console.log(this.state.form);
  }

  iniciarSesion = async () => {
    await axios.get(baseUrl, {params: {usuario: this.state.form.username, contrasenia: this.state.form.password}})
    .then(response => {

      if (response.data.message != 'Datos ingresados incorrectos') {

        cookies.set('usuario', response.data.usuario, {path: '/'});
        cookies.set('nombre_completo', response.data.nombre_completo, {path: '/'});

        alert(`Bienvenido ${response.data.nombre_completo}`);

        window.location.href='./menu';
      } else {
        alert('El usuario o la contraseña no son correctos.');
      }
    })
    .catch(error => {
      console.log(error);
    })
  }

  componentDidMount() { 
    if(cookies.get('usuario')){
      window.location.href='./menu';
    }
   }

  render() {
    return (
      <div className='containerPrincipal'>
        <div className='containerSecundario'>
            <div className='form-group'>
              <label>Usuario: </label>
              <br />
              <input
                type='text'
                className='form-control'
                name='username'
                onChange={this.handleChange}
              />
              <br />
              <label>Contraseña: </label>
              <br />
              <input
                type='password'
                className='form-control'
                name='password'
                onChange={this.handleChange}
              />
              <br />
              <button className='btn btn-primary' onClick={() => this.iniciarSesion()}>Iniciar sesión</button>
            </div>
        </div>
      </div>
    );
  }
}

export default Login;