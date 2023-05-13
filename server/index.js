const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

const db = mysql.createPool({
    host: 'mysql_db',
    user: 'sa',
    password: 'tr4nsp0rt3s',
    database: 'transportes'
  })

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Todo esta OK!')
  });

//obtener todos los transportes de la BD
app.get('/get', (req, res) => {
    const usuario = req.body.setUsuario;
    const password = req.body.setPassword;
    const SelectQuery = "SELECT * FROM usuarios WHERE usuario = ? AND password = ?";
    db.query(SelectQuery, [usuario, password], (err, result) => {
      res.send(result)
    })
  })

app.listen('3001', () => { })