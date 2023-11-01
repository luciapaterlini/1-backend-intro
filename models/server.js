const express = require("express");
// CORS
const cors = require("cors");
// importar FUNCION base de datos
const { dbConnection } = require("../database/config");

class Server{
    constructor(){
        this.app = express();

        this.port = process.env.PORT;
        
        // Path del login
        this.authPath = "/api/auth";
        // Path de usuarios
        this.usuarioPath = "/api/usuarios";
        // Path de categorias
        this.categoriasPath = "/api/categorias";
        // Path de cursos
        this.cursoPath = "/api/cursos";
        
        // base de datos
        this.conectarDB();

        // middlewares
        this.middlewares();

        //rutas
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(cors());
        
        this.app.use(express.json());

        this.app.use(express.static("public"));
    }
    
    routes(){
        // auth.js
        this.app.use(this.authPath, require("../routes/auth"));
        // usuario.js
        this.app.use(this.usuarioPath, require("../routes/usuarios"));
        // categorias
        this.app.use(this.categoriasPath, require("../routes/categorias"));
        // Cursos
        this.app.use(this.cursoPath, require("../routes/cursos"));
    }
    
    listen(){
        this.app.listen(this.port, () => {
            console.log("Server Online", this.port);
        });
    }
}

module.exports = Server;
