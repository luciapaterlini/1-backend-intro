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

const router = Router(); // en esta variable le digo q guarde todos los metodos q tenga el router

// ruta GET
router.get("/", [validarJWT], obtenerCategorias);

// ruta GET
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

// ruta POST
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

// ruta PUT
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

// ruta DELETE
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
