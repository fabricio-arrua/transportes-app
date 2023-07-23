import React, { Component } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class HomeAdmin extends Component {

  componentDidMount() { 
    if(cookies.get('tipo') !== 'A'){
      window.location.href='./';
    }
  }
    
  render() {
    return (
      <div>
        BIENVENIDO ADMINISTRADOR!!
      </div>
    )
  }
}