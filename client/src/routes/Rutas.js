import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../css/Rutas.css'

//pages
import Login from '../pages/Login';
import HomeAdmin from '../pages/HomeAdmin';
import ABMChoferes from '../pages/ABMChoferes';
import ABMTecnicos from '../pages/ABMTecnicos';

//components
import Navbar from '../components/Navbar';
import MaybeShowNavBar from '../components/MaybeShowNavBar';


function Rutas() {
  return (
    <BrowserRouter>
      <MaybeShowNavBar>
        <Navbar />  
      </MaybeShowNavBar>
        <Routes>
          <Route exact path='/' Component={Login}/>
          <Route exact path='/homeadmin' Component={HomeAdmin}/>
          <Route exact path='/abmchoferes' Component={ABMChoferes}/>
          <Route exact path='/abmtecnicos' Component={ABMTecnicos}/>
        </Routes>
    </BrowserRouter>
  );
}

export default Rutas;
