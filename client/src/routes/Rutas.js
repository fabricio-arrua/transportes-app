import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from '../pages/Login';
import Menu from '../pages/Menu';

function Rutas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' Component={Login}/>
        <Route exact path='/menu' Component={Menu}/>
      </Routes>
    </BrowserRouter>
  );
}

export default Rutas;
