const { Schema, model } = require("mongoose");

const CursoSchema = Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        unique: true,
    },
    estado: {
        type: Boolean,
        required: true,
        default: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: true,
    },
    precio: {
        type: Number, // este precio lo determinamos nosotros -> iria sin ""
        default: 0,
    },
    categoria: { // entra a la coleccion de categorias 
        type: Schema.Types.ObjectId,
        ref: "Categoria",
        required: true,
    },
    descripcion: {
        type: String,
    },
    img: {
        type: String,
    },
    destacado: { //x ej para la pag favoritos
        type: Boolean,
        default: false,
    },
});

module.exports = model("Curso", CursoSchema);