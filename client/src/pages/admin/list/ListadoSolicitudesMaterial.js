import React, { useState, useEffect } from 'react';
import { Table, Header, Pagination } from 'semantic-ui-react';
import axios from 'axios';
import '../../../css/misBtns.css';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { toast, ToastContainer } from 'react-toastify';

const cookies = new Cookies();

export default function ListadoSolicitudesMaterial() {

  const [APIData, setAPIData] = useState([]);
  const [APIError, setAPIError] = useState([]);
  //PAGINADO
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 5; // Número de elementos por página

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

  useEffect(() => {
    if (cookies.get('tipo') !== 'A') {
      window.location.href = '/';
    }

    axios.get(`http://localhost:4000/api/solicitudMateriales/listadoSolicitudMaterialesMantenimineto`, {
      params: { idMantenimiento: localStorage.getItem('IdMant') }
    },
      {
        headers: {
          Authorization: cookies.get('token'),
        }
      })
      .then((response) => {
        if (response.data.listado) {
          setAPIData(response.data.listado);
        } else {
          setAPIError(response.data.message)
        }
      })
      .catch(function (error) {
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
  }, [])

  return (
    <div>
      <Link to='/listadomantenimientos'>
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

      <Header as='h1' color='yellow'>
        {APIError}
      </Header>

      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Id Solicitud</Table.HeaderCell>
            <Table.HeaderCell>Id Mantenimiento</Table.HeaderCell>
            <Table.HeaderCell>Producto</Table.HeaderCell>
            <Table.HeaderCell>Cantidad</Table.HeaderCell>
            <Table.HeaderCell>Estado</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {currentData.map((data) => {
            return (
              <Table.Row>
                <Table.Cell>{data.id_solicitud}</Table.Cell>
                <Table.Cell>{data.id_mantenimiento}</Table.Cell>
                <Table.Cell>{data.producto_solicitado}</Table.Cell>
                <Table.Cell>{data.cantidad}</Table.Cell>
                <Table.Cell>{data.estado}</Table.Cell>
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