import React, { useState, useEffect } from 'react'

export const Registrar = () => {

  const obtenerRegistros = () => {
    var datos = localStorage.getItem("registroslogin");
    if(datos){
      return JSON.parse(datos);
    }else{
      return [];
    }
  }


  const [registroslogin, setRegistrosLogin] = useState(obtenerRegistros());

  const [Usuario, setUsuarioC] = useState("");
  const [NroLicencia, setNroLicencia] = useState("");
  const [Telefono, setTelefono] = useState("");


  const botonGuardar = (e) => {
    e.preventDefault();
    var miObjeto = { Usuario, NroLicencia, Telefono }
    setRegistrosLogin([...registroslogin, miObjeto]);
    limpiarFormulario();
  }


  useEffect(() => {
    localStorage.setItem("registroslogin", JSON.stringify(registroslogin))
  }, [registroslogin] );



  const limpiarFormulario = () => {
    setUsuarioC("");
    setNroLicencia("");
    setTelefono("");
    document.getElementById("miFormulario").reset();
  }


  return (
    

    <div className="bg-light" style={{marginTop:20, padding:20}}>

    <div className="h3">
      Formulario De Registro De Choferes
      <br/>
      <form id="miFormulario" onSubmit={ botonGuardar } >
        <div className="row" style={{marginTop:20}}>
          <div className="col-6">
            <input className="form-control form-control-lg text-center" type="text" placeholder="Nombre de Usuario"  onChange={(e) => setUsuarioC(e.target.value)}  required  />
          </div>

          <div className="col-6">
            <input className="form-control form-control-lg text-center"  type="text" min="1" max="100000000" placeholder="Numero de Licencia de Conducir" onChange={(e) => setNroLicencia(e.target.value)}  required />
          </div>
        </div>
        
        <div className="row" style={{marginTop:20}}>
          <div className="col-6">
            <input className="form-control form-control-lg text-center" type="text" min="1" max="100000000" placeholder="Número de Telefono"  onChange={(e) => setTelefono(e.target.value)}  required  />
          </div>
        </div>

        <div className="row" style={{marginTop:20}}>
          <div className="col">
            <button className="btn btn-primary btn-lg">Guardar</button>
          </div>
        </div>
      </form>
    </div>
            
  </div>




  )
}
