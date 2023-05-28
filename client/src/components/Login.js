import React, { useState } from 'react'
import { Menu } from './Menu'

export const Login = () => {

  const [miLogin, setMiLogin] = useState("false");
  const [usu, setUsu] = useState("");
  const [pas, setPas] = useState("");


  function iniciarSesion(e){
    e.preventDefault();
    var txtusu = document.getElementById("txtusu").value;
    var txtpas = document.getElementById("txtpas").value;
    if(txtusu.length===0 || txtpas.length===0){
      alert("Complete Los Datos Faltantes!!");
    }else{
      if(usu === "admin" && pas==="123"){
        setMiLogin("true");
        document.getElementById("form_login").style.display = "true";
      }else{
        setMiLogin("false");
        alert("Error De Usuario y/o Contraseña!!");
        document.getElementById("txtusu").value = "";
        document.getElementById("txtpas").value = "";
        document.getElementById("txtusu").focus();
        
      }
    }
  }


  return (
    
       
    <div className="App">
      <div class="container-form sign-in">
        <form class="form_login">
        <div>
            <h2 class="create-account">Iniciar Sesion</h2>
            <p class="cuenta-gratis">Bienvenido a Transportes FED</p>
             <input type="text" id="txtusu"  placeholder="Email" style={{textAlign:"center"}} className="form-control"  onChange={ (e)=>setUsu(e.target.value) }  required/>
        </div>
            <div>
            <input type="password" id="txtpas" placeholder="Contraseña" style={{textAlign:"center"}} className="form-control"  onChange={ (e)=>setPas(e.target.value) }  required/>
            </div>
            <button type="button"  className="btn btn-primary" value="Login" onClick={ iniciarSesion }>iniciar Sesion</button>
        </form>
       </div>
     { miLogin === "true" && <Menu usu={usu}/> }
    </div>

  )
}
