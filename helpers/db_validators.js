const Usuario = require("../models/usuario");
const Rol = require("../models/rol");


// Funcion para validar usuario por el mail
// como nos dirigimos a la base de datos la funcion tiene q ser de tipo asincrona
const esMailValido = async (correo) => {
    // metodo .findOne() recorre la base de datos y busca la propiedad correo
    // me compara el mail q el usuario esta ingresando con los mail q estan en la db 
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail){
        throw new Error(`El correo ${correo} ya existe en la base de datos!`);
    }
};

// Funcion para encontrar el rol en la DB
const esRolValido = async (rol) => {
    const existeRol = await Rol.findOne({rol});

    /* nosotros si sabemos q roles hay en el proyecto, por ende tenemos q saber si lo estamos poniendo bien
    x eso damos vuelta el valor del if para saber si existe */
    if (!existeRol){
        throw new Error (`El rol ${rol} no existe en la base de datos`)
    }
}

// funcion para encontrar id valido
const esIdValido = async (id) => {
    const existeUsuario = await Usuario.findById(id);

    // si no encuentra al id me manda el mensaje 
    if (!existeUsuario){
        throw new Error(`El id ${id} no se encuentra en la base de datos`)
    }
}

// categoria existe
const esCategoriaValido = async (id) => {
    const existeCategoria = await Categorias.findById(id);

    if (!existeCategoria){
        throw new Error(`La categoria ${id} no existe en la base de datos!`)
    }
};


module.exports = {
    esMailValido,
    esRolValido,
    esIdValido,
    esCategoriaValido,
};