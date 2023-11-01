const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar_jwt");
const { esAdminRole } = require("../middlewares/validar-roles");
const { check } = require("express-validator");
//! ojo con la importacion => es en cascada y tiene q ir abajo de los checks
const { validarCampos } = require("../middlewares/validar_campos");

const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
} = require("../controllers/usuariosCtrl");

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

// PETICION PUT: actualizar datos
router.put(
  "/:id",
  [
    check("id", "No es un ID válido!").isMongoId(),
    check("id").custom(esIdValido),
  ],
  usuariosPut
);

// PETICION DELETE: borrar datos
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID válido!").isMongoId(),
    check("id").custom(esIdValido),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
