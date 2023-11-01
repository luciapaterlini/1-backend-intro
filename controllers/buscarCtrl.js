const { response, request } = require("express");

// importar modelos
const Usuario = require("../models/usuario");
const Categoria = require("../models/categoria");
const Curso = require("../models/curso");


const coleccionesPermitidas = ["usuarios", "categorias", "cursos"];

// funciones para buscar por "termino"
// usuarios
const buscarUsuarios = async (termino, res=response) => {
    const regex = new RegExp(termino, "i");

    const usuarios = await Usuario.find({
        $or: [{nombre: regex}, {correo: regex}], // el termino q el usuario ingrese 
        $and: [{estado: true}], //solo de los usuarios q tengan estado true
    });

    res.json({
        results: usuarios,
    });
};

// buscar categorias
const buscarCategorias = async (termino, res=response) => {
    const regex = new RegExp(termino, "i");

    const categorias = await Categoria.find({
        nombre: regex, // aqui no hace falta poner el or o el and xq pusimos una sola propiedad
        estado: true, 
    });

    res.json({
        results: categorias,
    });
};

// buscar cursos
const buscarCursos = async (termino, res=response) => {
    const regex = new RegExp(termino, "i");

    const cursos = await Curso.find({
        $or: [{nombre: regex}, {descripcion: regex}], 
        $and: [{estado: true}], 
    });

    res.json({
        results: cursos,
    });
};

// funcion de busqueda principal
const buscar = (req=request, res=response)=> {
    const {coleccion, termino} = req.params;

    // validar si esa coleccion existe
    if (!coleccionesPermitidas.includes(coleccion)){
        return req.statusCode(400).json({
            msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
        });
    }
    // buscar colecciones
    switch(coleccion){
        case "usuarios":
            buscarUsuarios(termino, res);
            break;
        case "categorias":
            buscarCategorias(termino, res);
            break;
        case "cursos":
            buscarCursos(termino, res);
            break;
        
            default:
                res.status(500).json({
                    msg: 'Error interno en realizar la busqueda',
                });
                break;
    }
};

module.exports = {
    buscar,
}