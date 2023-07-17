import React, { Component } from 'react'
import "../css/Login.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";

const baseUrl = 'http://localhost:4000/api/empleados/logueo';
const cookies = new Cookies();

const defaultState = {
  msgError: '',
};

var redireccion = '';

class Login extends Component {

  state = {
    form: {
      username: '',
      password: ''
    }
  }

  constructor() {
    super();
    this.state = defaultState;
    this.handleChange = this.handleChange.bind(this);
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

  validate() {
    let msgError = "";
    if (!this.state.name) {
      msgError = "El usuario o la contraseña no son correctos.";
    }
    if (msgError) {
      this.setState({ msgError });
      return false;
    }
    return true;
  }

  submit() {
    if (this.validate()) {

      this.setState(defaultState);
    }
  }

  iniciarSesion = async () => {
    await axios.post(baseUrl, {usuario: this.state.form.username, contrasenia: this.state.form.password},{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(response => {    
      if (response.data.length > 0) {

        cookies.set('usuario', response.data[0].usuario, {path: '/'});
        cookies.set('nombre_completo', response.data[0].nombre_completo, {path: '/'});
        cookies.set('tipo', response.data[0].Tipo, {path: '/'})

        if (response.data[0].tipo === 'A'){
          redireccion='./homeadmin';
        }
        else if(response.data[0].tipo === 'T'){
          redireccion='./hometecnico';
        }

        window.location.href=redireccion;
      } else {
        this.submit();
      }
    })
    .catch(error => {
      console.log(error);
    })
  }

  componentDidMount() {
    if(cookies.get('tipo') === 'A'){
      window.location.href='./homeadmin';
    } else if(cookies.get('tipo') === 'T'){
      window.location.href='./hometecnico';
    }
  }

  render() {
    return (
      <div className='containerPrincipal'>
        <h1 className='titulo'>Iniciar sesión: </h1>
        <span className="texto-error">{this.state.msgError}</span>
        <br />
        <br />
        <div className='containerSecundario'>
            <div className='form-group'>
              <div >
                <AiIcons.AiOutlineUser className='iconoUsuario'/><label>Usuario</label>
              </div>
              <input
                type='text'
                placeholder='Ingrese su usuario'
                className='form-control'
                name='username'
                onChange={this.handleChange}
              />
              <br />
              <div>
                <RiIcons.RiLockPasswordLine className='iconoPassword'/><label>Contraseña</label>
              </div>
              <input
                type='password'
                placeholder='Ingrese su contraseña'
                className='form-control'
                name='password'
                onChange={this.handleChange}
              />
              <br />
              <br />
              <div className='container'>
                <div className='center'>
                  <button class='boton' onClick={() => this.iniciarSesion()}><span class="text">Ingresar</span></button>
                </div>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Login;