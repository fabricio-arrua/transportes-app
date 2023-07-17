import React, { Component } from 'react'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class HomeTecnico extends Component {

  cerrarSesion = () => {
    cookies.remove('usuario', {path: '/'});
    cookies.remove('nombre_completo', {path: '/'});
    cookies.remove('tipo', {path: '/'});

    window.location.href='./';
  }
    
  componentDidMount() { 
    if(!cookies.get('nombre_completo')){
      window.location.href='./';
    }
  }
    
  render() {
    console.log('Usuario: ' + cookies.get('usuario'));
    console.log('Nombre completo: ' + cookies.get('nombre_completo'));
    console.log('Tipo: ' + cookies.get('tipo'));
    return (
      <div>
        BIENVENIDO TÉCNICO!!

        <br />
        <button onClick={()=>this.cerrarSesion()}>Cerrar sesión</button>
      </div>
    )
  }
}