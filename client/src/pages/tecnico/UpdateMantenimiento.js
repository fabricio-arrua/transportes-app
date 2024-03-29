import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../css/misBtns.css';
import Cookies from 'universal-cookie';
//Dates
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
//Notificaciones
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
//Formik & Yup
import { useFormik, Field, FormikProvider } from 'formik';
import { mantenimientoUpdateValidations } from "../../validations/mantenimientoUpdateValidations";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const cookies = new Cookies();

export default function UpdateMantenimiento() {
  const [iidMantenimiento, setId] = useState('');
  const [ffechaMantenimiento, setFecha] = useState(new Date());
  const [oobservaciones, setObs] = useState('');
  const [eestadoMantenimento, setEstado] = useState('');
  const [ccosto, setCosto] = useState('');
  const [mmatricula, setMatricula] = useState('');
  const [usuarioT, setUsu] = useState('');
  const navigate = useNavigate();

  let estados = [
    { label: "Finalizado", value: "0" },
    { label: "Activo", value: "1" },
  ]

  useEffect(() => {
    if (cookies.get('tipo') !== 'T') {
      window.location.href = '/';
    }

    setId(localStorage.getItem('IdMant'));
    setFecha(new Date(localStorage.getItem('FechaMant')));
    setObs(localStorage.getItem('ObsMant'));
    setEstado(localStorage.getItem('EstadoMant'));
    setMatricula(localStorage.getItem('MatriculaMant'));
    setCosto(localStorage.getItem('CostoMant'));
    setUsu(cookies.get('usuario'));
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      idMantenimiento: iidMantenimiento,
      fechaMantenimiento: ffechaMantenimiento,
      observaciones: oobservaciones,
      estadoMantenimento: eestadoMantenimento,
      costo: ccosto,
      matricula: mmatricula
    },
    onSubmit: values => {
      var fechaI = format(values.fechaMantenimiento, 'yyyy-MM-dd');

      axios.post(`http://localhost:4000/api/mantenimientos/modificarMantenimiento`, {
        idMantenimiento: values.idMantenimiento,
        fechaMantenimiento: fechaI,
        observaciones: values.observaciones,
        estadoMantenimento: values.estadoMantenimento,
        costo: values.costo,
        matricula: mmatricula,
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
          toast.error('Error, comuniquese con sistemas', {
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
    validationSchema: mantenimientoUpdateValidations
  })

  return (
    <div>
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

      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <h2 className="form-title">Modificar mantenimiento</h2>
          
          <div className='row'>
            <div className='col-6'>
              <div className='form-control'>
                <label htmlFor='idMantenimiento'>Id</label>
                <input
                  type='number'
                  name='idMantenimiento'
                  readOnly ="readOnly"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.idMantenimiento}>
                </input>
                {formik.touched.idMantenimiento && formik.errors.idMantenimiento ? <div className='error'>{formik.errors.idMantenimiento}</div> : null}
              </div>
            </div>
            <div className='col-6'>
              <div className='form-control'>
                <label htmlFor="fechaInicio">Fecha</label>
                <Field name="fechaMantenimiento">
                  {({ field, form }) => (
                    <DatePicker
                      minDate={new Date()}
                      dateFormat="yyyy-MM-dd"
                      id="fechaMantenimiento"
                      {...field}
                      selected={field.value}
                      onChange={(fechaMantenimiento) => form.setFieldValue(field.name, fechaMantenimiento)}
                    />
                  )}
                </Field>
                {formik.touched.fechaMantenimiento && formik.errors.fechaMantenimiento ? <div className='error'>{formik.errors.fechaMantenimiento}</div> : null}
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-6'>
              <div className='form-control'>
                <label htmlFor='observaciones'>Observaciones</label>
                <input
                  type='text'
                  name='observaciones'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.observaciones}>
                </input>
                {formik.touched.observaciones && formik.errors.observaciones ? <div className='error'>{formik.errors.observaciones}</div> : null}
              </div>
            </div>
            <div className='col-6'>
              <div className='form-control'>
              <label htmlFor='estadoMantenimento'>Estado</label>
              <div className="dropdown">
                <select
                  name='estadoMantenimento'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.estadoMantenimento}
                >
                  <option value="">Seleccione un estado</option>
                  {estados.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              {formik.touched.estadoMantenimento && formik.errors.estadoMantenimento ? <div className='error'>{formik.errors.estadoMantenimento}</div> : null}
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-6'>
              <div className='form-control'>
                <label htmlFor='costo'>Costo</label>
                <input
                  type='number'
                  name='costo'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.costo}>
                </input>
                {formik.touched.costo && formik.errors.costo ? <div className='error'>{formik.errors.costo}</div> : null}
              </div>
            </div>
          </div>
          <button className='btnSubmit' type='submit'>Modificar</button>
        </form>
      </FormikProvider>

      <Link to='/abmmantenimiento'>
        <div className="back-button-container">
          <button className="back-button">
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        </div>
      </Link>

    </div>
  )
}