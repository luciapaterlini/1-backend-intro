const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar_jwt");
const { esAdminRole } = require("../middlewares/validar-roles");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar_campos");
const { esCursoValido } = require("../helpers/db_validators");

const {
    obtenerCursos,
    obtenerCurso,
    crearCurso,
    actualizarCurso,
    borrarCurso,
} = require("../controllers/cursosCtrl");

const router = Router();

router.get("/", obtenerCursos); 
// muestra todos los cursos disponibles -> los busca en la DB
// el controlador obtenerCursos lee la base de datos y me devuelve lo q haya
// no hace falta discriminar usuarios

router.get(
    "/:id",
    [
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(esCursoValido), // se fija si el curso existe en la DB
    validarCampos,
    ],
    obtenerCurso
);
// aqui tampoco validamos usuario, damos permiso a un usuario cualquiera sin q se registre en la pagina


//ruta post
router.post(
    "/",
    [
        validarJWT, // valida el usuario
        esAdminRole,
        check("nombre", "El nombre es obligatorio").notEmpty(),
        validarCampos,
    ],
    crearCurso
);

router.put(
    "/:id",
    [
        validarJWT,
        esAdminRole,
        check("id", "El id no es valido").isMongoId(),
        check("id").custom(esCursoValido),
        validarCampos,
    ],
    actualizarCurso
);

router.delete(
    "/:id",
    [
        validarJWT,
        esAdminRole,
        check("id", "El id no es valido").isMongoId(),
        check("id").custom(esCursoValido),
        validarCampos,
    ],
    borrarCurso
);

module.exports = router;