const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = async (req=request, res=response, next) => {
    // obtener token
    const token = req.header("x-token");

    // verificar existencia token
    if (!token){
        return res.status(401).json({
            msg:"No hay token en la petición!",
        });
    }

    try{
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        // obtener los datos del usuario
        const usuario = await Usuario.findById(uid);

        // verificar q el usuario existe
        if (!usuario){
            return res.status(401).json({
                msg: "Token no válido, usuario inactivo!",
            });
        }

        //guardar los datos del usuario
        req.usuario = usuario;

    } catch(error){
        console.log(error);
        res.status(401).json({
            msg: "Token no es válido!"
        });
    }
};

module.exports = {
    validarJWT,
}