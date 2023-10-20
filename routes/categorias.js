const { Router } = require("express");
const { crearCategoria } = require("../controllers/categoriaCtrl");
const { esAdminRole } = require("../middlewares/validar-roles");
const { check } = require("express-validator");
const { validarJWT } = require("../middlewares/validar_jwt");
const { validarCampos } = require("../middlewares/validar_campos");

const router = Router(); // en esta variable le digo q guarde todos los metodos q tenga el router

router.post(
  "/",
  [
    validarJWT,
    esAdminRole,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    validarCampos,
  ],
  crearCategoria
);

module.exports = router;
