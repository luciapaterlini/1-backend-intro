const {response, request} = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req=request, res=response) => {
    const { correo, password } = req.body;

    try{
        const usuario = await Usuario.findOne({ correo });

        // verificar correo existente
        if (!usuario){
            return res.status(400).json({
                msg: "Correo o password incorrectos! | correo",
            });
        }

        // verificar estado del usuario
        if (!usuario.estado){
            return res.status(400).json({
                msg: "Correo o password incorrectos! | estado",
            });
        }

        // contraseña encriptada
        const validPassword = bcrypt.compareSync(password, usuario.password); 
        // verificar contraseña
        if (!validPassword){
            return res.status(400).json({
                msg: "Correo o password incorrectos! | password",
            });
        }

        // generamos JWT
        const token = await generarJWT(usuario.id);

        res.json({
            msg: "Login OK!",
            // correo, 
            // password,
            token
        });

    } catch(error){
        console.log(error);
        return res.status(500).json({
            msg: "Comuniquese con el servicio!",
        })
    }
};

module.exports = {
    login, 
};