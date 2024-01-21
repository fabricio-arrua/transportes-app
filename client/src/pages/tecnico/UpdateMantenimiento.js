import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../css/misBtns.css';
import Cookies from 'universal-cookie';
//Notificaciones
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
//Formik & Yup
import { useFormik } from 'formik';
import { mantenimientoValidations } from "../../validations/mantenimientoValidations";

const cookies = new Cookies();

export default function UpdateMantenimiento() {
  const [iidMantenimiento, setId] = useState('');
  const [ffechaMantenimiento, setFecha] = useState('');
  const [oobservaciones, setObs] = useState('');
  const [eestadoMantenimento, setEstado] = useState('');
  const [ccosto, setCosto] = useState('');
  const [mmatricula, setMatricula] = useState('');
  const [usuarioT, setUsu] = useState('');
  const [optMatricula, setOptMatricula] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.get('tipo') !== 'T') {
      window.location.href = '/';
    }

    setId(localStorage.getItem('idMant'))
    setFecha(localStorage.getItem('FechaMant'))
    setObs(localStorage.getItem('ObsMant'));
    setEstado(localStorage.getItem('EstadoMant'));
    setMatricula(localStorage.getItem('MatriculaMant'));
    setCosto(localStorage.getItem('CostoMant'));
    setUsu(cookies.get('usuario'));

    axios.get(`http://localhost:4000/api/camiones/listarCamion`, {
      headers: {
        Authorization: cookies.get('token'),
      }
    })
    .then((response) => {
      if (response.data.listado){
        setOptMatricula(response.data.listado);
      } else {
        toast.error(response.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    })
    .catch((error) => {
      console.log(error.response);
    });

  }, []);

  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      idMantenimiento: iidMantenimiento,
      fechaMantenimiento: ffechaMantenimiento,
      observaciones: oobservaciones,
      estadoMantenimento: eestadoMantenimento,
      costo: ccosto,
      matricula: mmatricula
      },
    onSubmit: values => {
      axios.post(`http://localhost:4000/api/mantenimientos/modificarMantenimiento`, {
        idMantenimiento: values.idMantenimiento,
        fechaMantenimiento: values.fechaMantenimiento,
        observaciones: values.observaciones,
        estadoMantenimento: values.estadoMantenimento,
        costo: values.costo,
        matricula: values.matricula,
        usuarioT
      },
        {
          headers: {
            Authorization: cookies.get('token'),
          },
        }).then((response) => {
          if (response.data.message === 'Modificación realizada con éxito') {
            navigate('/abmmantenimiento');
          } else {
            toast.error(response.data.message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        }).catch(function (error) {
          if (error.response) {
            console.log(error.response.data + 'error.response.data');
            toast.error(error.response.data, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            console.log(error.response.status + 'error.response.status');
            toast.error('Error comuniquese con sistemas', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            console.log(error.response.header + 'error.response.header');
            toast.error(error.response.headers, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          } else if (error.request) {
            console.log(error.request + 'error.request');
            toast.error(error.request, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          } else {
            console.log(error.message + 'error.message');
            toast.error(error.message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
          console.log(error.config + 'error.config');
          toast.error(error.config, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
    },
    validationSchema: mantenimientoValidations
  })

  return (
    <div>
      <Link to='/abmmantenimiento'>
        <button className='Btn'>Volver</button>
      </Link>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <form onSubmit={formik.handleSubmit}>
        <h2 className="form-title">Modificar mantenimiento</h2>

        <div className='form-control'>
          <label htmlFor='idMantenimiento'>Id</label>
          <input
            type='text'
            readonly="readonly"
            name='idMantenimiento'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.idMantenimiento}>
          </input>
          {formik.touched.idMantenimiento && formik.errors.idMantenimiento ? <div className='error'>{formik.errors.idMantenimiento}</div> : null}
        </div>

        <div className='form-control'>
          <label htmlFor='fechaMantenimiento'>Fecha</label>
          <input 
            type='date' 
            name='fechaMantenimiento' 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fechaMantenimiento}>
          </input>
          { formik.touched.fechaMantenimiento && formik.errors.fechaMantenimiento ? <div className='error'>{formik.errors.fechaMantenimiento}</div> : null}
        </div>

        <div className='form-control'>
          <label htmlFor='observaciones'>Observaciones</label>
          <input
            type='text'
            name='observaciones'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} 
            value={formik.values.observaciones}>
          </input>
          { formik.touched.observaciones && formik.errors.observaciones ? <div className='error'>{formik.errors.observaciones}</div> : null}
        </div>

        <div className='form-control'>
          <label htmlFor='estadoMantenimiento'>Estado</label>
          <input
            type='text'
            name='estadoMantenimiento'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} 
            value={formik.values.estadoMantenimiento}>
          </input>
          { formik.touched.estadoMantenimiento && formik.errors.estadoMantenimiento ? <div className='error'>{formik.errors.estadoMantenimiento}</div> : null}
        </div>

        <div className='form-control'>
          <label htmlFor='costo'>Costo</label>
          <input
            type='text'
            name='costo'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.costo}>
          </input>
          { formik.touched.costo && formik.errors.costo ? <div className='error'>{formik.errors.costo}</div> : null}
        </div>

        <div className='form-control'>
            <label htmlFor='matricula'>Matrícula</label>
            <div className="dropdown">
              <select
                name='matricula'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.matricula}
              >
                <option value="">Seleccione una matrícula</option>
                {optMatricula.map((option) => (
                  <option key={option.matricula} value={option.matricula}>
                    {option.matricula}
                  </option>
                ))}
              </select>
            </div>
            {formik.touched.matricula && formik.errors.matricula ? <div className='error'>{formik.errors.matricula}</div> : null}
          </div>

        <button className='btnSubmit' type='submit'>Modificar</button>
      </form>
    </div>
  )
}