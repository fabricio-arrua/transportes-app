import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../css/Rutas.css'

//pages
import Login from '../pages/Login';
//pages-admin
import HomeAdmin from '../pages/admin/HomeAdmin';
import ABMChoferes from '../pages/admin/abm/ABMChoferes';
import ABMTecnicos from '../pages/admin/abm/ABMTecnicos';
import ABMAdmins from '../pages/admin/abm/ABMAdmins';
import ABMCamiones from '../pages/admin/abm/ABMCamiones';
import ABMClientes from '../pages/admin/abm/ABMClientes';
import ABMEstadoCamion from '../pages/admin/abm/ABMEstadoCamion';
import ABMTipoCamion from '../pages/admin/abm/ABMTipoCamion';
import ABMTransportes from '../pages/admin/abm/ABMTransportes';
import ListadoChoferesSinTransporte from '../pages/admin/list/ListadoChoferesSinTransporte';
import ListadoDeClientes from '../pages/admin/list/ListadoDeClientes';
import ListadoDeGastos from '../pages/admin/list/ListadoDeGastos';
import ListadoTransportesNoRealizados from '../pages/admin/list/ListadoTransportesNoRealizados';
//pages-tecnico
import HomeTecnico from '../pages/tecnico/HomeTecnico';
import ListadoDeCamionesEnReparacion from '../pages/tecnico/ListadoDeCamionesEnReparacion';
import RegistrarMantenimiento from '../pages/tecnico/RegistrarMantenimiento';
import SolicitudDeMateriales from '../pages/tecnico/SolicitudDeMateriales';

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
          <Route exact path='/abmadmins' Component={ABMAdmins}/>
          <Route exact path='/abmcamiones' Component={ABMCamiones}/>
          <Route exact path='/abmclientes' Component={ABMClientes}/>
          <Route exact path='/abmestadocamion' Component={ABMEstadoCamion}/>
          <Route exact path='/abmtipocamion' Component={ABMTipoCamion}/>
          <Route exact path='/abmtransportes' Component={ABMTransportes}/>
          <Route exact path='/listadochoferessintransporte' Component={ListadoChoferesSinTransporte}/>
          <Route exact path='/listadoclientes' Component={ListadoDeClientes}/>
          <Route exact path='/listadogastos' Component={ListadoDeGastos}/>
          <Route exact path='/listadotransportesnorealizados' Component={ListadoTransportesNoRealizados}/>
          <Route exact path='/hometecnico' Component={HomeTecnico}/>
          <Route exact path='/listadocamionesreparacion' Component={ListadoDeCamionesEnReparacion}/>
          <Route exact path='/registrarmantenimiento' Component={RegistrarMantenimiento}/>
          <Route exact path='/solicitudmateriales' Component={SolicitudDeMateriales}/>
        </Routes>
    </BrowserRouter>
  );
}

export default Rutas;
