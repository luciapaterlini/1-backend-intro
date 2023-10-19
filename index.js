// console.log('Hola 52i backend');
// -------------------------------------------------------------------------------

//! NO USAR, SOLO EJEMPLO DE EXPRESS
// importamos express con un const
// const express = require('express')

// traigo todos los metodos q tiene disponible express para trabajar
// const app = express()

// app.get("/", function(req, res){
    // res.send('Hola 52i');
// });

// aqui va el puerto
// app.listen(3000);
// -------------------------------------------------------------------------------

//! Estructura base REAL => no ejemplo
const Server = require("./models/server");
require("dotenv").config();

const server = new Server();

server.listen();