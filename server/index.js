const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const db = mysql.createPool({
    host: 'mysql_db',
    user: 'sa',
    password: 'tr4nsp0rt3s',
    database: 'transportes'
  })

app.use(cors())

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hi There')
  });

//obtener todos los transportes de la BD
app.get('/get', (req, res) => {
    const SelectQuery = " SELECT * FROM transportes";
    db.query(SelectQuery, (err, result) => {
      res.send(result)
    })
  })

//insertar un transporte en la BD
app.post("/insert", (req, res) => {
    const estadoTransporte = req.body.setEstadoTransporte;
    const fechaHoraInicio = req.body.setFechaHoraInicio;
    const fechaHoraFin = req.body.setFechaHoraFin;
    const kmsDistancia = req.body.setKmsDistancia;
    const origen = req.body.setOrigen;
    const destino = req.body.setDestino;
    const matricula = req.body.setMatricula;
    const usuarioChofer = req.body.setUsuarioC;
    const documentoCliente = req.body.setDocumentoCliente;
    const InsertQuery = "INSERT INTO transportes (book_name, book_review) VALUES (?, ?)";
    db.query(InsertQuery, [estadoTransporte, fechaHoraInicio, fechaHoraFin, kmsDistancia, origen, destino, matricula, usuarioChofer, documentoCliente], (err, result) => {
      console.log(result)
    })
  })

//insertar un transporte en la BD
app.post("/insert", (req, res) => {
    const bookName = req.body.setBookName;
    const bookReview = req.body.setReview;
    const InsertQuery = "INSERT INTO books_reviews (book_name, book_review) VALUES (?, ?)";
    db.query(InsertQuery, [bookName, bookReview], (err, result) => {
      console.log(result)
    })
  })

//eliminar un transporte de la BD
app.delete("/delete/:bookId", (req, res) => {
    const bookId = req.params.bookId;
    const DeleteQuery = "DELETE FROM books_reviews WHERE id = ?";
    db.query(DeleteQuery, bookId, (err, result) => {
      if (err) console.log(err);
    })
  })

//Actualizar un transporte de la BD
app.put("/update/:bookId", (req, res) => {
    const bookReview = req.body.reviewUpdate;
    const bookId = req.params.bookId;
    const UpdateQuery = "UPDATE books_reviews SET book_review = ? WHERE id = ?";
    db.query(UpdateQuery, [bookReview, bookId], (err, result) => {
      if (err) console.log(err)
    })
  })

app.listen('3001', () => { })