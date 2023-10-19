const { response, request } = require("express");

const bcrypt = require('bcryptjs');

// importar el schema usuario
const Usuario = require("../models/usuario");

// Pet GET
const usuariosGet = async (req = request, res = response) => {
    // const {apiKey, limit} = req.query; // query da permiso a acceder a los parametros q me manden
    const {desde=0, limite=0} = req.query;

    // Usuarios activos
    const query = {estado: true}; // guarda solamente a los q tienen estado true 

    // // enviar toda la base de datos
    // const usuarios = await Usuario.find();

    // Enviar datos segun PARAMETROS
    // const usuarios = await Usuario.find().skip(desde).limit(limite);
    // le informo la cantidad total de objetos en la DB
    // const total = await Usuario.countDocuments();

    // Enviar datos segun PARAMETROS -- respuesta OPTIMIZADA
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).skip(desde).limit(limite),
    ])
    res.json({
        mensaje: "Envio datos!",
        // apiKey, 
        // limit,
        total,
        usuarios,
    });
};

// POST
const usuariosPost = async (req = request, res = response) => {
    const datos = req.body; // recibo el body

    // aqui uno los datos
    // esto viene del frontend
    const {nombre, correo, password, rol} = datos; // desestructuro y traigo solo lo q necesito
    // esto viene del backend
    const usuario = new Usuario({nombre, correo, password, rol}) // esta linea me trae el esquema de usuario
    
    // encryptar contraseña
    const salt = bcrypt.genSaltSync(10); // esto le dice q la encripte 10 veces a la contraseña
    // const hash = bcrypt.hashSync(password, salt); // aqui le estoy diciendo q encripte a password y queda guardado en hash
    // usuario.password = hash; // hay dos maneras de hacer 
    // manera 2 + directa
    usuario.password = bcrypt.hashSync(password, salt); 

    // guardar datos en BASE DE DATOS
    await usuario.save()

    // aqui lo mando de vuelta al front
    res.json({
        usuario, // respondo - esta xq necesitamos ver q anda bien, pero en realidad esto no va 
        mensaje: "El usuario se creó correctamente!",
    });
};

// PUT
const usuariosPut = async (req = request, res = response) => {
    // 1º obtenemos los datos con los q vamos a trabajar
    const { id } = req.params; // obtenemos el id 
    // desestructuro y saco password del resto de los datos
    const {password, ...updUsuario} = req.body;

    // como password esta encryptado, despues de darle la posibilidad al usuario de cambiar su contraseña, tengo q volver a encryptarlo
    // ENCRYPTAR PASSWORD NUEVAMENTE
    // if (password){
    //     const salt = bcrypt.genSaltSync(10); 
    //     // updUsuario es la variable con los datos modificados, todos los datos quedan guardados ahi
    //     updUsuario.password = bcrypt.hashSync(password, salt);
    // }

    // metodo q encuentra x id y lo modifica => recibe 3 paraemtros: id , upd(update)Usuario, new: true (metodo) 
    //new: true => (actualiza los datos al objeto q vamos a modificar)
    const usuario = await Usuario.findByIdAndUpdate(id, updUsuario, {new: true}); 

    res.json({
        mensaje: "datos de usuario actualizados",
        password,
        id, 
        usuario,
    });
};

// DELETE
const usuariosDelete = async (req = request, res = response) => {
    const { id } = req.params; // obtenemos el id 
    // // borrar DEFINITIVAMENTE un usuario
    // const usuarioEliminado = await Usuario.findByIdAndDelete(id);

    // Cambiar el ESTADO del usuario
    // 1º localizamos al usuario
    const usuario = await Usuario.findById(id);
    // antes de cambiar el estado tengo q verificar el estado (es posible q ya este en false)
    // 2º validar que el estado NO ESTE EN FALSE
    if(!usuario.estado){
        return res.json({
            msg: "El usuario ya está inactivo!",
        });
    }
    // encontrar el id y cambiar el valor del estado
    const usuarioInactivo = await Usuario.findByIdAndUpdate(
        id,
        {estado: false},
        {new: true }
    );

    res.json({
        mensaje: "Usuario eliminado!",
        // usuarioEliminado,
        usuarioInactivo,
    });
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete

};