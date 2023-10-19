const {validationResult} = require("express-validator");

// el next es un metodo q permite seguir con el servidor por mas q surja un error
const validarCampos = (req, res, next) => {
    const errors = validationResult(req); // la request viene siempre de la parte del front
    if(!errors.isEmpty()) {
        return res.status(400).json(errors); // x el status400 le informo del error
    }
    next();
}
/* esta funcion capta si es q hay errores en el formulario de registro, si hay error devolver un status 400,
mediante el check informamos el error a corregir, pero a la vez podemos seguir trabajando y q no caiga el servidor
gracias al metodo next() */

module.exports = {
    validarCampos,
};