import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from '../pages/Login';

function Rutas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' Component={Login}/>
      </Routes>
    </BrowserRouter>
  );
}

export default Rutas;
