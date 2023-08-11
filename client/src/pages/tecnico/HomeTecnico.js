import React, { Component } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class HomeTecnico extends Component {

  componentDidMount() { 
    if(cookies.get('tipo') !== 'T'){
      window.location.href='./';
    }
  }
    
  render() {
    return (
      <div>
        BIENVENIDO TECNICO!!
      </div>
    )
  }
}