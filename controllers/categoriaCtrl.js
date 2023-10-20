const {response, request} = require("express");
const Categoria = require("../models/categoria");


const crearCategoria = async (req = request, res = response) => {
    const nombre = req.body.nombre.toUpperCase();

    // verificar si la categoria existe
    const categoriaDB = await Categoria.findOne({nombre});

    if (categoriaDB){
        res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`,
        });
    }

    // Generar la info 
    const data = {
        nombre, 
        // usuario: req.usuario._id,
    };

    // creo la nueva INSTANCIA
    const categoria = new Categoria(data);

    // Mandar a la base de datos
    await categoria.save();

    if (categoria){
        res.status(200).json({
            categoria,
            msg: "La categoria se creó correctamente",
        });
    }
};

module.exports = {
    crearCategoria,
};