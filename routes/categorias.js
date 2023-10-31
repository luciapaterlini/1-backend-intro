const { Router } = require("express");
const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
} = require("../controllers/categoriaCtrl");
const { esAdminRole } = require("../middlewares/validar-roles");
const { check } = require("express-validator");
const { validarJWT } = require("../middlewares/validar_jwt");
const { validarCampos } = require("../middlewares/validar_campos");
const { esCategoriaValido } = require("../helpers/db_validators");

const router = Router();

router.get("/", [validarJWT], obtenerCategorias);

router.get(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID válido!").isMongoId(),
    check("id").custom(esCategoriaValido),
    validarCampos,
  ],
  obtenerCategoria
);

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

router.put(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID válido!").isMongoId(),
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("id").custom(esCategoriaValido),
    validarCampos,
  ],
  actualizarCategoria
);

router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID válido!").isMongoId(),
    check("id").custom(esCategoriaValido),
    validarCampos,
  ],
  borrarCategoria
);

module.exports = router;
