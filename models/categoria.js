const { Schema, model } = require("mongoose");

const CategoriaSchema = Schema ({
    // Propiedades
    nombre : {
        type: String,
        required: [true, "El nombre es obligatorio!"],
        unique: true,
    },
    estado: {
        type: Boolean,
        required: true, 
        default: true,
    },
    // usuario que crea la categoria
    usuario: { // aqui voy a tener guardados los datos del usuario q va a trabajar con categoria
        type: Schema.Types.ObjectId, // se le dice q vaya a otra coleccion (usuario) y busque un dato
        ref: "Usuario",
        required: true 
    },
});

module.exports = model("Categoria", CategoriaSchema);