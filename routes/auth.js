const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar_campos");
const { login } = require("../controllers/authCtrl");

const router = Router();

// creamos la ruta post porque vamos a ingresar datos

router.post("/login", [
    check("correo", "El correo no es válido!").isEmail(), // valida si es un mail lo q se ingresa
    check("password", "La contraseña es obligatoria").notEmpty(),
    validarCampos,
    ], 
    login
);

module.exports = router;