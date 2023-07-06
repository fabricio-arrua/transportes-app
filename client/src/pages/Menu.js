import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import "../css/Menu.css";

const cookies = new Cookies();

export default class Menu extends Component {
  cerrarSesion = () => {
    cookies.remove('usuario', {path: '/'});
    cookies.remove('nombre_completo', {path: '/'});

    window.location.href='./';
  }

  componentDidMount() { 
    if(!cookies.get('usuario')){
      window.location.href='./';
    }
   }

  render() {
    console.log('Usuario: ' + cookies.get('usuario'));
    console.log('Nombre completo: ' + cookies.get('nombre_completo'));
    return (
      <div>
        Menu Principal

        <br />
        <button onClick={()=>this.cerrarSesion()}>Cerrar sesión</button>
      </div>
    )
  }
}
