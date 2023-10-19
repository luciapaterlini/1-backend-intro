// modelo de datos de usuario

// nombre
// correo
// password
// img
// rol (user/admin)
// estado (true/false)

const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
    //vamos a decretar las propiedades q recibimos del usuario
    nombre: {
        //tipo de dato
        type: String, 
        required: [true, "El nombre es obligatorio"],
    },
    correo: {
        type: String,
        required: [true, "El correo es obligatorio"],
        // dato unico
        unique: true, 
    },
    password:{
        type: String,
        required: [true, "El password es obligatorio"],
    },
    img: {
        type: String,
    },
    rol:{
        type: String,
        required: true, 
        // enum: ["USER_ROLE", "ADMIN_ROLE"], // hay q escribirlo en mayusculas tal cual sino no funciona
        // default: "USER_ROLE",
    },
    estado:{
        type: Boolean,
        default: true, 
    },
});

// Quitar datos de la respuesta al FRONTEND
UsuarioSchema.methods.toJSON= function(){
    // desestructurando
    const {__v, password, ...usuario} = this.toObject();

    //retornamos usuario
    return usuario;
}

module.exports = model("Usuario", UsuarioSchema);