// aqui se estructuran las rutas
const { Router } = require("express");
// ExpressValidator
const { validarJWT } = require("../middlewares/validar_jwt");
const { check } = require("express-validator");
//! ojo con la importacion => es en cascada y tiene q ir abajo de los checks
const { validarCampos } = require("../middlewares/validar_campos");

// importar funciones de controlador
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
} = require("../controllers/usuariosCtrl");

// Validaciones de la BASE DE DATOS
const {
  esMailValido,
  esRolValido,
  esIdValido,
} = require("../helpers/db_validators");

const router = Router();

// PETICION GET: enviar datos
router.get("/", usuariosGet);

// PETICION POST: recibir datos
router.post(
  "/",
  [
    /* el primer parametro es q campo estamos chequeando, el segundo es el mensaje, 
        al final esta el metodo de validacion*/
    check("nombre", "El nombre es obligatorio!").notEmpty(),
    check(
      "password",
      "La contraseña debe tener como minimo 6 caracteres!"
    ).isLength({ min: 6 }),
    check("correo", "No es un correo válido!").isEmail(),
    check("correo").custom(esMailValido),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  usuariosPost
);

// PETICION PUT: modificar/actualizar datos
router.put("/:id",
  [
    // validaciones
    check("id", "No es un ID válido!").isMongoId(),
    check("id").custom(esIdValido),
  ],
  usuariosPut
);

// PETICION DELETE: borrar datos
router.delete("/:id",
[
  // validaciones
  validarJWT,
  check("id", "No es un ID válido!").isMongoId(),
  check("id").custom(esIdValido),
],
usuariosDelete);

module.exports = router;
