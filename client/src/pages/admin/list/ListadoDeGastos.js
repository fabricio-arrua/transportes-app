import React, { useState, useEffect } from 'react';
import { Table, Button,Pagination  } from 'semantic-ui-react';
import axios from 'axios';
import '../../../css/misBtns.css';
import ExcelExport from '../actions/ExcelExport';
import Cookies from 'universal-cookie';
import * as FaIcons from 'react-icons/fa';
import Popup from 'reactjs-popup';
import { toast, ToastContainer } from 'react-toastify';
import 'reactjs-popup/dist/index.css';
import '../../../css/Popup.css'; // Importa el archivo CSS para estilos del pop-up
import { FaImages } from "react-icons/fa6";

const cookies = new Cookies();

export default function ListadoDeGastos() {

  const [APIData, setAPIData] = useState([]);
  const [selectedTransportId, setSelectedTransportId] = useState(null);
  const [transportDetails, setTransportDetails] = useState([]);
  //PAGINADO
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 5; // Número de elementos por página
  
  const f = new Intl.DateTimeFormat("en-BG", {dateStyle: "short"});

  useEffect(() => {
    if(cookies.get('tipo') !== 'A'){
      window.location.href='/';
    }

    axios.get(`http://localhost:4000/api/transportes/listadoTransporteFinalizado`, {
      headers: {
        Authorization: cookies.get('token'), 
      }})
      .then((response) => {
        if (response.data.listado){
          setAPIData(response.data.listado);
        } else {
          toast.success(response.data.message, {
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
      .catch(error => {
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
  }, [])

  // Calcula el índice del primer y último elemento a mostrar en la página actual
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Filtra los datos para mostrar solo los elementos de la página actual
  const currentData = APIData.slice(startIndex, endIndex);

  // Calcula el número total de páginas
  const totalPages = Math.ceil(APIData.length / itemsPerPage);

  const handlePageChange = (e, { activePage }) => {
    setActivePage(activePage);
  };

  const handleOpenPopup = async (transportId) => {
    setSelectedTransportId(transportId);
    try {
      const response = await axios.get(`http://localhost:4000/api/gastos/listarGastosPorTransporte`, {
        params: { idTransporte: transportId },
        headers: {
          Authorization: cookies.get('token'),
        }
      });
      if (response.data.listado) {
        setTransportDetails(response.data.listado);
      }
    } catch (error) {
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
    }
  };

  const handleClosePopup = () => {
    // Aquí actualizas el valor de la variable a vacío cuando se cierra el Pop Up
    setTransportDetails([]);
  };

  return (
    <div style={{width:'70%'}}>
      <ExcelExport excelData={APIData} fileName={"Listado de gastos"} />

      <h1>Listado de Gastos</h1>

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

      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Id Transporte</Table.HeaderCell>
            <Table.HeaderCell>Fecha Inicio</Table.HeaderCell>
            <Table.HeaderCell>Fecha Fin</Table.HeaderCell>
            <Table.HeaderCell>Matricula</Table.HeaderCell>
            <Table.HeaderCell>Chofer</Table.HeaderCell>
            <Table.HeaderCell>Cliente</Table.HeaderCell>
            <Table.HeaderCell>Telefono</Table.HeaderCell>
            <Table.HeaderCell>Gasto Total</Table.HeaderCell>
            <Table.HeaderCell>Ver Detalle</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
        {currentData.map((data) => {
            return (
              <Table.Row key={data.id_transporte}>
                <Table.Cell>{data.id_transporte}</Table.Cell>
                <Table.Cell>{f.format(Date.parse(data.fecha_hora_inicio))}</Table.Cell>
                <Table.Cell>{f.format(Date.parse(data.fecha_hora_fin))}</Table.Cell>
                <Table.Cell>{data.matricula}</Table.Cell>
                <Table.Cell>{data.usuarioC}</Table.Cell>
                <Table.Cell>{data.nombre_completo}</Table.Cell>
                <Table.Cell>{data.telefono}</Table.Cell>
                <Table.Cell>$ {data.total_gasto}</Table.Cell>
                <Table.Cell>
                  <Popup
                    trigger={<Button><FaIcons.FaEye /></Button>}
                    modal
                    nested
                    onOpen={() => handleOpenPopup(data.id_transporte)}
                    onClose={handleClosePopup}
                  >
                    {close => (
                      <div className="modals">
                        <button className="close" onClick={close}>
                          &times;
                      </button>
                        <div className="header"> Gastos del transporte {selectedTransportId} </div>
                        <div className="content">
                          {' '}
                          <ul>
                            {transportDetails.map((expense) => (
                              <li key={expense.id_gasto}>
                                <b>Monto:</b> $ {expense.monto_gasto} <b>Observaciones:</b> {expense.observaciones} <b>Fecha:</b> {f.format(Date.parse(expense.fecha_gasto))}
                                {expense.url_imagen && ( // Verifica si hay una URL de imagen
                                  <button className='btn' onClick={() => window.open(expense.url_imagen, '_blank')} title="Ver imagen" ><FaImages /></button>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </Popup>
                </Table.Cell>

              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>

       {/* Componente de paginación */}
       <Pagination
        activePage={activePage}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />

  
    </div>
  )
}
