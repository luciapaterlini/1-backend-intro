const express = require("express");
// cors
const cors = require("cors");
// importar FUNCION base de datos
const { dbConnection } = require("../database/config");

class Server{
    constructor(){
        this.app = express();

        this.port = process.env.PORT;

        this.usuarioPath = "/api/usuarios";

        // Base datos
        this.conectarDB();

        //MiddleWares
        this.middlewares();

        //Rutas
        this.routes();
    }

    //Base de datos
    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use(cors());
        
        //recibir datos .json
        this.app.use(express.json());

        //Mostrar archivos publicos
        this.app.use(express.static("public"));
    }
    
    routes(){
        //GET(recibir), POST(enviar), PUT(modificar/actualizar), DELETE(borrar)
        // this.app.get("/", function(req, res){
        //     res.send('Hola 52i');
        // }); todo esto esta en usuarios.js
        this.app.use(this.usuarioPath, require("../routes/usuarios"))
    }
    
    listen(){
        this.app.listen(this.port, () => {
            console.log("Server Online", this.port);
        });
    }
}

module.exports = Server;
