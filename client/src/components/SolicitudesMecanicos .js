import React, { useState } from 'react'

export const SolicitudesMecanicos = () => {

  const obtenerRegistros = () => {
    var datos = localStorage.getItem("registroslogin");
    if(datos){
      return JSON.parse(datos);
    }else{
      return [];
    }
  }





  return (
    

          
    <div className="bg-light" style={{marginTop:20, padding:20}}>

    <div className="h3">
      Resumen Solicitudes Material Mecanico 
    </div>

    <div className="table-responsive">
      
      {        

         <p className="h5" style={{color:"red"}}>"No Hay Pedidos por parte de los mecanicos!!"</p>
        }

    </div>
 
  </div>





  )
}
